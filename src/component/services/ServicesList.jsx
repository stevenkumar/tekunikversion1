// import { useState, useEffect, useRef } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//     ChevronDown,
//     Globe,
//     Smartphone,
//     Palette,
//     Search,
//     ShoppingCart,
//     Wrench,
//     ArrowRight
// } from 'lucide-react';

// const services = [
//     {
//         title: "Web Development",
//         description: "We build fast, secure, and scalable websites using modern technologies.",
//         icon: Globe,
//         color: "text-blue-600",
//         bg: "bg-blue-100",
//         details: [
//             "React, Next.js, Vue.js frontend",
//             "Node.js, Python, PHP backend",
//             "Database design & optimization",
//             "API development",
//             "Performance & SEO architecture"
//         ]
//     },
//     {
//         title: "Mobile App Development",
//         description: "High-performance Android and iOS applications tailored to your business.",
//         icon: Smartphone,
//         color: "text-emerald-600",
//         bg: "bg-emerald-100",
//         details: [
//             "Native iOS (Swift) & Android (Kotlin)",
//             "React Native & Flutter cross-platform",
//             "App store deployment",
//             "Real-time notifications",
//             "Offline functionality"
//         ]
//     },
//     {
//         title: "UI / UX Design",
//         description: "Clean, intuitive, and user-friendly designs that improve user experience.",
//         icon: Palette,
//         color: "text-purple-600",
//         bg: "bg-purple-100",
//         details: [
//             "Wireframing and prototyping",
//             "User research & testing",
//             "Mobile-first responsive design",
//             "Design systems",
//             "WCAG Accessibility compliance"
//         ]
//     },
//     {
//         title: "SEO Optimization",
//         description: "Improve your website visibility and ranking with proven SEO strategies.",
//         icon: Search,
//         color: "text-orange-600",
//         bg: "bg-orange-100",
//         details: [
//             "On-page optimization",
//             "Technical SEO & Site Speed",
//             "Backlink strategies",
//             "Content strategy",
//             "Monthly performance reporting"
//         ]
//     },
//     {
//         title: "E-Commerce Solutions",
//         description: "End-to-end e-commerce platforms with secure payment integration.",
//         icon: ShoppingCart,
//         color: "text-pink-600",
//         bg: "bg-pink-100",
//         details: [
//             "Shopify & WooCommerce setup",
//             "Stripe/PayPal integration",
//             "Inventory management",
//             "Checkout optimization",
//             "Customer management tools"
//         ]
//     },
//     {
//         title: "Maintenance & Support",
//         description: "Ongoing support, updates, and performance monitoring for your products.",
//         icon: Wrench,
//         color: "text-indigo-600",
//         bg: "bg-indigo-100",
//         details: [
//             "24/7 technical support",
//             "Security updates & patches",
//             "Performance monitoring",
//             "Scalability enhancements",
//             "Disaster recovery"
//         ]
//     },
// ];

// export default function ServicesList() {
//     const [searchParams] = useSearchParams();
//     const [expandedIndex, setExpandedIndex] = useState(null);
//     const cardRefs = useRef([]);
//     const hasScrolledRef = useRef(false);

//     Auto-expand and scroll to card based on URL query parameter
//     useEffect(() => {
//         if (searchParams && !hasScrolledRef.current) {
//             const serviceParam = searchParams.get('service');

//             if (serviceParam) {
//                 const index = services.findIndex(s => s.title.toLowerCase() === serviceParam.toLowerCase());

//                 if (index !== -1) {
//                     setExpandedIndex(index);
//                     hasScrolledRef.current = true;

//                     setTimeout(() => {
//                         if (cardRefs.current[index]) {
//                             cardRefs.current[index].scrollIntoView({
//                                 behavior: 'smooth',
//                                 block: 'center'
//                             });
//                         }
//                     }, 400);
//                 }
//             }
//         }
//     }, [searchParams]);

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: { staggerChildren: 0.1 }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0, scale: 0.95 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             scale: 1,
//             transition: { duration: 0.5, ease: "easeOut" }
//         }
//     };

//     return (
//         <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//             {services.map((service, index) => {
//                 const IconComponent = service.icon;
//                 const isOpen = expandedIndex === index;

//                 return (
//                     <motion.div
//                         key={index}
//                         ref={el => cardRefs.current[index] = el}
//                         variants={itemVariants}
//                         className={`bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ${isOpen
//                                 ? 'ring-2 ring-blue-500 shadow-xl'
//                                 : 'hover:shadow-xl hover:-translate-y-1'
//                             }`}
//                         layout
//                     >
//                         <button
//                             onClick={() => setExpandedIndex(isOpen ? null : index)}
//                             className="w-full text-left focus:outline-none group"
//                         >
//                             <div className="p-8">
//                                 <div className="flex justify-between items-start mb-6">
//                                     <motion.div
//                                         className={`flex items-center justify-center w-14 h-14 rounded-xl ${service.bg}`}
//                                         whileHover={{ scale: 1.1, rotate: 5 }}
//                                         transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                                     >
//                                         <IconComponent
//                                             size={28}
//                                             className={service.color}
//                                         />
//                                     </motion.div>

//                                     <motion.div
//                                         className={`p-2 rounded-full transition-colors duration-300 ${isOpen ? 'bg-blue-50' : 'bg-gray-50 group-hover:bg-blue-50'}`}
//                                         whileHover={{ scale: 1.1 }}
//                                     >
//                                         <ChevronDown
//                                             size={20}
//                                             className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'group-hover:text-blue-600'
//                                                 }`}
//                                         />
//                                     </motion.div>
//                                 </div>

//                                 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
//                                     {service.title}
//                                 </h3>
//                                 <p className="text-gray-600 text-sm leading-relaxed mb-4">
//                                     {service.description}
//                                 </p>

//                                 <motion.span
//                                     className="inline-flex items-center text-sm font-semibold text-blue-600"
//                                     whileHover={{ x: 5 }}
//                                 >
//                                     {isOpen ? 'Less Details' : 'View Details'}
//                                     <ArrowRight
//                                         size={16}
//                                         className={`ml-2 transition-transform duration-300 ${isOpen ? '-rotate-90' : 'group-hover:translate-x-1'
//                                             }`}
//                                     />
//                                 </motion.span>
//                             </div>
//                         </button>

//                         Animated Expandable Section
//                         <AnimatePresence>
//                             {isOpen && (
//                                 <motion.div
//                                     initial={{ height: 0, opacity: 0 }}
//                                     animate={{ height: "auto", opacity: 1 }}
//                                     exit={{ height: 0, opacity: 0 }}
//                                     transition={{ duration: 0.4, ease: "easeInOut" }}
//                                 >
//                                     <div className="border-t border-gray-100 bg-gray-50/50 px-8 py-6">
//                                         <motion.ul
//                                             className="space-y-3"
//                                             initial="hidden"
//                                             animate="visible"
//                                             variants={{
//                                                 visible: { transition: { staggerChildren: 0.08 } }
//                                             }}
//                                         >
//                                             {service.details.map((detail, detailIndex) => (
//                                                 <motion.li
//                                                     key={detailIndex}
//                                                     variants={{
//                                                         hidden: { x: -20, opacity: 0 },
//                                                         visible: { x: 0, opacity: 1 }
//                                                     }}
//                                                     transition={{ duration: 0.3 }}
//                                                     className="flex items-start gap-3"
//                                                 >
//                                                     <motion.span
//                                                         className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-none"
//                                                     />
//                                                     <span className="text-gray-700 text-sm font-medium">
//                                                         {detail}
//                                                     </span>
//                                                 </motion.li>
//                                             ))}
//                                         </motion.ul>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </motion.div>
//                 );
//             })}
//         </motion.div>
//     );
// }


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
                            className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]"
                        >
                            {/* Left Side Branding */}
                            <div className={`w-full md:w-1/3 bg-gradient-to-br ${selectedService.gradient} p-10 text-white flex flex-col justify-between`}>
                                <motion.div layoutId={`icon-box-${selectedId}`} className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center">
                                    <selectedService.icon size={32} />
                                </motion.div>
                                
                                <div>
                                    <h4 className="text-white/70 font-mono text-xs uppercase tracking-widest mb-2">Service Solution</h4>
                                    <motion.h3 layoutId={`title-${selectedId}`} className="text-3xl font-black">
                                        {selectedService.title}
                                    </motion.h3>
                                </div>
                            </div>

                            {/* Right Side Content */}
                            <div className="w-full md:w-2/3 p-8 md:p-12 bg-white relative">
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