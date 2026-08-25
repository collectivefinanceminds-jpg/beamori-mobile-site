import AboutSection from "@/components/home/AboutSection";
import ActionCards from "@/components/home/ActionCards";
import DiagonalOverlapCard from "@/components/home/DiagonalOverlapCard";
import HeroSection from "@/components/home/HeroSection";
import LoginGreeting from "@/components/home/LoginGreeting";
import PromotionsSection from "@/components/home/PromotionsSection";
import RecommendedSection from "@/components/home/RecommendedSection";
import TaskCenterSection from "@/components/home/TaskCenterSection";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ authError?: string }>;
}) {
  const { authError } = await searchParams;
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
      {authError && (
        <div className="px-gutter pt-3">
          <p className="rounded-card bg-hairline px-4 py-2 text-center text-xs text-ink">
            That link is invalid or has expired. Please try again.
          </p>
        </div>
      )}

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
