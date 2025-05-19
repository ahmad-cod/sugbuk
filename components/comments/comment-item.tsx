import { useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { Comment } from '@/lib/types';
import CommentForm from './comment-form';
import { useProfile } from '@/contexts/ProfileContext';

interface CommentItemProps {
  comment: Comment;
  postId: string;
  onUpdate: (id: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function CommentItem({
  comment,
  postId,
  onUpdate,
  onDelete,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { profile } = useProfile();
  
  const isAuthor = profile && profile.id === comment.profile_id;
  const timeSince = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });
  
  const handleUpdate = async () => {
    if (!editContent.trim()) return;
    
    try {
      await onUpdate(comment.id, editContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await onDelete(comment.id);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  return (
    <div className="py-4 border-b border-gray-100">
      <div className="flex gap-3">
        <img 
          src={comment.user?.avatar_url || '/default-avatar.png'} 
          alt={comment.user?.first_name || 'User'} 
          className="w-8 h-8 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{comment.user?.first_name || 'User'}</span>
            <span className="text-xs text-gray-500">{timeSince}</span>
          </div>
          
          {isEditing ? (
            <div className="mt-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={2}
              />
              <div className="mt-2 flex gap-2 justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-1 text-gray-800">{comment.content}</p>
              
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <button 
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="hover:text-gray-700"
                >
                  Reply
                </button>
                
                {isAuthor && (
                  <>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="hover:text-gray-700"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={handleDelete}
                      className="hover:text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
              
              {showReplyForm && (
                <div className="mt-3">
                  <CommentForm 
                    postId={postId} 
                    parentCommentId={comment.id}
                    onCommentAdded={() => setShowReplyForm(false)}
                    placeholder={`Reply to ${comment.user?.first_name || 'User'}...`}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}