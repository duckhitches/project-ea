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
    <div className={`w-full bg-transparent md:px-10 font-sans ${montserrat.className}`} ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-32 md:pb-40 lg:pb-48 font-mono">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 w-12 absolute left-3 md:left-3 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] z-20">
                <div className="h-full w-full flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <div className="hidden md:block md:pl-24">
                <div className="bg-white dark:bg-black px-4 py-2 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] w-fit max-w-full">
                  <h3 className="text-xl md:text-3xl font-boldonse uppercase text-black dark:text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <div className="md:hidden block mb-6">
                <div className="bg-white dark:bg-black px-3 py-2 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] w-fit max-w-full">
                  <h3 className="text-2xl sm:text-3xl font-boldonse uppercase text-black dark:text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="bg-white dark:bg-black border-2 border-black dark:border-white text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg text-black dark:text-white rounded-none p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gray-200 dark:bg-gray-800"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-pink-500"
          />
        </div>
      </div>
    </div>
  )
}
