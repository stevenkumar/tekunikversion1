import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    X,
    CheckCircle2
} from 'lucide-react';

import { services } from '@/data/servicesData';

export default function ServicesList() {
    const [searchParams] = useSearchParams();
    const [selectedId, setSelectedId] = useState(null);
    const hasScrolledRef = useRef(false);

    // Filter service for the modal
    const selectedService = services.find(s => s.id === selectedId);

    useEffect(() => {
        if (searchParams && !hasScrolledRef.current) {
            const serviceParam = searchParams.get('service');
            if (serviceParam) {
                const found = services.find(s => s.title.toLowerCase() === serviceParam.toLowerCase());
                if (found) {
                    setSelectedId(found.id);
                    hasScrolledRef.current = true;
                }
            }
        }
    }, [searchParams]);

    return (
        <div className="relative">
            {/* Main Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4"
            >
                {services.map((service) => {
                    const IconComponent = service.icon;
                    return (
                        <motion.div
                            key={service.id}
                            layoutId={service.id}
                            onClick={() => setSelectedId(service.id)}
                            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-all group"
                        >
                            <motion.div
                                layoutId={`icon-box-${service.id}`}
                                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.bg}`}
                            >
                                <IconComponent className={service.color} size={28} />
                            </motion.div>

                            <motion.h3 layoutId={`title-${service.id}`} className="text-xl font-bold text-gray-900 mb-3">
                                {service.title}
                            </motion.h3>

                            <motion.p layoutId={`desc-${service.id}`} className="text-gray-600 text-sm leading-relaxed mb-6">
                                {service.description}
                            </motion.p>

                            <div className="flex items-center text-sm font-semibold text-brand-green">
                                View Full Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Modal Overlay */}
            <AnimatePresence mode="wait">
                {selectedId && selectedService && (() => {
                    const ModalIcon = selectedService.icon;
                    return (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            />

                            <motion.div
                                layoutId={selectedId}
                                className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto lg:h-[500px] max-h-[90vh] z-10"
                            >
                                {/* Left Side Branding */}
                                <div className={`w-full md:w-1/3 bg-linear-to-br ${selectedService.gradient} lg:p-10 p-6 text-white flex flex-col justify-between`}>
                                    <motion.div layoutId={`icon-box-${selectedId}`} className="bg-white/20 lg:w-16 lg:h-16 w-10 h-10 rounded-2xl flex items-center justify-center">
                                        <ModalIcon size={32} />
                                    </motion.div>

                                    <div>
                                        <h4 className="text-white/70 font-mono text-xs uppercase tracking-widest mb-2 lg:mt-0 mt-3">Service Solution</h4>
                                        <motion.h3 layoutId={`title-${selectedId}`} className="lg:text-3xl text-2xl font-black">
                                            {selectedService.title}
                                        </motion.h3>
                                    </div>
                                </div>

                                {/* Right Side Content */}
                                <div className="w-full md:w-2/3 lg:p-8 p-6 md:p-12 pb-8 bg-white relative overflow-y-auto">
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600 z-10"
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="space-y-8 mt-4">
                                        <section>
                                            <h5 className="text-brand-green font-bold uppercase text-xs tracking-widest mb-3">Overview</h5>
                                            <motion.p layoutId={`desc-${selectedId}`} className="text-lg text-gray-700 leading-relaxed">
                                                {selectedService.description}
                                            </motion.p>
                                        </section>

                                        <section>
                                            <h5 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-4">Key Capabilities</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                                {selectedService.details.map((detail, i) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        key={i}
                                                        className="flex items-center gap-3 text-gray-600 text-sm"
                                                    >
                                                        <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                                                        <span>{detail}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </section>

                                        <div className="pt-6 border-t border-gray-100">
                                            <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-green transition-colors">
                                                Inquire About {selectedService.title}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
}