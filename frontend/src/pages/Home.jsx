import WhyChooseUs from "../components/features/home/WhyChooseUs";
import HeroSlider from "../components/features/home/HeroSlider";
import AboutPreview from "../components/features/home/AboutPreview";
import ServicesPreview from "../components/features/home/ServicesPreview";
import Stats from "../components/features/home/Stats";
import CTA from "../components/features/home/CTA";
import Btntop from "../components/layout/BtnTop";
import usePageMeta from "../hooks/usePageMeta";
import ClientLogos from "../components/features/home/ClientLogo";


export default function Home() {
  usePageMeta('', 'Tekunik offers complete digital solutions including web development, mobile apps, UI/UX design, SEO optimization, and e-commerce solutions.');
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
      {/* ================= CLIENT LOGOS ================= */}
      <ClientLogos />

      {/* ================= CTA ================= */}
      <CTA />

      <Btntop />
    </div>
  );
}