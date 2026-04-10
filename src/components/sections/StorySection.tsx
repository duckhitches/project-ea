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
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-40 bg-transparent overflow-hidden">
      {/* Gradient overlays for motion depth - REMOVED for Brutalism */}
      {/* Background blobs removed */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 lg:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl font-boldonse tracking-tight text-gray-900 dark:text-white mb-4 lg:mb-6 uppercase">
            {whyWeBuiltThis.title}
            <span className="text-white bg-pink-500 border-2 border-black dark:border-white px-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform -rotate-2">NoQwit.ai</span>
          </h2>
          <p className="text-xl sm:text-2xl text-black dark:text-white max-w-3xl mx-auto leading-relaxed font-mono">
            {'//'} {whyWeBuiltThis.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Section */}
          <motion.div
            style={{ y }}
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="relative group border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:border-pink-500 transition-all duration-300">
              <motion.img
                src={whyWeBuiltThis.image}
                alt="Our journey building NoQwit.ai"
                className="w-full h-[500px] transition-all duration-300 object-cover"
                whileHover={{ scale: 1.0 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-pink-500 border-t-4 border-black dark:border-white"
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
              >
                <p className="text-lg italic font-mono text-white leading-snug">
                  &quot;Every innovation starts with a problem worth solving — this one started with ours.&quot;
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
            className="space-y-10 lg:space-y-12 order-1 lg:order-2"
          >
            <div>
              <h3 className="text-3xl sm:text-4xl font-boldonse text-gray-900 dark:text-white mb-6 lg:mb-8 uppercase border-b-2 border-black dark:border-white w-fit group">
                <span className="group-hover:text-pink-500 transition-colors">The Challenge We Saw</span>
              </h3>
              <p className="text-lg sm:text-xl text-black dark:text-white mb-8 lg:mb-10 leading-relaxed font-mono">
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
                    <div className="w-4 h-4 bg-black dark:bg-white mt-1 mr-4 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-black dark:text-white font-mono">{problem}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-boldonse text-gray-900 dark:text-white mb-6 lg:mb-8 uppercase border-b-2 border-black dark:border-white w-fit group">
                <span className="group-hover:text-pink-500 transition-colors">Our AI-Driven Solution</span>
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
                    <div className="w-4 h-4 bg-pink-500 border-2 border-black dark:border-white mt-1 mr-4 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-black dark:text-white font-mono">{solution}</span>
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