import { useState, useEffect, memo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { services } from "@/data/servicesData";
import { Link } from "react-router-dom";

/** Shared spring transition for layout animations. */
const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 1,
};

/** Stagger container for capability list items. */
const capabilitiesContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
    exit: { opacity: 0 },
};

const capabilityItem = {
    hidden: { opacity: 0, x: 16 },
    show: { opacity: 1, x: 0 },
};

/**
 * ServiceCard — a single card in the preview grid.
 */
const ServiceCard = memo(function ServiceCard({ service, onSelect }) {
    const IconComponent = service.icon;

    return (
        <motion.div
            layoutId={`preview-${service.id}`}
            transition={springTransition}
            onClick={() => onSelect(service.id)}
            whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.98 }}
            className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-pointer block relative"
            role="button"
            tabIndex={0}
            aria-label={`Learn more about ${service.title}`}
            onKeyDown={(e) => e.key === "Enter" && onSelect(service.id)}
        >
            <motion.div
                layoutId={`preview-icon-${service.id}`}
                transition={springTransition}
                className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
                <IconComponent className={service.color} size={28} aria-hidden="true" />
            </motion.div>

            <motion.h3
                layoutId={`preview-title-${service.id}`}
                transition={springTransition}
                className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brand-green transition-colors"
            >
                {service.title}
            </motion.h3>

            <motion.p
                layoutId={`preview-desc-${service.id}`}
                transition={springTransition}
                className="text-gray-600 leading-relaxed line-clamp-3 text-sm"
            >
                {service.description}
            </motion.p>

            <span className="mt-6 inline-block text-brand-green font-semibold text-sm group-hover:underline">
                Learn more →
            </span>
        </motion.div>
    );
});

/**
 * ServiceModal — expanded detail modal for a selected service.
 */
const ServiceModal = memo(function ServiceModal({ service, onClose }) {
    if (!service) return null;
    const IconComponent = service.icon;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${service.title} details`}
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-zoom-out"
                aria-label="Close modal"
            />

            {/* Expanded Card */}
            <motion.div
                layoutId={`preview-${service.id}`}
                transition={springTransition}
                className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto lg:h-[500px] max-h-[90vh] z-10"
            >
                {/* Left Side Branding */}
                <div
                    className={`w-full md:w-1/3 bg-gradient-to-br ${service.gradient} lg:p-10 p-6 text-white flex flex-col justify-between`}
                >
                    <motion.div
                        layoutId={`preview-icon-${service.id}`}
                        transition={springTransition}
                        className="bg-white/20 lg:w-16 lg:h-16 w-12 h-12 rounded-2xl flex items-center justify-center"
                    >
                        <IconComponent size={32} aria-hidden="true" />
                    </motion.div>

                    <div>
                        <h4 className="text-white/70 font-mono text-xs uppercase tracking-widest mb-2 lg:mt-0 mt-6">
                            Expert Solution
                        </h4>
                        <motion.h3
                            layoutId={`preview-title-${service.id}`}
                            transition={springTransition}
                            className="lg:text-3xl text-2xl font-black"
                        >
                            {service.title}
                        </motion.h3>
                    </div>
                </div>

                {/* Right Side Content */}
                <div className="w-full md:w-2/3 lg:p-8 p-6 md:p-12 bg-white relative overflow-y-auto">
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full transition-colors text-gray-600 z-10"
                        aria-label="Close details"
                    >
                        <X size={20} />
                    </motion.button>

                    <div className="space-y-8 mt-4">
                        <section>
                            <h5 className="text-brand-green font-bold uppercase text-xs tracking-widest mb-3">
                                Overview
                            </h5>
                            <motion.p
                                layoutId={`preview-desc-${service.id}`}
                                transition={springTransition}
                                className="text-sm text-gray-700 leading-relaxed"
                            >
                                {service.description}
                            </motion.p>
                        </section>

                        <motion.section
                            variants={capabilitiesContainer}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                        >
                            <h5 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-4">
                                Key Capabilities
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                {service.details.map((detail, i) => (
                                    <motion.div
                                        key={i}
                                        variants={capabilityItem}
                                        className="flex items-center gap-3 text-gray-600 text-sm"
                                    >
                                        <CheckCircle2
                                            size={18}
                                            className="text-brand-green shrink-0"
                                            aria-hidden="true"
                                        />
                                        <span>{detail}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="pt-6 border-t border-gray-100"
                        >
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-green transition-colors duration-300"
                            >
                                Discuss Your Project
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
});

/**
 * ServicesPreview — displays top 3 services with an expandable modal.
 */
function ServicesPreview() {
    const [selectedId, setSelectedId] = useState(null);
    const selectedService = services.find((s) => s.id === selectedId);

    const closeModal = useCallback(() => setSelectedId(null), []);

    // Lock background scroll when modal is open
    useEffect(() => {
        if (selectedId) {
            const scrollBarWidth =
                window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, [selectedId]);

    return (
        <section className="py-20 bg-slate-50 relative" aria-label="Services preview">
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
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    role="list"
                    aria-label="Featured services"
                >
                    {services.slice(0, 3).map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onSelect={setSelectedId}
                        />
                    ))}
                </div>

                {/* CTA to full services page */}
                <div className="flex items-center justify-center mt-10">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/services"
                            className="border border-brand-green text-brand-green px-8 py-3 rounded-full font-medium hover:bg-brand-green/5 transition duration-300"
                            aria-label="View all services"
                        >
                            View All Services
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedId && selectedService && (
                    <ServiceModal service={selectedService} onClose={closeModal} />
                )}
            </AnimatePresence>
        </section>
    );
}

export default memo(ServicesPreview);