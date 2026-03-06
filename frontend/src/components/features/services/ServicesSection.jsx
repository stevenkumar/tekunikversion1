import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, ShieldCheck, Settings, Code, BarChart3 } from 'lucide-react';

const services = [
  {
    title: "Domain Acquisition",
    description: "Secure your unique identity with global and local domain registration services tailored to your brand.",
    icon: <Globe className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Web Hosting",
    description: "High-performance cloud hosting solutions ensuring 99.9% uptime and lightning-fast loading speeds.",
    icon: <Server className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "SSL Certificates",
    description: "End-to-end encryption to protect user data and boost your site's credibility and SEO ranking.",
    icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Website Management",
    description: "Full-scale maintenance and security updates, allowing you to focus on your core business goals.",
    icon: <Settings className="w-8 h-8 text-orange-500" />,
  },
  {
    title: "Custom Development",
    description: "Transforming complex code into clean, beautiful web interfaces that provide seamless user experiences.",
    icon: <Code className="w-8 h-8 text-pink-500" />,
  },
  {
    title: "Digital Strategy",
    description: "Multi-channel marketing solutions designed to reach your audience and lift your brand to the top.",
    icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
  },
];

const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-20 px-6 bg-slate-50 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Our Core Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We offer the most effective multi-channel and multi-platform digital solutions 
            to help your brand reach its full potential globally.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4 bg-slate-50 dark:bg-slate-700 w-16 h-16 rounded-xl flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;