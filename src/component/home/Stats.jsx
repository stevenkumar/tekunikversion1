import { useState, useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { motion, AnimatePresence } from "framer-motion";

export default function Stats() {
  // Targets match the image: 50, 98, 97, 3
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Updated targets based on image: 50%, 98%, 97%, 3X
          const targets = [50, 98, 97, 3];
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;

          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            setCounts(
              targets.map((target) => {
                const progress = currentStep / steps;
                // Ease-out function for smoother counting
                const easeOut = 1 - Math.pow(1 - progress, 3);
                return Math.min(Math.floor(target * easeOut), target);
              }),
            );
            if (currentStep >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Custom CSS for the floating animation to avoid external dependencies
  const customStyles = `
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: float 4s ease-in-out infinite;
            animation-delay: 2s;
        }
    `;

  return (
    <section ref={sectionRef} className="">
      <style>{customStyles}</style>

     

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-10 pt-8">
            {/* <div className="uppercase tracking-widest text-sm text-cyan-400 font-semibold mb-2">
                            Solutions in Action
                        </div> */}
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-cyan-400">Acquire a business</span> <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-300 to-teal-100">
                edge with TekUnik
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Tekunik delivers enterprise-grade identity management designed for
              the modern business. We empower organizations to enforce strict
              compliance and reduce overheads without sacrificing speed. Secure
              your infrastructure, streamline your operations, and lead your
              market with confidence.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-3 rounded-full bg-cyan-400 text-[#051C2C] font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300">
                Try the solution today
              </button>
              
            </div>
          </div>

          {/* RIGHT STATS GRID */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="animate-float bg-linear-to-br from-cyan-300 to-teal-400 rounded-3xl p-6 md:p-8 text-[#051C2C] shadow-lg transform translate-y-8">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  {counts[0]}%
                </h3>
                <p className="text-sm md:text-base font-medium opacity-80 leading-tight">
                  Reduction in identity management costs
                </p>
              </div>

              {/* Card 2 */}
              <div className="animate-float-delayed bg-linear-to-br from-emerald-300 to-teal-300 rounded-3xl p-6 md:p-8 text-[#051C2C] shadow-lg">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  {counts[1]}%
                </h3>
                <p className="text-sm md:text-base font-medium opacity-80 leading-tight">
                  Improvement in Employee satisfaction Indices
                </p>
              </div>

              {/* Card 3 */}
              <div className="animate-float-delayed bg-linear-to-br from-emerald-300 to-teal-300 rounded-3xl p-6 md:p-8 text-[#051C2C] shadow-lg transform translate-y-8">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  {counts[2]}%
                </h3>
                <p className="text-sm md:text-base font-medium opacity-80 leading-tight">
                  Fewer security related incidences
                </p>
              </div>

              {/* Card 4 */}
              <div className="animate-float bg-linear-to-br from-cyan-300 to-teal-400 rounded-3xl p-6 md:p-8 text-[#051C2C] shadow-lg">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  {counts[3]}X
                </h3>
                <p className="text-sm md:text-base font-medium opacity-80 leading-tight">
                  Lightning fast authentication
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LOGOS SECTION (Updated for Dark Mode) */}
        {/* <div className="p-7">
                    <p className="text-center  mb-8 text-2xl text-bold uppercase tracking-wide ">Trusted by companies we’ve worked with</p>
                    
                    <div className="w-full inline-flex flex-nowrap overflow-hidden mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-200px),transparent_10%)]">
                        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                            {[
                                { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
                                { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon" },
                                { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google" },
                                { src: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg", alt: "Slack" },
                                { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", alt: "Netflix" },
                            ].map((logo, index) => (
                                <li key={index}>
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="h-8  opacity-50 hover:opacity-100 transition duration-300"
                                    />
                                </li>
                            ))}
                        </ul>
                        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                            {[
                                { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
                                { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon" },
                                { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google" },
                                { src: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg", alt: "Slack" },
                                { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", alt: "Netflix" },
                            ].map((logo, index) => (
                                <li key={index}>
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="h-8 brightness-0 invert opacity-50 hover:opacity-100 transition duration-300"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> */}
        <section className="bg-white lg:pb-10  w-full">
          <div className="container mx-auto px-4">
            {/* ---------- Heading ---------- */}
            <div className="text-center mb-12 lg:mb-8">
              <h2 className="text-3xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 pb-2">
                Trusted by Industry Leaders
              </h2>
            </div>

            {/* ---------- Desktop Marquee ---------- */}
            <div className="relative  w-full bg-white hidden lg:flex flex-col gap-6 mx-auto">
              <div className="flex items-center justify-between h-fit w-full">
                <Marquee direction="left" speed={80} gradient={false}>
                  <div className="flex h-fit">
                    {logos.map((src, i) => (
                      <div
                        key={`desk1-${i}`}
                        className="h-[70px] w-[180px] flex items-center justify-center  mx-0"
                      >
                        <img
                          src={src}
                          alt="logo"
                          className="max-w-[60%] max-h-[60%]"
                        />
                      </div>
                    ))}
                  </div>
                </Marquee>
              </div>
            </div>

            {/* ---------- Mobile Marquee ---------- */}
            <div className="relative overflow-hidden w-full bg-white flex lg:hidden flex-col gap-4 mx-auto">
              <div className="flex items-center justify-between h-fit">
                <Marquee direction="left" speed={60} gradient={false}>
                  <div className="flex h-fit">
                    {logos.map((src, i) => (
                      <div
                        key={`mob1-${i}`}
                        className="h-[70px] w-[140px] flex items-center justify-center border-[0.5px] border-[#D8D8D8]"
                      >
                        <img className="w-[70%]" src={src} alt="logo" />
                      </div>
                    ))}
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-50px md:h-100px"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#ffffff"
            fillOpacity="1"
          ></path>
        </svg>
      </div>
    </section>
  );
}

// import React, { useState } from "react";
// import Marquee from "react-fast-marquee";
// import { motion, AnimatePresence } from "framer-motion";

// yaha se start krna hai
// import React from "react";
// import Marquee from "react-fast-marquee";

// // Placeholder data
// const logos = [
//   "/company/comp_logo.svg",
//   "/company/comp_logo2.svg",
//   "/company/comp_logo3.svg",
//   "/company/comp_logo4.svg",
//   "/company/comp_logo5.svg",
//   "/company/comp_logo.svg",
//   "/company/comp_logo2.svg",
//   "/company/comp_logo3.svg",
//   "/company/comp_logo4.svg",
//   "/company/comp_logo5.svg",
// ];

// const Stats = () => {
//   return (
//     <section className="bg-white lg:py-24 py-12 overflow-hidden w-full">
//       <div className="container mx-auto px-4">
//         {/* ---------- Heading ---------- */}
//         <div className="text-center mb-12 lg:mb-16">
//           <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 pb-2">
//             Trusted by Industry Leaders
//           </h2>
//         </div>

//         {/* ---------- Desktop Marquee ---------- */}
//         <div className="relative overflow-hidden w-full bg-white hidden lg:flex flex-col gap-6 mx-auto">
//           <div className="flex items-center justify-between h-fit w-full">
//             <Marquee direction="left" speed={80} gradient={false}>
//               <div className="flex h-fit">
//                 {logos.map((src, i) => (
//                   <div
//                     key={`desk1-${i}`}
//                     className="h-[140px] w-[280px] flex items-center justify-center border-[0.5px] border-[#D8D8D8] mx-0"
//                   >
//                     <img
//                       src={src}
//                       alt="logo"
//                       className="max-w-[80%] max-h-[80%]"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </Marquee>
//           </div>
//         </div>

//         {/* ---------- Mobile Marquee ---------- */}
//         <div className="relative overflow-hidden w-full bg-white flex lg:hidden flex-col gap-4 mx-auto">
//           <div className="flex items-center justify-between h-fit">
//             <Marquee direction="left" speed={60} gradient={false}>
//               <div className="flex h-fit">
//                 {logos.map((src, i) => (
//                   <div
//                     key={`mob1-${i}`}
//                     className="h-[70px] w-[140px] flex items-center justify-center border-[0.5px] border-[#D8D8D8]"
//                   >
//                     <img className="w-[70%]" src={src} alt="logo" />
//                   </div>
//                 ))}
//               </div>
//             </Marquee>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Stats;
