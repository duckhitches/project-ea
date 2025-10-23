"use client";

import { motion } from "framer-motion";
import { GlowingEffectDemoSecond } from "../GlowingEffectDemoSecond";

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-black font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-2xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover what makes our platform unique and powerful
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
