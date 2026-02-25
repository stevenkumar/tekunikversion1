import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
    Globe, Smartphone, Palette, Search,
    ShoppingCart, Wrench, Plus, ArrowRight
} from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

const services = [
    {
        id: 1,
        title: "Web Architecture",
        icon: <Globe />,
        description: "Engineering digital ecosystems that scale globally.",
        realLife: "Like the Mumbai local train network—complex, fast, and handling millions of requests without a glitch.",
        tech: ["Next.js 15", "TypeScript", "Node.js"],
        color: "#3b82f6",
        size: "md:col-span-2" // Bento grid layout
    },
    {
        id: 2,
        title: "Mobile UI",
        icon: <Smartphone />,
        description: "Native experiences for the palm of your hand.",
        realLife: "Like a pocket-sized personal assistant that knows exactly what you need before you ask.",
        tech: ["Flutter", "React Native"],
        color: "#10b981",
        size: "md:col-span-1"
    },
    {
        id: 3,
        title: "Brand Design",
        icon: <Palette />,
        description: "Visual storytelling for the modern age.",
        realLife: "Like a master chef’s plating—the taste is the tech, but the presentation wins the heart.",
        tech: ["Figma", "Adobe CC"],
        color: "#a855f7",
        size: "md:col-span-1"
    },
    {
        id: 4,
        title: "Growth SEO",
        icon: <Search />,
        description: "Commanding attention in a crowded market.",
        realLife: "Like having the brightest neon sign on Marine Drive; impossible to ignore.",
        tech: ["Analytics", "Strategy"],
        color: "#f59e0b",
        size: "md:col-span-2"
    }
];

const InteractiveCard = ({ service }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef(null);

    // Mouse Tracking for Parallax Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            layout
            className={`relative min-h-[300px] cursor-pointer rounded-3xl bg-white border border-slate-800 p-8 overflow-hidden group ${service.size}`}
        >
            {/* Dynamic Background Glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${service.color}, transparent 70%)` }}
            />

            <motion.div layout className="relative z-10 h-full flex flex-col">
                <motion.div
                    layout
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: service.color }}
                >
                    {React.cloneElement(service.icon, { className: "text-white" })}
                </motion.div>

                <motion.h3 layout className="text-2xl font-bold text-black mb-2">
                    {service.title}
                </motion.h3>

                <motion.p layout className="text-slate-400 text-sm max-w-[250px]">
                    {service.description}
                </motion.p>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-6 pt-6 border-t border-slate-800"
                        >
                            <p className="text-black text-sm italic mb-4">
                                "Real Life: {service.realLife}"
                            </p>
                            <div className="flex gap-2">
                                {service.tech.map(t => (
                                    <span key={t} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-md border border-slate-700 uppercase font-mono">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isExpanded && (
                    <motion.div
                        layout
                        className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-widest"
                        style={{ color: service.color }}
                    >
                        Details <Plus size={14} className="ml-1" />
                    </motion.div>
                )}
            </motion.div>

            {/* 3D Floating Element Overlay */}
            <motion.div
                style={{ translateZ: 50 }}
                className="absolute top-4 right-4 text-slate-800 opacity-20 group-hover:opacity-100 transition-opacity"
            >
                <ArrowRight size={40} />
            </motion.div>
        </motion.div>
    );
};

export default function AdvancedServices() {
    usePageMeta('Advanced Services', 'Explore Tekunik advanced digital services and expertise.');
    return (
        <div className="bg-slate-50 py-24 px-6 min-h-screen font-sans selection:bg-blue-500 selection:text-blue-700">
            <div className="max-w-6xl mx-auto">
                <div className="mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="h-1 w-20 bg-blue-600"
                    />
                    <h2 className="text-6xl font-black text-blue-700 tracking-tighter">
                        TEKUNIK <span className="text-black">EXPERTISE.</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-md">
                        We don't just build apps; we engineer the future of Mumbai's digital landscape.
                    </p>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((s) => (
                        <InteractiveCard key={s.id} service={s} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}