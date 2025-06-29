"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Star, Pause, Menu, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CarouselProps {
  slides: {
    title: string
    subtitle: string
    description: string
    button: string
    features: string[]
    stats?: {
      label: string
      value: string
    }[]
    src: string
  }[]
}

export function Carousel({ slides }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [areControlsVisible, setAreControlsVisible] = useState(false)

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex(prev => (prev + 1) % slides.length)
    }, 5000)
  }

  useEffect(() => {
    if (isAutoPlaying) startAutoPlay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isAutoPlaying, slides.length])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex(prev => (prev + 1) % slides.length)
    if (isAutoPlaying) startAutoPlay()
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length)
    if (isAutoPlaying) startAutoPlay()
  }

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true)
    startAutoPlay()
  }

  const handleMouseEnter = () => {
    setAreControlsVisible(true)
    pauseAutoPlay()
  }

  const handleMouseLeave = () => {
    setAreControlsVisible(false)
    resumeAutoPlay()
  }

  const handleTouchStart = () => {
    setAreControlsVisible(true)
    pauseAutoPlay()
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      setAreControlsVisible(false)
      resumeAutoPlay()
    }, 3000)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div
      className="relative w-full max-w-[400px] mx-auto bg-white dark:bg-black rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative aspect-[9/16]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x

              if (swipe < -10000) {
                handleNext()
              } else if (swipe > 10000) {
                handlePrev()
              }
            }}
          >
            {/* Image Container */}
            <div className="relative w-full h-full">
              <Image
                src={slides[currentIndex].src}
                alt={slides[currentIndex].title}
                fill
                priority
                className="object-cover"
                onLoadingComplete={() => setIsLoading(false)}
              />
              
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/95" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

              {/* Content */}
              <motion.div 
                className="absolute inset-0 flex flex-col justify-between p-6"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1 }}
              >
                {/* Top Bar */}
                <motion.div 
                  className="flex justify-between items-start"
                  variants={contentVariants}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src="/EA.ai.svg"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="opacity-90"
                      />
                    </motion.div>
                    <div className="text-white/90 text-sm font-medium">EA.ai</div>
                  </div>
                  
                  <motion.button 
                    className="w-10 h-10 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                   
                  </motion.button>
                </motion.div>

                {/* Center Content */}
                <motion.div 
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                  variants={contentVariants}
                >
                  <motion.span 
                    className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white/90"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {slides[currentIndex].subtitle}
                  </motion.span>
                  
                  <motion.h2 
                    className="text-2xl font-bold text-white"
                    variants={contentVariants}
                  >
                    {slides[currentIndex].title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-white/80 text-sm max-w-xs"
                    variants={contentVariants}
                  >
                    {slides[currentIndex].description}
                  </motion.p>
                </motion.div>

                {/* Bottom Section */}
                <motion.div 
                  className="space-y-4"
                  variants={contentVariants}
                >
                  {/* Features */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {slides[currentIndex].features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white/90"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* Analytics/Stats */}
                  {slides[currentIndex].stats && (
                    <div className="flex justify-center gap-6 mt-2">
                      {slides[currentIndex].stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <span className="text-2xl font-bold text-white/90">{stat.value}</span>
                          <span className="text-xs text-white/70">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link href="/auth/login" className="block">
                    <motion.button 
                      className="w-full py-4 bg-white rounded-xl text-black font-semibold flex items-center justify-center gap-2 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {slides[currentIndex].button}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>

                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setDirection(idx > currentIndex ? 1 : -1)
                          setCurrentIndex(idx)
                        }}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          idx === currentIndex 
                            ? "bg-white w-6" 
                            : "bg-white/30 w-2 hover:bg-white/50"
                        )}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-white dark:bg-black">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white via-white/60 to-white dark:from-black dark:via-black/60 dark:to-black" />
          </div>
        )}

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: areControlsVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-between pointer-events-none"
        >
          {/* Navigation Buttons */}
          <div className="w-full px-4 flex justify-between items-center">
            <motion.button
              className="pointer-events-auto p-3 rounded-full bg-black/20 dark:bg-white/20 backdrop-blur-md text-white hover:bg-black/30 dark:hover:bg-white/30 transition-colors"
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              className="pointer-events-auto p-3 rounded-full bg-black/20 dark:bg-white/20 backdrop-blur-md text-white hover:bg-black/30 dark:hover:bg-white/30 transition-colors"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Play/Pause Button - Repositioned */}
          <motion.button
            className="pointer-events-auto absolute bottom-24 right-4 p-3 rounded-full bg-black/20 dark:bg-white/20 backdrop-blur-md text-white hover:bg-black/30 dark:hover:bg-white/30 transition-colors"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}