"use client"
import { useFeedbacks } from "@/hooks/useFeedbacks";
import { FeedbackCard } from "./feedback-card";


export default function RecentFeedbacks() {
  const { feedbacks, isLoading, getLastThreeFeedbacks } = useFeedbacks()
  const recentFeedbacks = getLastThreeFeedbacks()
  console.log(recentFeedbacks)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto bg-[#F5F5F5]">
        <h2 className="text-2xl font-bold">Recent Feedbacks</h2>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {recentFeedbacks.map(feedback => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
    </div>
  )
}