import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ServicesCTA() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="mt-20 text-center"
    >
      <div className="inline-block p-1 rounded-full bg-white shadow-md mb-8">
        <button
          onClick={() => navigate('/WebAppProject')}
          className="group relative bg-brand-green hover:bg-brand-cyan text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95"
        >
          <span className="flex items-center gap-2">
            Start Your Project
            {/* Subtle arrow icon that moves on hover */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>
      <p className="text-gray-500 text-sm">
        Need a custom quote? <a href="#" className="text-brand-green hover:underline">Contact our sales team</a>
      </p>
    </motion.div>
  );
}
