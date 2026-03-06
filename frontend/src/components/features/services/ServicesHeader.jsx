import { motion } from 'framer-motion';

export default function ServicesHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 "
        >
            {/* <span className="text-brand-green font-semibold tracking-wider uppercase text-sm">What We Do</span> */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight pb-1">
                <span
                    className="bg-clip-text text-transparent bg-[linear-gradient(to_right,var(--color-gray-900),var(--color-gray-900),var(--color-brand-green),var(--color-gray-900),var(--color-gray-900))] bg-size-[200%_auto] animate-shine "
                >
                    Our Services
                </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-8xl mx-auto leading-relaxed text-left md:text-center lg:text-left">
                We provide complete digital solutions to help your business grow and succeed in the digital landscape.We take pride in delivering Intelligent Designs and Engaging Experiences for clients all over the World. We thrive on problem solving and working with clients to seek out the best possible digital solution.
                
            </p>
        </motion.div>
    );
}
