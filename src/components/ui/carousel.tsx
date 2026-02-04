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
      className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[400px] mx-auto bg-black dark:bg-black rounded-none overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:sm:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-colors duration-300 border-2 sm:border-4 border-black dark:border-white"
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
                src={slides[currentIndex]?.src}
                alt={slides[currentIndex]?.title || "Slide"}
                fill
                priority
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                onLoadingComplete={() => setIsLoading(false)}
              />
              
              {/* Overlay - Solid dim for readability */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content */}
              <motion.div 
                className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6"
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
                      className="w-10 h-10 bg-white text-black border-2 border-white rounded-none flex items-center justify-center p-1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src="/brand-logo.png"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="opacity-100 invert"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Center Content */}
                <motion.div 
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                  variants={contentVariants}
                >
                  <motion.span 
                    className="px-3 py-1 bg-black text-white border-2 border-white rounded-none text-xs font-mono uppercase tracking-widest"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {slides[currentIndex]?.subtitle}
                  </motion.span>
                  
                  <motion.h2 
                    className="text-2xl sm:text-3xl md:text-4xl font-boldonse text-white uppercase tracking-tighter bg-black px-2 py-1 transform -rotate-1 border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                    variants={contentVariants}
                  >
                    {slides[currentIndex]?.title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-white text-[10px] sm:text-xs md:text-sm max-w-[220px] sm:max-w-xs font-mono bg-black/80 p-1.5 sm:p-2 border border-white"
                    variants={contentVariants}
                  >
                    {slides[currentIndex]?.description}
                  </motion.p>
                </motion.div>

                {/* Bottom Section */}
                <motion.div 
                  className="space-y-4"
                  variants={contentVariants}
                >
                  {/* Features */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {slides[currentIndex]?.features?.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="px-2 py-1 bg-white text-black border-2 border-black rounded-none text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
                    <div className="flex justify-center gap-4 sm:gap-6 mt-1 sm:mt-2 bg-black/80 p-2 sm:p-3 border-2 border-white">
                      {slides[currentIndex].stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <span className="text-xl sm:text-2xl font-boldonse text-white">{stat.value}</span>
                          <span className="text-[10px] sm:text-xs text-white font-mono uppercase">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link href="/auth/login" className="block">
                    <motion.button 
                      className="w-full py-3 sm:py-4 bg-white border-2 border-black text-black font-boldonse text-sm sm:text-base uppercase tracking-widest flex items-center justify-center gap-2 group hover:bg-pink-500 hover:text-white hover:border-white transition-colors duration-300"
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
                          "h-3 w-3 border-2 border-white transition-all duration-300",
                          idx === currentIndex 
                            ? "bg-white" 
                            : "bg-transparent hover:bg-white/50"
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
          <div className="absolute inset-0 bg-black flex items-center justify-center border-4 border-white">
            <div className="text-white font-mono animate-pulse">LOADING...</div>
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
          <div className="w-full px-2 sm:px-4 flex justify-between items-center">
            <motion.button
              className="pointer-events-auto p-2 sm:p-3 bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black transition-colors shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </motion.button>
            <motion.button
              className="pointer-events-auto p-2 sm:p-3 bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black transition-colors shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </motion.button>
          </div>

          {/* Play/Pause Button - Repositioned */}
          <motion.button
            className="pointer-events-auto absolute bottom-20 sm:bottom-24 right-2 sm:right-4 p-2 sm:p-3 bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black transition-colors shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}