import { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { STAT_CARDS } from "../../../data/statsData";

/**
 * Gradient style pairs that alternate across the 2×2 stat grid.
 * Even index = green→cyan, odd = cyan→green.
 */
const gradients = [
  "from-brand-green to-brand-cyan",
  "from-brand-cyan to-brand-green",
  "from-brand-cyan to-brand-green",
  "from-brand-green to-brand-cyan",
];

/**
 * A single animated stat card.
 */
const StatCard = memo(function StatCard({ value, suffix, label, gradient, offsetY }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: offsetY ? -4 : -8 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-gradient-to-br ${gradient} rounded-2xl md:rounded-3xl p-5 md:p-8 text-white shadow-lg ${offsetY ? "translate-y-6 md:translate-y-8" : ""}`}
      role="listitem"
      aria-label={`${value}${suffix} — ${label}`}
    >
      <h3 className="text-3xl md:text-5xl font-bold mb-1 md:mb-2 text-center md:text-left">
        {value}
        {suffix}
      </h3>
      <p className="text-xs md:text-base font-medium opacity-80 leading-tight text-center md:text-left">
        {label}
      </p>
    </motion.div>
  );
});

/**
 * Stats section — counter animation + 2×2 card grid with brand messaging.
 */
function Stats() {
  const [counts, setCounts] = useState(() => STAT_CARDS.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const animate = useCallback(() => {
    const targets = STAT_CARDS.map((c) => c.value);
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounts(
        targets.map((target) => {
          const progress = currentStep / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);
          return Math.min(Math.floor(target * easeOut), target);
        })
      );
      if (currentStep >= steps) clearInterval(timer);
    }, interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate();
        }
      },
      { threshold: 0.2 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasAnimated, animate]);

  return (
    <section
      ref={sectionRef}
      aria-label="Company statistics and value proposition"
    >
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-10 pt-4 md:pt-8 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-brand-cyan">Acquire a business</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-brand-cyan">
                edge with TekUnik
              </span>
            </h2>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Tekunik delivers enterprise-grade identity management designed for
              the modern business. We empower organizations to enforce strict
              compliance and reduce overheads without sacrificing speed. Secure
              your infrastructure, streamline your operations, and lead your
              market with confidence.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-brand-cyan text-white font-bold shadow-lg hover:shadow-brand-cyan/40 transition-shadow duration-300 text-sm md:text-base"
                aria-label="Try the solution today"
              >
                Try the solution today
              </motion.button>
            </div>
          </div>

          {/* RIGHT — STATS GRID */}
          <div
            className="w-full lg:w-1/2 mt-8 lg:mt-0"
            role="list"
            aria-label="Key performance metrics"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {STAT_CARDS.map((card, i) => (
                <StatCard
                  key={card.label}
                  value={counts[i]}
                  suffix={card.suffix}
                  label={card.label}
                  gradient={gradients[i]}
                  offsetY={i % 2 === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Stats);
