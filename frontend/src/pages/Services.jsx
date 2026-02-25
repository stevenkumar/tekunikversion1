import ServicesHeader from "../components/features/services/ServicesHeader";
import ServicesList from "../components/features/services/ServicesList";
import ServicesCTA from "../components/features/services/ServicesCTA";
import usePageMeta from "../hooks/usePageMeta";

export default function Services() {
  usePageMeta('Our Services', 'Explore Tekunik services — web development, mobile apps, UI/UX design, SEO optimization, e-commerce solutions, and ongoing maintenance.');
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-24 relative min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <ServicesHeader />

        {/* Services Grid */}
        <ServicesList />

        {/* CTA Section */}
        <ServicesCTA />

      </div>
    </section>
  );
}