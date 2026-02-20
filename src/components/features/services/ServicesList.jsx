
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe,
    Smartphone,
    Palette,
    Search,
    ShoppingCart,
    Wrench,
    ArrowRight,
    X,
    CheckCircle2
} from 'lucide-react';

const services = [
    {
        id: "web-dev",
        title: "Web Development",
        description: "We build fast, secure, and scalable websites using modern technologies.",
        icon: Globe,
        color: "text-blue-600",
        bg: "bg-blue-100",
        gradient: "from-blue-600 to-cyan-500",
        details: [
            "React, Next.js, Vue.js frontend",
            "Node.js, Python, PHP backend",
            "Database design & optimization",
            "API development",
            "Performance & SEO architecture"
        ]
    },
    {
        id: "mobile-app",
        title: "Mobile App Development",
        description: "High-performance Android and iOS applications tailored to your business.",
        icon: Smartphone,
        color: "text-emerald-600",
        bg: "bg-emerald-100",
        gradient: "from-emerald-600 to-teal-500",
        details: [
            "Native iOS (Swift) & Android (Kotlin)",
            "React Native & Flutter cross-platform",
            "App store deployment",
            "Real-time notifications",
            "Offline functionality"
        ]
    },
    {
        id: "ui-ux",
        title: "UI / UX Design",
        description: "Clean, intuitive, and user-friendly designs that improve user experience.",
        icon: Palette,
        color: "text-purple-600",
        bg: "bg-purple-100",
        gradient: "from-purple-600 to-indigo-500",
        details: [
            "Wireframing and prototyping",
            "User research & testing",
            "Mobile-first responsive design",
            "Design systems",
            "WCAG Accessibility compliance"
        ]
    },
    {
        id: "seo",
        title: "SEO Optimization",
        description: "Improve your website visibility and ranking with proven SEO strategies.",
        icon: Search,
        color: "text-orange-600",
        bg: "bg-orange-100",
        gradient: "from-orange-600 to-yellow-500",
        details: [
            "On-page optimization",
            "Technical SEO & Site Speed",
            "Backlink strategies",
            "Content strategy",
            "Monthly performance reporting"
        ]
    },
    {
        id: "e-commerce",
        title: "E-Commerce Solutions",
        description: "End-to-end e-commerce platforms with secure payment integration.",
        icon: ShoppingCart,
        color: "text-pink-600",
        bg: "bg-pink-100",
        gradient: "from-pink-600 to-rose-500",
        details: [
            "Shopify & WooCommerce setup",
            "Stripe/PayPal integration",
            "Inventory management",
            "Checkout optimization",
            "Customer management tools"
        ]
    },
    {
        id: "maintenance",
        title: "Maintenance & Support",
        description: "Ongoing support, updates, and performance monitoring for your products.",
        icon: Wrench,
        color: "text-indigo-600",
        bg: "bg-indigo-100",
        gradient: "from-indigo-600 to-blue-700",
        details: [
            "24/7 technical support",
            "Security updates & patches",
            "Performance monitoring",
            "Scalability enhancements",
            "Disaster recovery"
        ]
    },
];

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

                            <div className="flex items-center text-sm font-semibold text-blue-600">
                                View Full Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedId && selectedService && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        <motion.div
                            layoutId={selectedId}
                            className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[700px] lg:h-[500px]"
                        >
                            {/* Left Side Branding */}
                            <div className={`w-full md:w-1/3 bg-gradient-to-br ${selectedService.gradient} lg:p-10 p-6 text-white flex flex-col justify-between`}>
                                <motion.div layoutId={`icon-box-${selectedId}`} className="bg-white/20 lg:w-16 lg:h-16 w-10 h-10 rounded-2xl flex items-center justify-center">
                                    <selectedService.icon size={32} />
                                </motion.div>
                                
                                <div>
                                    <h4 className="text-white/70 font-mono text-xs uppercase tracking-widest mb-2 lg:mt-0 mt-3">Service Solution</h4>
                                    <motion.h3 layoutId={`title-${selectedId}`} className="lg:text-3xl text-2xl font-black">
                                        {selectedService.title}
                                    </motion.h3>
                                </div>
                            </div>

                            {/* Right Side Content */}
                            <div className="w-full md:w-2/3 lg:p-8 p-6 md:p-12 pb-8 bg-white relative">
                                <button 
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
                                >
                                    <X size={20} />
                                </button>

                                <div className="space-y-8 mt-4">
                                    <section>
                                        <h5 className="text-blue-600 font-bold uppercase text-xs tracking-widest mb-3">Overview</h5>
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
                                                    <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0" />
                                                    <span>{detail}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </section>

                                    <div className="pt-6 border-t border-gray-100">
                                        <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">
                                            Inquire About {selectedService.title}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}