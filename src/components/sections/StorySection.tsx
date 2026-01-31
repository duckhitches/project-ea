"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const whyWeBuiltThis = {
  title: "Why We Built ",
  subtitle: "Making Interview Preparation Smarter, Faster, and Accessible to Everyone",
  story:
    "We’ve been there, nervous before interviews, unsure of what questions to expect, wishing for a personalized AI that could help us prepare realistically. That’s exactly what led us to build NoQwit.ai.",
  problems: [
    "Lack of personalized, adaptive interview prep tools",
    "High costs of traditional coaching or mock sessions",
    "No AI-driven analysis of user resumes or strengths",
    "Interview anxiety and low confidence levels",
    "Generic content, not tailored to the company or role",
  ],
  solution: [
    "AI mock interviews that simulate real hiring rounds",
    "Company-specific question generation from web data",
    "Resume analysis for relevant follow-up questions",
    "Confidence-building through interactive practice",
    "Always available, affordable, and constantly improving",
  ],
  image: "/meme.png",
};

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Create a subtle parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      {/* Gradient overlays for motion depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/20"
        style={{ y }}
      />
      <motion.div
        className="absolute -top-20 right-0 w-96 h-96 bg-gradient-to-t from-blue-500/10 to-purple-500/0 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {whyWeBuiltThis.title}
            <span className="text-blue-500 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 dark:bg-clip-text dark:text-transparent">NoQwit.ai</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {whyWeBuiltThis.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            style={{ y }}
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="relative group">
              <motion.img
                src={whyWeBuiltThis.image}
                alt="Our journey building NoQwit.ai"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 150 }}
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-700" />
              <motion.div
                className="absolute bottom-8 left-8 right-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-lg italic font-light leading-snug">
                  “Every innovation starts with a problem worth solving — this one started with ours.”
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="space-y-10 order-1 lg:order-2"
          >
            <div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
                The Challenge We Saw
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {whyWeBuiltThis.story}
              </p>
              <div className="space-y-4">
                {whyWeBuiltThis.problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start"
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0 shadow-md" />
                    <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300">{problem}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
                Our AI-Driven Solution
              </h3>
              <div className="space-y-4">
                {whyWeBuiltThis.solution.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start"
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0 shadow-md" />
                    <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300">{solution}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}