import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { services } from '@/data/servicesData';

// 1. Unified Transition: High-stiffness spring for that "Apple-style" snap
const transition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1
};

export default function ServicesList() {
  const [searchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState(null);
  const hasScrolledRef = useRef(false);

  const selectedService = services.find((s) => s.id === selectedId);

  // 2. Prevent Background Scroll & Layout Shift
  useEffect(() => {
    if (selectedId) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`; // Prevents "jumping"
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [selectedId]);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && !hasScrolledRef.current) {
      const found = services.find(
        (s) => s.title.toLowerCase() === decodeURIComponent(serviceParam).toLowerCase()
      );
      if (found) {
        setSelectedId(found.id);
        hasScrolledRef.current = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  return (
    <div className="relative pt-10 min-h-screen">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 max-w-7xl mx-auto">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              layoutId={`card-${service.id}`} // Unique layoutId
              transition={transition}
              onClick={() => setSelectedId(service.id)}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 cursor-pointer hover:shadow-2xl group relative"
            >
              <motion.div
                layoutId={`icon-box-${service.id}`}
                transition={transition}
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.bg}`}
              >
                <IconComponent className={service.color} size={28} />
              </motion.div>

              <motion.h3
                layoutId={`title-${service.id}`}
                transition={transition}
                className="text-xl font-bold text-gray-900 mb-3"
              >
                {service.title}
              </motion.h3>

              <motion.p
                layoutId={`desc-${service.id}`}
                transition={transition}
                className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2"
              >
                {service.description}
              </motion.p>

              <div className="flex items-center text-sm font-semibold text-brand-green">
                View Full Details
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Section */}
      <AnimatePresence>
        {selectedId && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Smooth Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-zoom-out"
            />

            {/* Expanded Card */}
            <motion.div
              layoutId={`card-${selectedId}`}
              transition={transition}
              className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto lg:h-[500px] max-h-[90vh] z-10"
            >
              {/* Left Side */}
              <div className={`w-full md:w-1/3 bg-linear-to-br ${selectedService.gradient} lg:p-10 p-6 text-white flex flex-col justify-between`}>
                <motion.div
                  layoutId={`icon-box-${selectedId}`}
                  transition={transition}
                  className="bg-white/20 lg:w-16 lg:h-16 w-12 h-12 rounded-2xl flex items-center justify-center"
                >
                  <selectedService.icon size={32} />
                </motion.div>

                <div>
                  <h4 className="text-white/70 font-mono text-xs uppercase tracking-widest mb-2 lg:mt-0 mt-6">
                    Service Solution
                  </h4>
                  <motion.h3
                    layoutId={`title-${selectedId}`}
                    transition={transition}
                    className="lg:text-3xl text-2xl font-black"
                  >
                    {selectedService.title}
                  </motion.h3>
                </div>
              </div>

              {/* Right Side Content */}
              <div className="w-full md:w-2/3 lg:p-8 p-6 md:p-12 bg-white relative overflow-y-auto">
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600 z-10"
                >
                  <X size={20} />
                </button>

                <div className="space-y-8 mt-4">
                  <section>
                    <h5 className="text-brand-green font-bold uppercase text-xs tracking-widest mb-3">Overview</h5>
                    <motion.p
                      layoutId={`desc-${selectedId}`}
                      transition={transition}
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      {selectedService.description}
                    </motion.p>
                  </section>

                  {/* Capabilities - These fade in/out so they don't break the layoutId morph */}
                  <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h5 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-4">Key Capabilities</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                      {selectedService.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                          <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </motion.section>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pt-6 border-t border-gray-100"
                  >
                    <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-green transition-all transform active:scale-95">
                      Inquire About {selectedService.title}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}