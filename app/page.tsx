"use client";
import dynamic from "next/dynamic";
import CTA from "@/components/cta";
import Hero from "@/components/hero";

const RecentFeedbacks = dynamic(() => import('@/components/recent-feedbacks'), {
  ssr: false,
  loading: () => <div className="h-96 w-full flex items-center justify-center">Loading...</div>,
});
export default function Home() {
  return (
    <section className="flex flex-col gap-20">
      <Hero />
      <RecentFeedbacks />
      <CTA />
    </section>
  );
}
