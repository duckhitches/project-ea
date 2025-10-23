"use client";

import { motion } from "framer-motion";
import { Users, Award, Brain, Shield } from "lucide-react";
import { CarouselDemo } from "../ui/carousel-demo";
import GlowWrapper from "../ui/GlowWrapper";

const trustFactors = [
  {
    icon: Users,
    title: "1000+ Active Users",
    description: "Trusted by thousands of job seekers worldwide",
    stat: "10K+",
  },
  {
    icon: Award,
    title: "94% Success Rate",
    description: "Our users land their dream jobs faster",
    stat: "94%",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms for personalized feedback",
    stat: "98%",
  },
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your data is secure and never shared",
    stat: "100%",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6">
            Proven Results That{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-500 dark:to-orange-500 bg-clip-text text-transparent">
              Speak for Themselves
            </span>
          </h2>
          <p className="text-2xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our platform has helped thousands of professionals land their dream jobs with confidence
          </p>
        </motion.div>

        {/* Carousel Section */}
        <div className="mb-20">
          <CarouselDemo />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustFactors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="trust-card"
            >
              <GlowWrapper className="h-full">
                <div className="relative flex flex-1 flex-col justify-between gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-fit rounded-lg border border-gray-600 p-2 mx-auto mb-4"
                  >
                    <factor.icon className="w-8 h-8 text-black dark:text-neutral-400" />
                  </motion.div>
                  <div className="space-y-3 text-center">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 mb-2">
                      {factor.stat}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {factor.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{factor.description}</p>
                  </div>
                </div>
              </GlowWrapper>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
