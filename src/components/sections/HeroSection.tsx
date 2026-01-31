"use client";

import { motion, useTransform } from "framer-motion";
import { TimelineDemo } from "../ui/timeline-demo";

interface HeroSectionProps {
  scrollYProgress: any;
}

export default function HeroSection({ scrollYProgress }: HeroSectionProps) {
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 1]);

  return (
    <motion.section
      style={{ y: heroY, opacity: heroOpacity }}
      id="About"
      className="relative min-h-screen space-y-10 flex items-center justify-center bg-transparent"
    >
      <div className="relative z-10 max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-black dark:text-white mb-6 leading-tight">
          About{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI Interview
          </span>
        </h1>

        <p className="hero-subtitle text-2xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
          Empowering careers through AI-powered interview preparation
        </p>

        <p className="hero-description text-2xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We&apos;re on a mission to democratize interview success by making professional-grade interview coaching
          accessible to everyone, everywhere, at any time.
        </p>

        <div className="mt-12">
          <TimelineDemo />
        </div>
      </div>
    </motion.section>
  );
}
