import { Link } from "react-router-dom";
import { motion } from "framer-motion";


// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const leftContentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const rightContentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
        },
    },
};

const backgroundCircleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1,
            ease: "easeOut",
        },
    },
};

const staggerChildren = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function AboutPreview() {
    return (
        <motion.section
            className="relative py-12 md:py-20 bg-white overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            {/* Background Decoration - Subtle circles for a modern look */}
            <motion.div
                className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-brand-green/10 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"
                variants={backgroundCircleVariants}
                animate="animate"
                style={{ y: [0, -10, 0] }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-cyan/10 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"
                variants={backgroundCircleVariants}
                animate="animate"
                style={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
                {/* Left Side: Content */}
                <motion.div
                    className="space-y-4 md:space-y-6 text-center lg:text-left"
                    variants={leftContentVariants}
                >
                    <motion.div
                        className="inline-block px-4 py-1.5 bg-brand-green/5 border border-brand-green/10 rounded-full"
                        variants={staggerChildren}
                    >
                        <span className="text-brand-green text-xs md:text-sm font-semibold tracking-wide uppercase">
                            Who We Are
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight"
                        variants={staggerChildren}
                    >
                        Building the Digital{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-br from-brand-green to-brand-cyan">
                            Future of Your Business
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
                        variants={staggerChildren}
                    >
                        At <span className="font-semibold text-gray-800">Tekunik</span>,
                        Expertise: Full-spectrum digital services including graphic design, web development, and comprehensive marketing suites.
                        <br /><br />
                        Approach: Merging "intelligent designs" with "engaging experiences" to solve complex digital challenges.
                        <br /><br />
                        The Team: A collaborative mix of tech-driven specialists and creative fanatics focused on scaling brands to the top.
                    </motion.p>

                    <motion.div
                        className="pt-2 md:pt-4"
                        variants={staggerChildren}
                    >
                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base font-bold text-white transition-all duration-200 bg-brand-green rounded-xl hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green shadow-lg shadow-brand-green/20"
                        >
                            Learn More About Us
                            <svg
                                className="w-4 h-4 md:w-5 md:h-5 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right Side: Image with Decorative Elements */}
                <motion.div
                    className="relative mt-8 lg:mt-0"
                    variants={rightContentVariants}
                >
                    {/* Decorative box behind image */}
                    <motion.div
                        className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-full h-full border-2 border-brand-green/20 rounded-2xl hidden sm:block"
                        animate={{ x: [0, -5, 0], y: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                            alt="Tekunik Team Working"
                            className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px] object-cover"
                        />
                        {/* Overlay for depth */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

                        {/* Floating Badge */}
                        <motion.div
                            className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="bg-brand-green p-2 rounded-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </motion.div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">
                                        Top-Rated Solutions
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Trusted by 50+ Global Clients
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
