"use client";

import { motion } from "framer-motion";
import { Users, Star, Zap, Lock } from "lucide-react";
import { CarouselDemo } from "../ui/carousel-demo";

const trustFactors = [
  {
    icon: Users,
    title: "1000+ Active Users",
    description: "Trusted by thousands of job seekers worldwide",
    stat: "10K+",
  },
  {
    icon: Star,
    title: "94% Success Rate",
    description: "Our users land their dream jobs faster",
    stat: "94%",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Advanced algorithms for personalized feedback",
    stat: "0.2s",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Your data is secure and never shared",
    stat: "100%",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 sm:py-32 lg:py-40 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <h2 className="text-4xl sm:text-4xl md:text-5xl font-boldonse text-gray-900 dark:text-white mb-6 lg:mb-8 uppercase tracking-tighter">
            Proven{" "}
            <span className="text-white bg-pink-500 sm:ml-4 px-2 inline-block border-2 border-black dark:border-white transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              Results
            </span>
          </h2>
          <p className="text-2xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-mono">
            {'//'} Our platform has helped thousands of professionals land their dream jobs with confidence.
          </p>
        </motion.div>

        {/* Carousel Section */}
        <div className="mb-20 lg:mb-24">
          <CarouselDemo />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-14">
          {trustFactors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="trust-card h-full"
            >
              <div className="relative flex flex-1 flex-col justify-between gap-6 h-full p-8 border-2 border-black dark:border-white bg-white dark:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:border-pink-500 transition-all duration-200 group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-20 h-20 flex items-center justify-center rounded-none border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black mx-auto mb-6 group-hover:bg-pink-500 group-hover:border-pink-500 group-hover:text-white transition-colors"
                >
                  <factor.icon className="w-10 h-10" />
                </motion.div>
                <div className="space-y-4 text-center">
                  <div className="text-4xl sm:text-5xl font-bold bg-transparent text-black dark:text-white mb-2 font-mono tracking-tighter group-hover:text-pink-500 transition-colors">
                    {factor.stat}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-boldonse text-gray-900 dark:text-white mb-3 uppercase">
                    {factor.title}
                  </h3>
                  <p className="text-black dark:text-white text-base leading-relaxed font-mono">{factor.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
