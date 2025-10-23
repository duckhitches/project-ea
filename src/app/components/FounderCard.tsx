"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

export default function FounderCard({ founder }: { founder: any }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onClick={() => setExpanded(!expanded)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative cursor-pointer group"
    >
      <></>
      <Card
        className={`overflow-hidden rounded-3xl border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 transition-all duration-700 ${
          expanded ? "max-h-[700px]" : "max-h-[300px]"
        }`}
      >
        <CardContent className="p-8 flex flex-col items-center text-center relative">
          {/* Arrow Indicator */}
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </motion.div>

          {/* Top Section — Always visible */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative mb-4"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={founder.image || "/placeholder.svg"}
                alt={founder.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {founder.name}
          </h3>
          <p className="text-md font-medium text-blue-600 dark:text-blue-400">
            {founder.title}
          </p>
          
          {/* Click hint - only show when not expanded */}
          {!expanded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-gray-500 dark:text-gray-400 mt-2"
            >
              {/* Click to learn more */}
            </motion.p>
          )}

          {/* Expanded Section — Hidden until clicked */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mt-6 w-full"
              >
                <motion.p
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed sm:text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {founder.description}
                </motion.p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center justify-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-600" />
                    Key Achievements
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {founder.achievements.map(
                      (achievement: string, index: number) => (
                        <motion.span
                          key={index}
                          whileHover={{
                            scale: 1.05,
                            background:
                              "linear-gradient(to right, #60a5fa, #a78bfa, #ec4899)",
                            color: "#fff",
                          }}
                          transition={{ type: "spring", stiffness: 250 }}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {achievement}
                        </motion.span>
                      )
                    )}
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-black hover:bg-gray-900 text-white dark:text-black dark:bg-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 sm:text-lg"
                >
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Gradient overlay hover effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
      />
    </motion.div>
  );
}
