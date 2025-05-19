"use client"

import { useProfile } from '@/contexts/ProfileContext';
import { redirect } from 'next/navigation';
// import { useProfile } from "@/contexts/ProfileContext"
// import AvatarInitials from "./avatar-initials"
// import { useState } from "react"

// interface CommentFormProps {
//   postId: number;
// }

// export default function CommentForm(
//   { postId }: CommentFormProps
// ) {
//   const [comment, setComment] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const { profile } = useProfile()
//   if (!profile) return null
//   const { first_name, last_name, avatar_url } = profile
//   const initials = `${first_name[0]}${last_name[0]}`.toUpperCase()

//   // TODO: sanitize and validate the input, send the data to the supabase server, and reset the form
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError(null)
    

//     //1 Handle form submission logic here

//     //2 sanitize and validate the input
//     //3 send the data to the server
//     //4 reset the form

//   }
//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     // Handle textarea change logic here
//   }
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       // Handle enter key logic here
//     }
//   }

//   return (
//     <section>
//       <div className="flex items-center gap-2 mb-4">
//         <div className="flex items-center justify-center overflow-hidden rounded-full ring-2 ring-white transition-all duration-200 ease-in-out hover:ring-indigo-100">
//           {avatar_url ? (
//             <img
//               src={avatar_url}
//               alt={`${first_name} ${last_name}`}
//               className="h-8 w-8 object-cover"
//             />
//           ) : (
//             <AvatarInitials
//               firstname={first_name}
//               lastname={last_name}
//             />
//           )}
//         </div>
//         <span>{`${first_name} ${last_name}`}</span>
//       </div>
//       <form>
//         <div className="">
//           <textarea
//             className="w-full p-2 border rounded-md"
//             placeholder="What are your thoughts..."
//             rows={2}
//           ></textarea>
//         </div>
//         <div className="flex items-center justify-between mt-2">
//           <div className="flex items-center gap-2">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//               Submit
//             </button>
//         </div>
//         </div>
//       </form>
//     </section>
//   )
// }


import { useState } from 'react';

interface CommentFormProps {
  postId: string;
  parentCommentId?: string;
  onCommentAdded?: () => void;
  placeholder?: string;
}

export default function CommentForm({ 
  postId, 
  parentCommentId, 
  onCommentAdded,
  placeholder = 'What are your thoughts on this?'
}: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    if (!profile) {
      console.error('User not logged in');
      alert('Please log in to add a comment.');
      redirect('/sign-in');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          postId,
          parentCommentId,
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add comment');
      }
      
      setContent('');
      if (onCommentAdded) onCommentAdded();
      
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!profile) {
    return (
      <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
        <a href="/login" className="text-blue-500 hover:underline">Log in</a> to add a comment
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-start gap-3">
        <img 
          src={profile.avatar_url || '/default-avatar.png'} 
          alt={profile.first_name || 'User'} 
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            required
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}