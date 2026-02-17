import WhyChooseUs from "./WhyChooseUs";
import HeroSlider from "../component/HeroSlider";
import AboutPreview from "../component/home/AboutPreview";
import ServicesPreview from "../component/home/ServicesPreview";
import Stats from "../component/home/Stats";
import CTA from "../component/home/CTA";
import Btntop from "../component/Btntop";

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
<Btntop/>
      {/* ================= STATS ================= */}
      <Stats />

      {/* ================= CTA ================= */}
      <CTA />
    </div>
  );
}