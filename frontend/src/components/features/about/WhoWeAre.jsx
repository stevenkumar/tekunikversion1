import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function WhoWeAre() {
  // --- 3D "Jumble/Tilt" Logic for the Image Section ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Transform values for the Image (rotates based on mouse)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  // Transform values for the Badge (moves opposite to image for parallax)
  const badgeX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const badgeY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

  return (
    <section className="py-16 bg-gray-50 overflow-hidden rounded-2xl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* --- LEFT SIDE: TEXT --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="inline-block mb-4 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-semibold tracking-wide uppercase">
              About Our Agency
            </div>

            {/* GRADIENT TEXT EFFECT */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              We Build{' '}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-green via-brand-cyan to-brand-green animate-gradient-x">
                Modern Web
              </span>{' '}
              <br />
              & App Solutions.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We are a technology-driven team focused on building scalable, secure,
              and user-friendly products. We combine <span className="font-semibold text-gray-900">design + development</span> to create
              solutions that actually help businesses grow.
            </p>

            {/* Checkmarks with staggered animation */}
            <div className="space-y-4 mt-8">
              {[
                "Clean UI/UX with modern design",
                "Fast performance + SEO friendly",
                "Reliable support after delivery"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 group"
                >
                  <span className="flex-none w-6 h-6 rounded-full bg-linear-to-r from-brand-green to-brand-cyan flex items-center justify-center text-white text-xs shadow-md group-hover:scale-110 transition-transform duration-300">
                    ✓
                  </span>
                  <span className="text-gray-700 font-medium group-hover:text-brand-green transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: INTERACTIVE 3D IMAGE (THE "JUMBLE") --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ perspective: 1000 }} // Creates the 3D space
            className="relative flex justify-center items-center"
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-lg cursor-pointer"
            >
              {/* Decorative Background Blob */}
              <div className="absolute -inset-4  opacity-30 animate-pulse" />

              {/* Main Image */}
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                alt="Team"
                className="relative rounded-2xl shadow-2xl w-full h-100 object-cover border border-white/20"
              />

              {/* Floating Badge (Moves nicely against the image) */}
              <motion.div
                style={{
                  x: badgeX,
                  y: badgeY,
                  z: 50 // Lifts it off the image in 3D space
                }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4"
              >
                <div className="bg-brand-cyan/10 p-3 rounded-full text-brand-cyan">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-xl">100+</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Projects Done</p>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}