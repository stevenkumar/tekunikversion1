import AboutHeader from "../components/features/about/AboutHeader";
import WhoWeAre from "../components/features/about/WhoWeAre";
import OurValues from "../components/features/about/OurValues";
import OurProcess from "../components/features/about/OurProcess";
import TechStack from "../components/features/about/TechStack";
import usePageMeta from "../hooks/usePageMeta";

export default function About() {
  usePageMeta('About Us', 'Learn about Tekunik — our team, values, process, and the technology stack we use to deliver exceptional digital solutions.');
  return (
    <section className="bg-linear-to-br from-brand-green/5 to-brand-cyan/5 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AboutHeader />

        {/* Who we are */}
        <WhoWeAre />

        {/* Values */}
        <OurValues />

        {/* Process */}
        <OurProcess />

        {/* Tech Stack */}
        <TechStack />
      </div>
    </section>
  );
}