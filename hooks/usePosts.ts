import { useState, useEffect } from 'react';
import type { Post, UsePostsReturn } from '../types/post';
import { createClient } from '@/utils/supabase/client';

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClient()

  const fetchPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          author:author_id (
            first_name,
            last_name,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw new Error(postsError.message);

      setPosts((postsData as Post[]) || []);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: fetchPosts };
};