/**
 * Copyright (c) 2025 Eshan Vijay Shettennavar
 * 
 * This file is licensed under the MIT License.
 * See LICENSE-MIT.txt in the root directory for details.
 */

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
      className="relative min-h-[85vh] sm:min-h-screen space-y-6 sm:space-y-10 flex items-center justify-center bg-transparent py-12 sm:py-16"
    >
      <div className="relative z-10 max-w-7xl mx-auto mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-boldonse text-black dark:text-white mb-4 sm:mb-6 leading-tight uppercase tracking-tighter">
          About{" "}
          <span className="text-black dark:text-white underline decoration-2 sm:decoration-4 decoration-pink-500 underline-offset-4 sm:underline-offset-8">
            AI Interview
          </span>
        </h1>

        <p className="hero-subtitle text-base sm:text-xl md:text-2xl lg:text-3xl text-black dark:text-white mb-6 sm:mb-8 font-mono border-l-4 border-black dark:border-white pl-3 sm:pl-4 mx-auto max-w-full sm:max-w-fit bg-gray-100 dark:bg-gray-900 py-2 pr-3 sm:pr-4 break-words leading-snug">
          {'//'} Empowering careers through AI-powered interview preparation
        </p>

        <p className="hero-description text-base sm:text-lg md:text-xl text-black dark:text-white max-w-3xl mx-auto leading-relaxed font-mono">
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
