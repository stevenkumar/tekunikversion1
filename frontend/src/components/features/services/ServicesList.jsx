import { useState, useEffect, useRef, memo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";
import { services } from "@/data/servicesData";

/** Shared spring for layout transitions. */
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
        transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
    exit: { opacity: 0 },
};

const capabilityItem = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
};

/**
 * ServiceGridCard — a single service card in the main grid.
 */
const ServiceGridCard = memo(function ServiceGridCard({ service, onSelect }) {
    const IconComponent = service.icon;

    return (
        <motion.div
            layoutId={service.id}
            onClick={() => onSelect(service.id)}
            whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-shadow group"
            role="button"
            tabIndex={0}
            aria-label={`View details for ${service.title}`}
            onKeyDown={(e) => e.key === "Enter" && onSelect(service.id)}
        >
            <motion.div
                layoutId={`icon-box-${service.id}`}
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.bg}`}
            >
                <IconComponent className={service.color} size={28} aria-hidden="true" />
            </motion.div>

            <motion.h3
                layoutId={`title-${service.id}`}
                className="text-xl font-bold text-gray-900 mb-3"
            >
                {service.title}
            </motion.h3>

            <motion.p
                layoutId={`desc-${service.id}`}
                className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2"
            >
                {service.description}
            </motion.p>

            <div className="flex items-center text-sm font-semibold text-brand-green">
                View Full Details
                <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-2 transition-transform"
                    aria-hidden="true"
                />
            </div>
        </motion.div>
    );
});

/**
 * ServiceDetailModal — expanded modal for a selected service.
 */
const ServiceDetailModal = memo(function ServiceDetailModal({
    service,
    onClose,
}) {
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
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                aria-label="Close modal"
            />

            {/* Modal Card */}
            <motion.div
                layoutId={service.id}
                transition={springTransition}
                className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto lg:h-[500px] max-h-[90vh] z-10"
            >
                {/* Left Side Branding */}
                <div
                    className={`w-full md:w-1/3 bg-gradient-to-br ${service.gradient} lg:p-10 p-6 text-white flex flex-col justify-between`}
                >
                    <motion.div
                        layoutId={`icon-box-${service.id}`}
                        className="bg-white/20 lg:w-16 lg:h-16 w-12 h-12 rounded-2xl flex items-center justify-center"
                    >
                        <IconComponent size={32} aria-hidden="true" />
                    </motion.div>

                    <div>
                        <h4 className="text-white/70 font-mono text-xs uppercase tracking-widest mb-2 lg:mt-0 mt-6">
                            Service Solution
                        </h4>
                        <motion.h3
                            layoutId={`title-${service.id}`}
                            className="lg:text-3xl text-2xl font-black"
                        >
                            {service.title}
                        </motion.h3>
                    </div>
                </div>

                {/* Right Side Content */}
                <div className="w-full md:w-2/3 lg:p-8 p-6 md:p-12 pb-8 bg-white relative overflow-y-auto">
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
                        {/* Overview */}
                        <section>
                            <h5 className="text-brand-green font-bold uppercase text-xs tracking-widest mb-3">
                                Overview
                            </h5>
                            <motion.p
                                layoutId={`desc-${service.id}`}
                                className="text-sm text-gray-700 leading-relaxed"
                            >
                                {service.description}
                            </motion.p>
                        </section>

                        {/* Key Capabilities — staggered entry */}
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

                        {/* Footer Action */}
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
                                Inquire About {service.title}
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
});

/**
 * ServicesList — full services page showing all services with expandable modals.
 */
function ServicesList() {
    const [searchParams] = useSearchParams();
    const [selectedId, setSelectedId] = useState(null);
    const hasScrolledRef = useRef(false);

    const selectedService = services.find((s) => s.id === selectedId);
    const closeModal = useCallback(() => setSelectedId(null), []);

    // Auto-open service from URL query param (e.g. ?service=Web%20Development)
    useEffect(() => {
        const serviceParam = searchParams.get("service");
        if (serviceParam && !hasScrolledRef.current) {
            const found = services.find(
                (s) =>
                    s.title.toLowerCase() ===
                    decodeURIComponent(serviceParam).toLowerCase()
            );

            if (found) {
                setSelectedId(found.id);
                hasScrolledRef.current = true;
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    }, [searchParams]);

    // Lock background scroll when modal is open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedId]);

    return (
        <div
            className="relative pt-10 min-h-screen"
            aria-label="All services"
        >
            {/* Main Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 max-w-7xl mx-auto"
                role="list"
                aria-label="Services list"
            >
                {services.map((service) => (
                    <ServiceGridCard
                        key={service.id}
                        service={service}
                        onSelect={setSelectedId}
                    />
                ))}
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedId && selectedService && (
                    <ServiceDetailModal service={selectedService} onClose={closeModal} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default memo(ServicesList);