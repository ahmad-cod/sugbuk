import CTA from "@/components/cta";
import Hero from "@/components/hero";
import RecentFeedbacks from "@/components/recent-feedbacks";

export default function Home() {
  return (
    <section className="flex flex-col gap-20">
      <Hero />
      <RecentFeedbacks />
      <CTA />
    </section>
  );
}
