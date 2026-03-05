import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { services } from "@/data/servicesData";
import { Link } from "react-router-dom";

// Unified smooth spring transition
const transition = {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 1
};

export default function ServicesPreviews() {
    const [selectedId, setSelectedId] = useState(null);
    const selectedService = services.find((s) => s.id === selectedId);

    // --- Background Scroll Lock ---
    useEffect(() => {
        if (selectedId) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }, [selectedId]);

    return (
        <section className="py-20 bg-slate-50 relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-brand-green font-semibold tracking-wide uppercase text-sm mb-3">
                        Our Expertise
                    </h2>
                    <p className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Our Services
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                        Complete digital solutions under one roof, tailored for growth.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.slice(0, 3).map((service) => {
                        const IconComponent = service.icon;
                        return (
                            <motion.div
                                key={service.id}
                                layoutId={`preview-${service.id}`} // Unique layoutId for this section
                                transition={transition}
                                onClick={() => setSelectedId(service.id)}
                                className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100
                                    hover:shadow-2xl cursor-pointer block relative"
                            >
                                <motion.div
                                    layoutId={`preview-icon-${service.id}`}
                                    transition={transition}
                                    className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center mb-6
                                    group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <IconComponent className={service.color} size={28} />
                                </motion.div>

                                <motion.h3 
                                    layoutId={`preview-title-${service.id}`}
                                    transition={transition}
                                    className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brand-green transition-colors"
                                >
                                    {service.title}
                                </motion.h3>

                                <motion.p 
                                    layoutId={`preview-desc-${service.id}`}
                                    transition={transition}
                                    className="text-gray-600 leading-relaxed line-clamp-3 text-sm"
                                >
                                    {service.description}
                                </motion.p>

                                <span className="mt-6 inline-block text-brand-green font-semibold text-sm group-hover:underline">
                                    Learn more →
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA to go to the actual page if they want to see ALL services */}
                <div className="flex items-center justify-center mt-10">
                    <Link
                        to="/services"
                        className="border border-brand-green text-brand-green px-8 py-3 rounded-full font-medium hover:bg-brand-green/5 transition duration-300"
                    >
                        View All Services
                    </Link>
                </div>
            </div>

            {/* --- Modal Overlay --- */}
            <AnimatePresence>
                {selectedId && selectedService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-zoom-out"
                        />

                        {/* Expanded Card */}
                        <motion.div
                            layoutId={`preview-${selectedId}`}
                            transition={transition}
                            className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto lg:h-[500px] max-h-[90vh] z-10"
                        >
                            {/* Left Side Branding */}
                            <div className={`w-full md:w-1/3 bg-linear-to-br ${selectedService.gradient} lg:p-10 p-6 text-white flex flex-col justify-between`}>
                                <motion.div
                                    layoutId={`preview-icon-${selectedId}`}
                                    transition={transition}
                                    className="bg-white/20 lg:w-16 lg:h-16 w-12 h-12 rounded-2xl flex items-center justify-center"
                                >
                                    <selectedService.icon size={32} />
                                </motion.div>

                                <div>
                                    <h4 className="text-white/70 font-mono text-xs uppercase tracking-widest mb-2 lg:mt-0 mt-6">
                                        Expert Solution
                                    </h4>
                                    <motion.h3
                                        layoutId={`preview-title-${selectedId}`}
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
                                            layoutId={`preview-desc-${selectedId}`}
                                            transition={transition}
                                            className="text-sm text-gray-700 leading-relaxed"
                                        >
                                            {selectedService.description}
                                        </motion.p>
                                    </section>

                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
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
                                            Discuss Your Project
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}