import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Code2, Smartphone, PenTool, Zap } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Crafting Digital Experiences",
    subtitle: "We Build Modern Web & App Solutions",
    description:
      "Tekunik helps businesses grow with scalable, secure, and high-performance digital products.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80",
    icon: <Code2 className="w-12 h-12" />,
    gradient: "from-brand-green/90 via-brand-dark/70 to-brand-cyan/90",
    ctaPrimary: "Our Services",
    ctaSecondary: "Contact Us",
    linkPrimary: "/services",
    linkSecondary: "/contact",
  },
  {
    id: 2,
    title: "Powering Your Business on the Go",
    subtitle: "Premium Mobile App Development",
    description:
      "High-performance Android & iOS applications that engage users and drive business growth.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80",
    icon: <Smartphone className="w-12 h-12" />,
    gradient: "from-brand-cyan/90 via-brand-dark/70 to-brand-green/90",
    ctaPrimary: "View Portfolio",
    ctaSecondary: "Get Started",
    linkPrimary: "/about",
    linkSecondary: "/contact",
  },
  {
    id: 3,
    title: "Designing Intuitive User Journeys",
    subtitle: "World-Class UI/UX Design",
    description:
      "User-centered designs that enhance engagement, conversion, and deliver exceptional experiences.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1920&q=80",
    icon: <PenTool className="w-12 h-12" />,
    gradient: "from-brand-green/90 via-brand-dark/70 to-brand-cyan/90",
    ctaPrimary: "Our Design Process",
    ctaSecondary: "Work With Us",
    linkPrimary: "/services",
    linkSecondary: "/contact",
  },
  {
    id: 4,
    title: "Transforming Ideas into Reality",
    subtitle: "Innovation & Technology",
    description:
      "Cutting-edge solutions leveraging the latest technologies to future-proof your business.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
    icon: <Zap className="w-12 h-12" />,
    gradient: "from-brand-cyan/90 via-brand-dark/70 to-brand-green/90",
    ctaPrimary: "Learn More",
    ctaSecondary: "Start Project",
    linkPrimary: "/about",
    linkSecondary: "/contact",
  },
];

const slideVariants = {
  initial: {
    opacity: 0,
    scale: 1.1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

const contentVariants = {
  initial: {
    opacity: 0,
    y: 50,
    x: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.1,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    x: -30,
    transition: {
      duration: 0.1,
    },
  },
};

const childVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.1 } },
};

const dotVariants = {
  initial: { scale: 1 },
  animate: { scale: 1.2 },
};

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  return (
    <section
      className="relative h-dvh min-h-[500px] md:min-h-[600px] overflow-hidden "
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Background Image with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Image */}
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-linear-to-r ${slides[currentSlide].gradient}`}
          ></div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"
          ></div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Icon Decoration */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`icon-${currentSlide}`}
          initial={{ opacity: 0, rotate: -180, scale: 0 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 180, scale: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-20 right-20 hidden lg:block"
        >
          <div className="text-white/20">
            {slides[currentSlide].icon}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Left Side - Text Content */}
              <div className="text-white space-y-4 md:space-y-6 text-center lg:text-left">
                <motion.div
                  variants={childVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
                >
                  <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></span>
                  <span className="text-xs md:text-sm font-medium tracking-wide uppercase">
                    {slides[currentSlide].subtitle}
                  </span>
                </motion.div>

                <motion.h1
                  variants={childVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  variants={childVariants}
                  className="text-base md:text-lg lg:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  variants={childVariants}
                  className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 pt-4"
                >
                  <Link
                    to={slides[currentSlide].linkPrimary}
                    className="group inline-flex items-center gap-2 bg-white text-brand-dark px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-brand-green hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-sm md:text-base"
                  >
                    {slides[currentSlide].ctaPrimary}
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to={slides[currentSlide].linkSecondary}
                    className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm text-sm md:text-base"
                  >
                    {slides[currentSlide].ctaSecondary}
                  </Link>
                </motion.div>

                {/* Slide Indicators */}
                <motion.div
                  variants={childVariants}
                  className="flex justify-center lg:justify-start items-center gap-3 pt-6 md:pt-8"
                >
                  {slides.map((_, index) => (
                    <motion.button
                      key={index}
                      variants={dotVariants}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentSlide
                        ? "bg-white w-8 md:w-12"
                        : "bg-white/40 hover:bg-white/60"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Right Side - Empty (for visual balance) */}
              <div className="hidden lg:block"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 lg:top-1/2  bottom-0 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 lg:top-1/2  bottom-0 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/30"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: isAutoPlay ? Infinity : 0,
            repeatType: "loop",
            repeatDelay: 0,
          }}
          key={currentSlide}
        ></motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

