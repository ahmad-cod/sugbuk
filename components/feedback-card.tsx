'use client';

import { Feedback } from '@/app/feedbacks/utils';
import { motion, AnimatePresence } from "motion/react"
import { X, MessageSquare, Award, User, UserMinus } from "lucide-react";
import FeedbackImages from "@/components/feedback-images";
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface FeedbackCardProps {
  feedback: Feedback;
  index?: number;
  setSelectedFeedback?: (feedback: Feedback) => void;
  showActions?: boolean;
}

export function FeedbackCard({ feedback, showActions = false }: FeedbackCardProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const categoryColors = {
    complaint: 'bg-red-100 text-red-800',
    suggestion: 'bg-blue-100 text-blue-800',
    appreciation: 'bg-green-100 text-green-800',
    general: 'bg-gray-100 text-gray-800',
  };

  return (
    <motion.div
            // key={index}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-all duration-300"
            // onClick={() => setSelectedFeedback(feedback)}
          >
            <div className="p-4 flex flex-col h-full">
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium">
                  {feedback.category}
                </span>
              </div>
              
              {/* Subject */}
              <h3 className="font-semibold font-heading text-xl mb-4 text-gray-800">{feedback.subject}</h3>

              {/* Images Preview (if available) */}
              {feedback.image_urls && feedback.image_urls.length > 0 && (
                <div className="mb-4">
                  <FeedbackImages images={feedback.image_urls} maxDisplay={2} />
                </div>
              )}
              
              {/* Message Preview */}
              <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{feedback.message}</p>
              
              
              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                <div className="flex items-center">
                  {feedback.is_anonymous ? (
                    <UserMinus size={16} className="mr-1" />
                  ) : (
                    <User size={16} className="mr-1" />
                  )}
                  <span>
                    {feedback.is_anonymous ? "Anonymous" : feedback.profiles?.first_name + " " + feedback.profiles?.last_name}
                  </span>
                </div>
                {feedback.recommendation && (
                  <div className="flex items-center text-green-600">
                    <Award size={16} className="mr-1" />
                    <span>Recommendation</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
  )



  // return (
  //   <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800">
  //     <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
  //       {feedback.subject}
  //     </h3>
  //     <div className="flex items-center space-x-2">
              
  //       <Badge 
  //         variant="secondary"
  //         className={`${categoryColors[feedback.category as keyof typeof categoryColors]}`}
  //       >
  //         {feedback.category}
  //       </Badge>
  //     </div>

  //     <div className="flex items-start justify-between">
  //       <div className="flex items-start space-x-4">
  //         {!feedback.is_anonymous && feedback.profiles && (
  //           <Avatar className="h-10 w-10">
  //             <AvatarImage 
  //               src={feedback.profiles.avatar_url || ''} 
  //               alt={`${feedback.profiles.first_name} ${feedback.profiles.last_name}`} 
  //             />
  //             <AvatarFallback>
  //               {getInitials(feedback.profiles.first_name, feedback.profiles.last_name)}
  //             </AvatarFallback>
  //           </Avatar>
  //         )}
  //         <div>
            
  //           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
  //             {feedback.is_anonymous ? 'Anonymous' : 
  //               `${feedback.profiles?.first_name} ${feedback.profiles?.last_name}`}
  //           </p>
  //         </div>
  //       </div>
  //       <time className="text-sm text-gray-500 dark:text-gray-400">
  //         {formatDistanceToNow(new Date(feedback.created_at), { addSuffix: true })}
  //       </time>
  //     </div>

  //     <div className="mt-4">
  //       <p className="text-gray-700 dark:text-gray-300">{feedback.message}</p>
  //       {feedback.recommendation && (
  //         <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
  //           <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
  //             Recommendation
  //           </h4>
  //           <p className="text-blue-700 dark:text-blue-300">
  //             {feedback.recommendation}
  //           </p>
  //         </div>
  //       )}
  //     </div>

  //     {feedback.image_urls && feedback.image_urls.length > 0 && (
  //       <div className="mt-4 grid grid-cols-2 gap-2">
  //         {feedback.image_urls.map((url, index) => (
  //           <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
  //             <Image
  //               src={url}
  //               alt={`Evidence ${index + 1}`}
  //               fill
  //               className="object-cover hover:scale-105 transition-transform duration-300"
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     )}

  //     {/* {showActions && (
  //       <div className="mt-4 flex items-center justify-end space-x-2">
  //         <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
  //           Share
  //         </button>
  //         <button className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
  //           Report
  //         </button>
  //       </div>
  //     )} */}
  //   </Card>
  // );
}