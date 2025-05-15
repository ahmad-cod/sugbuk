"use client"
import { useFeedbacks } from "@/hooks/useFeedbacks";
import { FeedbackCard } from "./feedback-card";


export default function RecentFeedbacks() {
  const { getLastThreeFeedbacks } = useFeedbacks()
  const recentFeedbacks = getLastThreeFeedbacks()

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-[#F5F5F5]">
        <h2 className="text-3xl font-bold">Recent Feedbacks</h2>
        <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {recentFeedbacks.map(feedback => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
    </div>
  )
}