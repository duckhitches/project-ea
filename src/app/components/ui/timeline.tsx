"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { montserrat } from '@/app/fonts'
import { Brain, Code, Heart, Rocket, Users, Award, TrendingUp, Shield, Zap } from "lucide-react"

interface TimelineEntry {
  title: React.ReactNode
  content: React.ReactNode
  icon?: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className={`w-full bg-white dark:bg-neutral-950 md:px-10 font-cabin ${montserrat.className}`} ref={containerRef}>
      

      <div ref={ref} className="relative max-w-7xl mx-auto pb-32 md:pb-40 lg:pb-48 font-montserrat">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 w-12 absolute left-3 md:left-3 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-lg">
                <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-200 dark:via-gray-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-blue-500 via-purple-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
