import { Feedback } from "@/app/feedbacks/utils";
import { FeedbackCard } from "./feedback-card";
import { fetchFeedbacks } from "@/lib/api";


export default async function RecentFeedbacks() {
  const feedbacks = await fetchFeedbacks()
  const recentFeedbacks = feedbacks.slice(0, 3)

  return (
    <div className="p-3 min-h-[400px] sm:p-6 lg:p-8 max-w-7xl mx-auto bg-[#F5F5F5]">
        <h2 className="text-3xl font-bold">Recent Feedbacks</h2>
        <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3 transition-all duration-400 ease-in-out">
          {
          recentFeedbacks.map((feedback: Feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))
        }
        </div>
    </div>
  )
}

const FeedbackSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="p-4 rounded-lg bg-gray-300 animate-pulse h-[100px] w-full"></div>
    ))}
  </div>
)
