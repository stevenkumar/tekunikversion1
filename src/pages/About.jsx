import AboutHeader from "../components/features/about/AboutHeader";
import WhoWeAre from "../components/features/about/WhoWeAre";
import OurValues from "../components/features/about/OurValues";
import OurProcess from "../components/features/about/OurProcess";
import TechStack from "../components/features/about/TechStack";

export default function About() {
  return (
    <section className="bg-linear-to-br from-blue-50 to-indigo-50 py-12 px-4 md:px-8 lg:px-16">
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