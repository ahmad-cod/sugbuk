import CTA from "@/components/cta";
import Hero from "@/components/hero";
import MeetTheTeam from "@/components/meet-the-team";
import RecentFeedbacks from "@/components/recent-feedbacks";
import { TEAM_MEMBERS } from "@/constants/team-members";

export default function Home() {
  return (
    <section className="flex flex-col gap-20">
      <Hero />
      <RecentFeedbacks />
      <MeetTheTeam members={TEAM_MEMBERS} />
      <CTA />
    </section>
  );
}
