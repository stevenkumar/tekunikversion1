
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Code, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    title: "The Blueprint (Discovery)",
    description: "Just like planning a Mumbai skyscraper, we start with a solid foundation. We dive deep into your brand DNA and market landscape.",
    icon: <Lightbulb className="w-8 h-8 text-brand-green" />,
    dailyLife: "Like checking the weather and traffic before a big commute—preparation is everything."
  },
  {
    title: "Intelligent Design",
    description: "Our creative fanatics craft engaging experiences. We don't just make it look good; we make it work for your users.",
    icon: <PenTool className="w-8 h-8 text-brand-cyan" />,
    dailyLife: "Like a tailor stitching a custom-fit suit; every detail is measured to your brand's unique size."
  },
  {
    title: "The Construction (Development)",
    description: "Our techies breathe life into designs. Using the latest tech stacks, we build robust, scalable digital solutions.",
    icon: <Code className="w-8 h-8 text-brand-green" />,
    dailyLife: "The heavy lifting. Like the local trains of Mumbai, we ensure the engine is powerful and runs on time."
  },
  {
    title: "The Grand Launch",
    description: "We deploy your project to the global market. It’s not just a release; it’s an event designed for maximum impact.",
    icon: <Rocket className="w-8 h-8 text-brand-cyan" />,
    dailyLife: "The ribbon-cutting ceremony. Your brand finally opens its doors to the world."
  },
  {
    title: "Scaling New Heights",
    description: "Post-launch, we analyze data and optimize for ROI. We don't just stay at the top; we keep climbing.",
    icon: <TrendingUp className="w-8 h-8 text-brand-green" />,
    dailyLife: "Upgrading your lifestyle. We refine, iterate, and ensure you're always ahead of the curve."
  }
];

const OurProcess = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Our Process: From Vision to <span className="text-brand-green">Reality</span>
          </motion.h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            At TekUnik, we bridge the gap between complex tech and everyday simplicity.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-brand-green/10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Content Card */}
              <div className="w-full md:w-5/12">
                <div className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-slate-100">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="bg-brand-green/5 p-3 rounded-lg border-l-4 border-brand-green">
                    <p className="text-xs italic text-brand-green font-medium">
                      🚀 Real Life: {step.dailyLife}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Dot */}
              <div className="z-10 flex items-center justify-center w-10 h-10 bg-brand-green rounded-full text-white font-bold shadow-lg my-6 md:my-0">
                {index + 1}
              </div>

              {/* Empty Spacer for Desktop */}
              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
