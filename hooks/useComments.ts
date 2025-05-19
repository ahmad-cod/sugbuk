import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Comment } from '@/lib/types';
const supabase = createClient();

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('comments')
          .select('*, user:profile_id(id, first_name, last_name, avatar_url)')
          .eq('post_id', postId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setComments(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`comments-${postId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'comments',
          filter: `post_id=eq.${postId}`
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setComments(prev => [payload.new as Comment, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setComments(prev => 
              prev.map(comment => 
                comment.id === payload.new.id ? {...comment, ...payload.new} : comment
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setComments(prev => 
              prev.filter(comment => comment.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [postId]);

  const addComment = async (content: string, parentCommentId?: string) => {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session) {
      throw new Error('You must be logged in to comment');
    }
    
    const { data, error } = await supabase
      .from('comments')
      .insert({
        content,
        post_id: postId,
        user_id: session.session.user.id,
        parent_comment_id: parentCommentId || null,
      })
      .select('*, user:profile_id(id, first_name, last_name, avatar_url)')
      .single();
    
    if (error) throw error;
    
    return data;
  };

  const updateComment = async (id: string, content: string) => {
    const { data, error } = await supabase
      .from('comments')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*, user:profile_id(id, first_name, last_name, avatar_url)')
      .single();
    
    if (error) throw error;
    
    return data;
  };

  const deleteComment = async (id: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  return {
    comments,
    loading,
    error,
    addComment,
    updateComment,
    deleteComment
  };
}