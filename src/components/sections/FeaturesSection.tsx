"use client";

import { motion } from "framer-motion";
import { GlowingEffectDemoSecond } from "./GlowingEffectDemoSecond";

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32 bg-transparent font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-boldonse text-gray-900 dark:text-white mb-6 uppercase tracking-tighter">
            Our{" "}
            <span className="text-white bg-pink-500 px-2 inline-block transform skew-x-12 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              Features
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-black dark:text-white max-w-3xl mx-auto font-mono">
           [ Discover what makes our platform unique and powerful ]
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlowingEffectDemoSecond />
        </motion.div>
      </div>
    </section>
  );
}
