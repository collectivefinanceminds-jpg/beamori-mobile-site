import AboutSection from "@/components/home/AboutSection";
import ActionCards from "@/components/home/ActionCards";
import DiagonalOverlapCard from "@/components/home/DiagonalOverlapCard";
import HeroSection from "@/components/home/HeroSection";
import LoginGreeting from "@/components/home/LoginGreeting";
import PromotionsSection from "@/components/home/PromotionsSection";
import RecommendedSection from "@/components/home/RecommendedSection";
import TaskCenterSection from "@/components/home/TaskCenterSection";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let displayName: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single();
    displayName = profile?.display_name || null;
  }

  return (
    <div className="pb-section">
      <HeroSection />

      <DiagonalOverlapCard>
        <LoginGreeting displayName={displayName} />
        <ActionCards />
        <RecommendedSection />
      </DiagonalOverlapCard>

      {user && <TaskCenterSection />}
      <PromotionsSection />
      <AboutSection />
    </div>
  );
}
