import React from 'react';
import { Users, Rocket, Clock, HeartHandshake } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Experienced Team",
      description: "Our veteran developers and designers bring 10+ years of industry expertise to your project.",
      icon: <Users className="w-8 h-8 text-brand-green" />,
      bg: "bg-brand-green/10"
    },
    {
      title: "Modern Technologies",
      description: "We use cutting-edge stacks like React, Next.js, and AI to ensure your product is future-proof.",
      icon: <Rocket className="w-8 h-8 text-brand-cyan" />,
      bg: "bg-brand-cyan/10"
    },
    {
      title: "On-Time Delivery",
      description: "We value your time. Our agile methodology ensures we hit milestones without compromising quality.",
      icon: <Clock className="w-8 h-8 text-brand-green" />,
      bg: "bg-brand-green/10"
    },
    {
      title: "Client-Focused",
      description: "We don't just build apps; we build partnerships. Your business goals are our primary roadmap.",
      icon: <HeartHandshake className="w-8 h-8 text-brand-cyan" />,
      bg: "bg-brand-cyan/10"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-green font-semibold tracking-wide uppercase text-sm mb-3">
            The Tekunik Advantage
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Why partner with us?
          </p>
          <p className="mt-4 text-lg text-gray-600">
            We combine technical excellence with business strategy to deliver digital products that actually move the needle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;