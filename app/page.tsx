import NewsCarousel from "@/components/carousel/news-carousel";
import CTA from "@/components/cta";
import Hero from "@/components/hero";
import MeetTheTeam from "@/components/meet-the-team";
import RecentFeedbacks from "@/components/recent-feedbacks";
import ResolutionsFeed from "@/components/resolutions-feed";
import { TEAM_MEMBERS } from "@/constants/team-members";

export default function Home() {
  return (
    <section className="flex flex-col gap-20">
      <Hero />
      <NewsCarousel />
      {/* <RecentFeedbacks /> */}
      <ResolutionsFeed />
      {/* <MeetTheTeam members={TEAM_MEMBERS} /> */}
      <CTA />
    </section>
  );
}
