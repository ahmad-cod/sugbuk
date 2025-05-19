"use client"

import { useComments } from '@/hooks/useComments';
import CommentForm from './comment-form';
import CommentItem from './comment-item';
import { useProfile } from '@/contexts/ProfileContext';


interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { comments, loading, error, updateComment, deleteComment } = useComments(postId);
  const { profile } = useProfile();

  if (loading) {
    return <div className="animate-pulse p-4 text-center">Loading comments...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>
      
      <CommentForm postId={postId} />
      
      <div className="mt-8 space-y-1">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            {profile ? 'Be the first to comment!' : 'No comments yet.'}
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              onUpdate={updateComment}
              onDelete={deleteComment}
            />
          ))
        )}
      </div>
    </div>
  );
}