"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, MessageSquare, Award, User, UserMinus } from "lucide-react";
import FeedbackImages from "@/components/feedback-images";
import { useProfile } from "@/contexts/ProfileContext";
import { useFeedbacks } from "@/hooks/useFeedbacks";

export interface FeedbackWithUser {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profile: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
}

export default function FeedbacksPage() {
  const { profile } = useProfile()
  const { fetchFeedbacks, feedbacks, deleteFeedback } = useFeedbacks()
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null)
  
  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const handleClose = () => {
    setSelectedFeedback(null)
  }

  if (!feedbacks) {
    return <div>Loading...</div>
  }
  if (feedbacks.length === 0) {
    return <div className="text-center p-6">No feedbacks available yet.</div>;
  }
  return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Feedback</h1>
      
      {/* Feedback Grid */}
      <div className="grid grid-cols-1 [grid-template-rows:masonry] sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-all duration-300"
            onClick={() => setSelectedFeedback(feedback)}
          >
            <div className="p-4 flex flex-col h-full">
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium">
                  {feedback.category}
                </span>
              </div>
              
              {/* Subject */}
              <h3 className="font-semibold text-lg mb-2 text-gray-800">{feedback.subject}</h3>
              
              {/* Message Preview */}
              <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{feedback.message}</p>
              
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

              
              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                <div className="flex items-center">
                  {feedback.is_anonymous ? (
                    <UserMinus size={16} className="mr-1" />
                  ) : (
                    <User size={16} className="mr-1" />
                  )}
                  <span>
                    {feedback.is_anonymous ? "Anonymous" : feedback.profiles!.first_name + " " + feedback.profiles!.last_name}
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
        ))}
      </div>
      
        {/* Modal View */}
        <AnimatePresence>
        {selectedFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium mb-3">
                      {selectedFeedback.category}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedFeedback.subject}</h2>
                  </div>
                  <button 
                    onClick={handleClose}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Message Content */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-medium flex items-center">
                    <MessageSquare size={16} className="mr-2" />
                    Message
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedFeedback.message}</p>
                </div>

                {/* Recommendation if available */}
                {selectedFeedback.recommendation && (
                  <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="text-sm uppercase tracking-wider text-green-700 mb-2 font-medium flex items-center">
                      <Award size={16} className="mr-2" />
                      Recommendation
                    </h3>
                    <p className="text-green-800">{selectedFeedback.recommendation}</p>
                  </div>
                )}

                {/* Images if available */}
                {selectedFeedback.image_urls && selectedFeedback.image_urls.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3 font-medium">
                      Attachments
                    </h3>
                    <FeedbackImages images={selectedFeedback.image_urls} maxDisplay={4} fullSize />
                  </div>
                )}

                {/* Footer Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                   {/* Show delete button only for the user's own feedback */}
                  {profile && profile.id === selectedFeedback.profile_id && (
                    <button
                      onClick={() => deleteFeedback(selectedFeedback.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                      aria-label="Delete feedback"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  <div className="flex items-center">
                    {selectedFeedback.is_anonymous ? (
                      <UserMinus size={16} className="mr-1" /> 
                    ) : (
                      <User size={16} className="mr-1" />
                    )}
                    <span>{selectedFeedback.is_anonymous ? "Submitted anonymously" : selectedFeedback.profiles.first_name + " " + selectedFeedback.profiles.last_name}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}