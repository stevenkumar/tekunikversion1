import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: "Ad factors PR", src: "/Flicka.png" },
  { name: "Rk Bazar", src: "/Rkbazar.png" },
  { name: "Adfactors PR", src: "/Adfactors.svg" },
  { name: "Imarticus Learning", src: "/imarticus.svg" },
  { name: "Axiomatic Ventures", src: "/axiom.png" },
  { name: "Screenox", src: "/screennox.png" },
  { name: "blinc", src: "/bliinc.avif" },
  // Add all 29 names here...
];

export default function ClientLogo() {
  // We duplicate the array to ensure there's no gap during the loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center  md:mb-12">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-brand-green to-brand-cyan pb-2">
          Trusted by Industry Leaders
        </h2>
      </div>

      {/* Container for the animation */}
      <div className="relative flex overflow-hidden group">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"], // Moves exactly half the width (one full set of logos)
          }}
          transition={{
            ease: "linear",
            duration: 30, // Adjust this number to change speed (higher = slower)
            repeat: Infinity,
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center mx-12 w-40 h-20 shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-w-full max-h-full object-contain  opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}