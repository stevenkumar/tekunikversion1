import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Globe, Smartphone, Palette, Search,
  X, CheckCircle2, ArrowRight
} from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

const services = [
  {
    id: 'web',
    title: "Web Architecture",
    icon: <Globe size={40} />,
    shortDesc: "Scalable digital ecosystems.",
    fullDesc: "We don't just build websites; we engineer high-traffic digital engines. From Mumbai to the world, our code is optimized for extreme performance and global reach.",
    realLife: "Think of it as the Bandra-Worli Sea Link—a high-speed connection that handles massive volume with ease and looks iconic.",
    features: ["Next.js 15 PWA", "Microservices Architecture", "Cloud-Native Deployment", "SEO Dominance"],
    color: "bg-brand-green",
    gradient: "from-brand-green to-brand-cyan"
  },
  {
    id: 'mobile',
    title: "Mobile UI",
    icon: <Smartphone size={40} />,
    shortDesc: "Native iOS & Android apps.",
    fullDesc: "Creating seamless mobile experiences that live in your user's pocket. We focus on high-retention apps with buttery-smooth animations.",
    realLife: "Like a Mumbai local train pass; essential, always with you, and gets you exactly where you need to go instantly.",
    features: ["Flutter/React Native", "Biometric Security", "Offline-First Sync", "App Store Optimization"],
    color: "bg-brand-cyan",
    gradient: "from-brand-cyan to-brand-green"
  },
  {
    id: 'design',
    title: "Brand Design",
    icon: <Palette size={40} />,
    shortDesc: "Intelligent UX & Design.",
    fullDesc: "Design is not just how it looks; it's how it works. Our creative fanatics build design systems that make brands unforgettable.",
    realLife: "Like the Art Deco buildings in South Mumbai; timeless elegance meets modern functionality.",
    features: ["Design Systems", "Interactive Prototypes", "Visual Storytelling", "Accessibility (WCAG)"],
    color: "bg-brand-green",
    gradient: "from-brand-green to-brand-cyan"
  }
];

export default function ServicesShowcase() {
  usePageMeta('Services Showcase', 'Browse Tekunik complete service solutions and capabilities.');
  const [selectedId, setSelectedId] = useState(null);

  const selectedService = services.find(s => s.id === selectedId);

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-brand-cyan font-mono mb-2 tracking-widest uppercase text-sm">Expertise List</motion.p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">TEKUNIK <span className="text-slate-700">SOLUTIONS</span></h2>
        </header>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item) => (
            <motion.div
              layoutId={item.id}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="relative p-8 rounded-3xl bg-[#111] border border-white/5 cursor-pointer hover:border-white/20 transition-colors group"
              whileHover={{ y: -10 }}
            >
              <motion.div
                layoutId={`icon-container-${item.id}`}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}
              >
                {item.icon}
              </motion.div>
              <motion.h3 layoutId={`title-${item.id}`} className="text-2xl font-bold mb-2">{item.title}</motion.h3>
              <motion.p layoutId={`desc-${item.id}`} className="text-slate-400 text-sm">{item.shortDesc}</motion.p>

              <motion.div className="mt-8 flex items-center text-xs font-bold tracking-widest text-white/30 group-hover:text-white transition-colors">
                VIEW PROCESS <ArrowRight size={14} className="ml-2" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Full Information Overlay */}
        <AnimatePresence>
          {selectedId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
              {/* Blurred Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              />

              {/* The "Big" Card */}
              <motion.div
                layoutId={selectedId}
                className="relative w-full max-w-4xl bg-[#111] rounded-[40px] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl"
              >
                {/* Left Side: Visual/Color */}
                <div className={`w-full md:w-1/3 bg-linear-to-br ${selectedService.gradient} p-12 flex flex-col justify-between`}>
                  <motion.div layoutId={`icon-container-${selectedId}`} className="text-white">
                    {selectedService.icon}
                  </motion.div>
                  <div>
                    <h4 className="text-white/60 font-mono text-xs uppercase tracking-widest mb-2">Service Identity</h4>
                    <motion.h3 layoutId={`title-${selectedId}`} className="text-3xl font-black text-white">{selectedService.title}</motion.h3>
                  </div>
                </div>

                {/* Right Side: Detailed Info */}
                <div className="w-full md:w-2/3 p-8 md:p-16 relative">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-8 right-8 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
                  >
                    <X size={24} />
                  </button>

                  <div className="space-y-8">
                    <section>
                      <h5 className="text-brand-green font-bold uppercase text-xs tracking-widest mb-4">The Solution</h5>
                      <motion.p layoutId={`desc-${selectedId}`} className="text-xl text-slate-200 leading-relaxed font-light">
                        {selectedService.fullDesc}
                      </motion.p>
                    </section>

                    <section className="grid grid-cols-2 gap-4">
                      {selectedService.features.map(feature => (
                        <div key={feature} className="flex items-center space-x-2 text-sm text-slate-400">
                          <CheckCircle2 size={16} className="text-brand-green" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </section>

                    <section className="p-6 bg-white/5 rounded-2xl border-l-4 border-brand-cyan">
                      <h5 className="text-white font-bold text-sm mb-2 italic">🚀 The TekUnik Real-Life Analogy</h5>
                      <p className="text-slate-400 text-sm italic">{selectedService.realLife}</p>
                    </section>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}