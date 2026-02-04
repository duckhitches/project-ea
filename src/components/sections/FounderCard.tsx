"use client";

import Image from "next/image";
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
        className={`overflow-hidden rounded-none border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-black transition-all duration-700 ${
          expanded ? "max-h-[1000px]" : "max-h-[400px]"
        }`}
      >
        <CardContent className="p-8 flex flex-col items-center text-center relative">
          {/* Arrow Indicator */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-black border-2 border-black dark:border-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:bg-pink-500 group-hover:border-pink-500 group-hover:text-white transition-colors duration-300"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-black dark:text-white group-hover:text-white" />
          </motion.div>

          {/* Top Section — Always visible */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative mb-6"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-none border-2 border-black dark:border-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] relative ransition-all duration-300 group-hover:border-pink-500">
              <Image
                src={founder.image || "/logo.svg"}
                alt={founder.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, 144px"
              />
            </div>
          </motion.div>

          <h3 className="text-3xl font-boldonse text-black dark:text-white mb-2 uppercase tracking-wide group-hover:text-pink-500 transition-colors">
            {founder.name}
          </h3>
          <p className="text-sm font-mono font-bold text-white bg-black dark:text-black dark:bg-white px-3 py-1 inline-block mb-4 border border-black dark:border-white group-hover:bg-pink-500 group-hover:border-pink-500 group-hover:text-white transition-colors">
            {founder.title}
          </p>
          
          {/* Click hint - only show when not expanded */}
          {!expanded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-pink-500 mt-2 font-mono uppercase tracking-widest"
            >
              [ Click to Expand ]
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
                className="mt-6 w-full text-left"
              >
                <div className="w-full h-px bg-black dark:bg-white mb-6"></div>
                <motion.p
                  className="text-black dark:text-white mb-8 leading-relaxed text-base font-mono"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {founder.description}
                </motion.p>

                <div className="mb-6">
                  <h4 className="text-lg font-boldonse text-black dark:text-white mb-4 flex items-center border-b-2 border-black dark:border-white pb-2 w-fit">
                    <Award className="w-5 h-5 mr-3 text-pink-500" />
                    KEY_ACHIEVEMENTS
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {founder.achievements.map(
                      (achievement: string, index: number) => (
                        <motion.span
                          key={index}
                          whileHover={{
                            scale: 1.05,
                            x: 2,
                            y: -2,
                            boxShadow: "4px 4px 0px 0px rgba(236, 72, 153, 1)"
                          }}
                          transition={{ type: "spring", stiffness: 250 }}
                          className="bg-pink-500/5 text-black dark:text-white border-2 border-black dark:border-white px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:border-pink-500 hover:text-pink-500 transition-colors"
                        >
                          {achievement}
                        </motion.span>
                      )
                    )}
                  </div>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                 
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Hover effect background - removed for brutalism, keeping it clean */}
    </motion.div>
  );
}
