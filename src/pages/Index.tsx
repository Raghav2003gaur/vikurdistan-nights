import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ToursSection } from "@/components/home/ToursSection";
import { VillasSection } from "@/components/home/VillasSection";
import { ExperiencesPreview } from "@/components/home/ExperiencesPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { FloatingButtons } from "@/components/shared/FloatingButtons";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ToursSection />
      <VillasSection />
      <ExperiencesPreview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <FloatingButtons />
    </main>
  );
};

export default Index;
