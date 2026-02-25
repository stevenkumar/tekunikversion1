import { useState, useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { AnimatePresence } from "framer-motion";

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
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-10 pt-4 md:pt-8 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-brand-cyan">Acquire a business</span> <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-green to-brand-cyan">
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
              <button className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-brand-cyan text-white font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(0,181,255,0.4)] transition-all duration-300 text-sm md:text-base">
                Try the solution today
              </button>
            </div>
          </div>

          {/* RIGHT STATS GRID */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Card 1 */}
              <div className="animate-float bg-linear-to-br from-brand-green to-brand-cyan rounded-2xl md:rounded-3xl p-5 md:p-8 text-white shadow-lg transform translate-y-6 md:translate-y-8">
                <h3 className="text-3xl md:text-5xl font-bold mb-1 md:mb-2 text-center md:text-left">
                  {counts[0]}%
                </h3>
                <p className="text-xs md:text-base font-medium opacity-80 leading-tight text-center md:text-left">
                  Reduction in costs
                </p>
              </div>

              {/* Card 2 */}
              <div className="animate-float-delayed bg-linear-to-br from-brand-cyan to-brand-green rounded-2xl md:rounded-3xl p-5 md:p-8 text-white shadow-lg">
                <h3 className="text-3xl md:text-5xl font-bold mb-1 md:mb-2 text-center md:text-left">
                  {counts[1]}%
                </h3>
                <p className="text-xs md:text-base font-medium opacity-80 leading-tight text-center md:text-left">
                  Employee satisfaction
                </p>
              </div>

              {/* Card 3 */}
              <div className="animate-float-delayed bg-linear-to-br from-brand-cyan to-brand-green rounded-2xl md:rounded-3xl p-5 md:p-8 text-white shadow-lg transform translate-y-6 md:translate-y-8">
                <h3 className="text-3xl md:text-5xl font-bold mb-1 md:mb-2 text-center md:text-left">
                  {counts[2]}%
                </h3>
                <p className="text-xs md:text-base font-medium opacity-80 leading-tight text-center md:text-left">
                  Fewer security issues
                </p>
              </div>

              {/* Card 4 */}
              <div className="animate-float bg-linear-to-br from-brand-green to-brand-cyan rounded-2xl md:rounded-3xl p-5 md:p-8 text-white shadow-lg">
                <h3 className="text-3xl md:text-5xl font-bold mb-1 md:mb-2 text-center md:text-left">
                  {counts[3]}X
                </h3>
                <p className="text-xs md:text-base font-medium opacity-80 leading-tight text-center md:text-left">
                  Fast authentication
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LOGOS SECTION */}
        <section className="bg-white pb-6 md:pb-10 w-full">
          <div className="container mx-auto px-4">
            {/* ---------- Heading ---------- */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-brand-green to-brand-cyan pb-2">
                Trusted by Industry Leaders
              </h2>
            </div>

            {/* ---------- Desktop Marquee ---------- */}
            <div className="relative w-full bg-white hidden lg:flex flex-col gap-6 mx-auto">
              <div className="flex items-center justify-between h-fit w-full">
                <Marquee direction="left" speed={80} gradient={false}>
                  <div className="flex h-fit">
                    {logos.map((src, i) => (
                      <div
                        key={`desk1-${i}`}
                        className="h-[70px] w-[180px] flex items-center justify-center mx-4"
                      >
                        <img
                          src={src}
                          alt="logo"
                          className="max-w-[70%] max-h-[70%] opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
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
                        className="h-[60px] w-[120px] flex items-center justify-center mx-2"
                      >
                        <img className="max-w-[80%] max-h-[80%] " src={src} alt="logo" />
                      </div>
                    ))}
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
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
      </div> */}
    </section>
  );
}
