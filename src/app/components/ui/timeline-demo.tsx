"use client"
import { Timeline } from "./timeline"
import { motion } from "framer-motion"
import { ExternalLink, Sparkles, Heart, Code, Brain, Rocket } from "lucide-react"
import { cabin } from '@/app/fonts'

export function TimelineDemo() {
  const data = [
    {
      title: (
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-lg sm:text-xl">
            Aryan S P
          </span>
        </div>
      ),
      content: (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 text-xs sm:text-sm font-medium">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                AI/ML Specialist
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Expertise in AI/ML, AI Integration and LLM training. Passionate about creating intelligent systems that
                understand and respond to human needs.
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-2">
                {["Machine Learning", "Deep Learning", "LLM Training", "AI Integration", "Python", "TensorFlow"].map(
                  (skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group mx-auto sm:mx-0"
            >
              <img
                src="/profaryan.jpg"
                alt="Aryan S P"
                className="relative aspect-square w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] rounded-lg sm:rounded-xl object-cover shadow-lg sm:shadow-2xl border-2 sm:border-4 border-white dark:border-gray-800"
              />
            </motion.div>
          </div>

          <motion.a
            href="https://www.linkedin.com/in/aryansp/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Connect on LinkedIn
          </motion.a>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-lg sm:text-xl">
            Eshan Vijay Shettennavar
          </span>
        </div>
      ),
      content: (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-800 dark:text-purple-200 text-xs sm:text-sm font-medium">
                <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Full Stack Developer
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Expertise in Full stack web development, UI/UX Design and DevOps. Crafting beautiful, scalable
                applications with modern technologies.
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "UI/UX Design", "DevOps", "AWS", "Docker"].map(
                  (skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 sm:px-3 sm:py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group mx-auto sm:mx-0"
            >
              <img
                src="/profeshan.jpg"
                alt="Eshan Vijay Shettennavar"
                className="relative aspect-square w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] rounded-lg sm:rounded-xl object-cover shadow-lg sm:shadow-2xl border-2 sm:border-4 border-white dark:border-gray-800"
              />
            </motion.div>
          </div>

          <motion.a
            href="https://www.linkedin.com/in/eshan-shettennavar/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Connect on LinkedIn
          </motion.a>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-bold text-lg sm:text-xl">
            Why did we build this?
          </span>
        </div>
      ),
      content: (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/50 dark:to-red-900/50 text-orange-800 dark:text-orange-200 text-xs sm:text-sm font-medium">
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Our Mission
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We built this platform to help students and professionals prepare for the best jobs and internships. Our
                goal is to democratize interview preparation and make it accessible to everyone, everywhere.
              </p>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-orange-200 dark:border-orange-700">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 sm:mb-3 text-sm sm:text-base">
                  What drives us:
                </h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                    Empowering students and professionals
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                    Making AI accessible for interview prep
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                    Building confidence through practice
                  </li>
                </ul>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group mx-auto sm:mx-0"
            >
              <img
                src="/meme.jpg"
                alt="Why we built this"
                className="relative aspect-square w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] rounded-lg sm:rounded-xl object-cover shadow-lg sm:shadow-2xl border-2 sm:border-4 border-white dark:border-gray-800"
              />
            </motion.div>
          </div>

          
        </div>
      ),
    },
  ]

  return (
    <div className={`relative w-full font-cabin ${cabin.className}`}>
      <Timeline data={data} />
    </div>
  )
}
