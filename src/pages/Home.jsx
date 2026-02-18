import WhyChooseUs from "./WhyChooseUs";
import HeroSlider from "../components/features/home/HeroSlider";
import AboutPreview from "../components/features/home/AboutPreview";
import ServicesPreview from "../components/features/home/ServicesPreview";
import Stats from "../components/features/home/Stats";
import CTA from "../components/features/home/CTA";
import Btntop from "../components/layout/BtnTop";

export default function Home() {
  return (
    <div className="bg-white">
      {/* ================= HERO SECTION WITH ANIMATED SLIDER ================= */}
      <HeroSlider />

      {/* ================= ABOUT PREVIEW ================= */}
      <AboutPreview />

      {/* ================= SERVICES ================= */}
      <ServicesPreview />

      {/* ================= WHY CHOOSE US ================= */}
      <WhyChooseUs />
      {/* ================= STATS ================= */}
      <Stats />

      {/* ================= CTA ================= */}
      <CTA />
      
      <Btntop />
    </div>
  );
}