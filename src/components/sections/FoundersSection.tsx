"use client";

import { motion } from "framer-motion";
import { PointerHighlight } from "../ui/pointer-highlight";
import FounderCard from "./FounderCard";

const foundersData = [
  {
    name: "Aryan S P",
    role: "AI/ML Specialist",
    title: "Co-Founder & Chief Executive Officer",
    description:
      "Expertise in AI/ML, AI Integration and LLM training. Passionate about creating intelligent systems that understand and respond to human needs.",
    skills: [
      "Machine Learning & Deep Learning",
      "Python, TensorFlow, PyTorch",
      "Natural Language Processing",
      "Computer Vision",
      "AI Model Deployment",
      "LLM Training & Fine-tuning",
    ],
    image: "/profaryan.jpg",
    linkedin: "https://www.linkedin.com/in/aryansp/",
    experience: "2+ Years",
    projects: "5+ AI Projects",
    achievements: ["Published AI Research", "ML Competition Winner", "Open Source Contributor"],
  },
  {
    name: "Eshan Vijay Shettennavar",
    role: "Full Stack Developer",
    title: "Co-Founder & Chief Technology Officer",
    description:
      "Expertise in Full stack web development, UI/UX Design and DevOps. Crafting beautiful, scalable applications with AI-powered modern technologies.",
    skills: [
      "React, Next.js, TypeScript, Javascript",
      "Node.js, Python, Go",
      "AWS, Docker, Azure",
      "UI/UX Design",
      "DevOps & CI/CD",
      "Database Optimization",
    ],
    image: "/profeshan.jpg",
    linkedin: "https://www.linkedin.com/in/eshan-shettennavar/",
    experience: "2+ Years",
    projects: "5+ Projects",
    achievements: ["Full Stack Expert", "AI Integration", "Published The Boring Project"],
  },
];

export default function FoundersSection() {
  return (
    <section id="founders" className="py-20 sm:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl flex flex-col items-center justify-center sm:text-5xl md:text-6xl font-boldonse text-gray-900 dark:text-white mb-6 uppercase tracking-tighter">
            The Minds Behind{" "}
            <span className="bg-pink-500 text-white px-2 py-0 mt-2 transform -rotate-2 inline-block border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">Innovation</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-mono border-t-2 border-black dark:border-white pt-6">
            {'//'} Two passionate technologists united by a vision to transform how people prepare for interviews
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {foundersData.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="founder-card"
            >
              <FounderCard founder={founder} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
