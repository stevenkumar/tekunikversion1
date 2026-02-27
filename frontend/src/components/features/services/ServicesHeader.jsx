import { motion } from 'framer-motion';

export default function ServicesHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
        >
            <span className="text-brand-green font-semibold tracking-wider uppercase text-sm">What We Do</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                Our Services
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                We take pride in delivering Intelligent Designs and Engaging Experiences for clients all over the World. We thrive on problem solving and working with clients to seek out the best possible digital solution.
                We provide complete digital solutions to help your business grow and succeed in the digital landscape.We take pride in delivering Intelligent Designs and Engaging Experiences for clients all over the World. We thrive on problem solving and working with clients to seek out the best possible digital solution.
                
            </p>
        </motion.div>
    );
}
