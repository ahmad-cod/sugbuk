import CTA from "@/components/cta";
import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { FeedbackCard } from "@/components/feedback-card";
import RecentFeedbacks from "@/components/recent-feedbacks";

export default function Home() {
  return (
    <section className="flex flex-col gap-10">
      <Hero />
      {/* <main className="flex-1 flex flex-col gap-6">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}

      </main> */}

      <RecentFeedbacks />
      <CTA />
    </section>
  );
}
