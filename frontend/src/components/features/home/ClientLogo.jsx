import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { CLIENT_LOGOS } from "../../../data/clientLogos";

/**
 * A single logo item with lazy-loaded image, accessibility, and hover micro-interaction.
 */
const LogoItem = memo(function LogoItem({ name, src }) {
  return (
    <motion.div
      className="flex items-center justify-center mx-6 sm:mx-8 md:mx-12 w-28 sm:w-32 md:w-40 h-16 sm:h-18 md:h-20 shrink-0"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img
        src={src}
        alt={`${name} logo`}
        loading="lazy"
        decoding="async"
        className="max-w-full max-h-full object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      />
    </motion.div>
  );
});

/**
 * ClientLogo — Infinite-scroll marquee of client / partner logos.
 *
 * Performance notes:
 *  • will-change-transform on the sliding track triggers GPU compositing.
 *  • Images use loading="lazy" + decoding="async".
 *  • Logo data lives in data/clientLogos.js for easy maintenance.
 */
function ClientLogo() {
  // Duplicate the list so the second copy seamlessly follows the first.
  const duplicatedLogos = useMemo(
    () => [...CLIENT_LOGOS, ...CLIENT_LOGOS],
    []
  );

  return (
    <section
      className="py-8 sm:py-10 md:py-12 bg-white overflow-hidden"
      aria-label="Our trusted clients"
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 mb-6 sm:mb-8 md:mb-12 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-brand-green to-brand-cyan pb-2">
          Trusted by Industry Leaders
        </h2>
      </div>

      {/* Infinite scroll track */}
      <div
        className="relative flex overflow-hidden group"
        role="marquee"
        aria-label="Client logos scrolling"
      >
        {/* Soft fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <LogoItem key={`${logo.name}-${index}`} name={logo.name} src={logo.src} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ClientLogo);