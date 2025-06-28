"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Star, Pause } from "lucide-react"
import gsap from "gsap"
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
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        handleNextClick()
      }, 6000)
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [current, isAutoPlaying])

  const handlePreviousClick = () => {
    const previous = current - 1
    const newIndex = previous < 0 ? slides.length - 1 : previous
    setDirection(-1)
    setCurrent(newIndex)
  }

  const handleNextClick = () => {
    const next = current + 1
    const newIndex = next === slides.length ? 0 : next
    setDirection(1)
    setCurrent(newIndex)
  }

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      },
    },
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      ref={carouselRef}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Container with navigation arrows */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            {/* Left Arrow */}
            <button
              onClick={handlePreviousClick}
              className="flex-shrink-0 p-2 sm:p-2.5 md:p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 group shadow-md"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Carousel Content */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                  }}
                  className="relative w-full"
                >
                  <div className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                    {/* Responsive aspect ratio container */}
                    <div className="relative aspect-[4/5] sm:aspect-[16/12] md:aspect-[16/10] lg:aspect-[16/9]">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <img
                          className="w-full h-full object-cover"
                          alt={slides[current].title}
                          src={slides[current].src || "/placeholder.svg"}
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                      </div>

                      {/* Content - Positioned at bottom for mobile, centered for desktop */}
                      <div className="absolute inset-0 flex items-end sm:items-center">
                        <motion.div
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          className="w-full px-4 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-0 text-white"
                        >
                          {/* Badge */}
                          <motion.div variants={itemVariants} className="mb-2 sm:mb-3 md:mb-4">
                            <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 text-yellow-200">
                              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 text-yellow-400 fill-current" />
                              {slides[current].subtitle}
                            </span>
                          </motion.div>

                          {/* Title */}
                          <motion.h1
                            variants={itemVariants}
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight max-w-2xl"
                          >
                            {slides[current].title}
                          </motion.h1>

                          {/* Description - Hidden on very small screens */}
                          <motion.p
                            variants={itemVariants}
                            className="hidden sm:block text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 text-gray-200 leading-relaxed max-w-xl"
                          >
                            {slides[current].description}
                          </motion.p>

                          {/* Features - Responsive grid */}
                          <motion.div variants={itemVariants} className="mb-3 sm:mb-4 md:mb-6">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {slides[current].features.slice(0, window.innerWidth < 640 ? 2 : 3).map((feature, featureIndex) => (
                                <div
                                  key={featureIndex}
                                  className="flex items-center text-[10px] sm:text-xs md:text-sm bg-white/10 backdrop-blur-sm rounded-md sm:rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 border border-white/10"
                                >
                                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full mr-1.5 sm:mr-2 flex-shrink-0" />
                                  <span className="truncate max-w-[100px] sm:max-w-none">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>

                          {/* Stats - Better mobile layout */}
                          {slides[current].stats && (
                            <motion.div variants={itemVariants} className="mb-4 sm:mb-6 md:mb-8">
                              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-md">
                                {slides[current].stats.slice(0, 3).map((stat, statIndex) => (
                                  <div key={statIndex} className="text-center sm:text-left">
                                    <div className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                                    <div className="text-[10px] sm:text-xs lg:text-sm text-gray-300">{stat.label}</div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {/* CTA Buttons - Stack on mobile */}
                          <motion.div
                            variants={itemVariants}
                            className="flex flex-col xs:flex-row gap-2 sm:gap-3"
                          >
                            <Link href="/auth/login" className="w-full xs:w-auto">
                              <button className="w-full xs:w-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base bg-white text-gray-900 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
                                {slides[current].button}
                              </button>
                            </Link>
                            <button className="w-full xs:w-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 border border-white/20">
                              <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                              <span className="hidden xs:inline">Watch</span> Demo
                            </button>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNextClick}
              className="flex-shrink-0 p-2 sm:p-2.5 md:p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 group shadow-md"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="mt-4 sm:mt-6 md:mt-8 flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex gap-1.5 sm:gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideClick(index)}
                  className={cn(
                    "h-1.5 sm:h-2 rounded-full transition-all duration-500",
                    index === current 
                      ? "bg-gray-800 dark:bg-white w-6 sm:w-8" 
                      : "bg-gray-300 dark:bg-gray-600 w-1.5 sm:w-2 hover:bg-gray-400 dark:hover:bg-gray-500",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 shadow-md"
              aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Play</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel