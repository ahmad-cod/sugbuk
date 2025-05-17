'use client';

import { Feedback } from '@/app/feedbacks/utils';
import { motion } from "motion/react"
import { X, MessageSquare, Award, User, UserMinus } from "lucide-react";
import FeedbackImages from "@/components/feedback-images";


interface FeedbackCardProps {
  feedback: Feedback;
  index?: number;
  setSelectedFeedback?: (feedback: Feedback) => void;
  showActions?: boolean;
}

const categoryColors = {
  complaint: 'bg-red-100 text-red-800',
  suggestion: 'bg-blue-100 text-blue-800',
  appreciation: 'bg-green-100 text-green-800',
  general: 'bg-gray-100 text-gray-800',
};

export function FeedbackCard({ feedback }: FeedbackCardProps) {

  return (
    <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-all duration-300"
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

               {/* Video Preview */}
               {feedback.video_urls && feedback.video_urls.length > 0 && (
                  <div className="mb-4 flex flex-col gap-3">
                    {feedback.video_urls.slice(0, 2).map((url, index) => {
                      const extension = url.split('.').pop()?.toLowerCase();
                      const mimeType = extension === 'webm'
                        ? 'video/webm'
                        : extension === 'ogg'
                        ? 'video/ogg'
                        : 'video/mp4';

                      return (
                        <video
                          key={index}
                          controls
                          className="rounded-lg w-full max-h-64 object-cover"
                        >
                          <source src={url} type={mimeType} />
                          Your browser does not support the video tag.
                        </video>
                      );
                    })}
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
}

export default FeedbackCard;