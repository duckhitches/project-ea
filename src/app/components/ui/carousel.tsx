"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react"
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
    gradient: string
  }[]
}

export function Carousel({ slides }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const autoPlayRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return
      gsap.set(slide, {
        scale: index === currentIndex ? 1 : 0.95,
        opacity: index === currentIndex ? 1 : 0.7,
      })
    })
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        paginate(1)
      }, 5000)
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [currentIndex, isAutoPlaying])

  const updateSlideAnimations = (newIndex: number) => {
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return
      gsap.to(slide, {
        scale: index === newIndex ? 1 : 0.95,
        opacity: index === newIndex ? 1 : 0.7,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    const newIndex = (currentIndex + newDirection + slides.length) % slides.length
    setCurrentIndex(newIndex)
    updateSlideAnimations(newIndex)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    updateSlideAnimations(index)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      },
    },
  }

  return (
    <div
      className="relative w-full overflow-hidden py-2 sm:py-4 md:py-6 px-2 sm:px-4"
      ref={carouselRef}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-6xl mx-auto relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.2 },
            }}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/10] rounded-lg sm:rounded-xl overflow-hidden shadow-xl"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slides[currentIndex].src || "/placeholder.svg"}
                alt={slides[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${slides[currentIndex].gradient}`} />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-white p-3 sm:p-4 md:p-6">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-center max-w-lg"
              >
                <motion.div variants={itemVariants} className="mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/20 backdrop-blur-sm">
                    <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                    {slides[currentIndex].subtitle}
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight"
                >
                  {slides[currentIndex].title}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 text-white/90 leading-relaxed px-2"
                >
                  {slides[currentIndex].description}
                </motion.p>

                {/* Features - Only show 3 on mobile */}
                <motion.div variants={itemVariants} className="mb-3 sm:mb-4">
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-md mx-auto">
                    {slides[currentIndex].features.slice(0, 3).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs bg-white/10 backdrop-blur-sm rounded-md px-2 py-1"
                      >
                        <div className="w-1 h-1 bg-green-400 rounded-full mr-1 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Stats - Only on larger screens */}
                {slides[currentIndex].stats && (
                  <motion.div variants={itemVariants} className="mb-3 sm:mb-4 hidden sm:block">
                    <div className="flex justify-center gap-4">
                      {slides[currentIndex].stats.slice(0, 3).map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-lg sm:text-xl font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-white/80">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center"
                >
                  <Link href="/auth/login">
                    <button className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {slides[currentIndex].button}
                    </button>
                  </Link>
                  <button className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-white/10 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                    <Play className="w-3 h-3 fill-current" />
                    Demo
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 z-20 right-0 flex items-center justify-between px-1 sm:px-2 pointer-events-none">
          <button
            onClick={() => paginate(-1)}
            className="p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 pointer-events-auto z-50"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 pointer-events-auto z-50"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-50">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-1.5 sm:h-2 rounded-full transition-all duration-300 pointer-events-auto",
                index === currentIndex ? "bg-white w-6 sm:w-8" : "bg-white/50 w-1.5 sm:w-2 hover:bg-white/70",
              )}
            />
          ))}
        </div>

        {/* Auto-play indicator - Hidden on mobile */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-50 hidden sm:block">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
            <div className={cn("w-1.5 h-1.5 rounded-full", isAutoPlaying ? "bg-green-400" : "bg-red-400")} />
            <span className="text-xs text-white/80">{isAutoPlaying ? "Auto" : "Manual"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel;