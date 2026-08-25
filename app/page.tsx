import AboutSection from "@/components/home/AboutSection";
import ActionCards from "@/components/home/ActionCards";
import DiagonalOverlapCard from "@/components/home/DiagonalOverlapCard";
import HeroSection from "@/components/home/HeroSection";
import LoginGreeting from "@/components/home/LoginGreeting";
import PromotionsSection from "@/components/home/PromotionsSection";
import RecommendedSection from "@/components/home/RecommendedSection";

export default function HomePage() {
  return (
    <div className="pb-section">
      <HeroSection />

      <DiagonalOverlapCard>
        <LoginGreeting />
        <ActionCards />
        <RecommendedSection />
      </DiagonalOverlapCard>

      <PromotionsSection />
      <AboutSection />
    </div>
  );
}
