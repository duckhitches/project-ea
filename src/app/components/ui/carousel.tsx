"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface CarouselProps {
  slides: {
    title: string;
    button: string;
    src: string;
  }[];
}

export function Carousel({ slides }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize GSAP animations for each slide
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      gsap.set(slide, {
        scale: index === currentIndex ? 1 : 0.95,
        opacity: index === currentIndex ? 1 : 0.7,
      });
    });
  }, []);

  const updateSlideAnimations = (newIndex: number) => {
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      gsap.to(slide, {
        scale: index === newIndex ? 1 : 0.95,
        opacity: index === newIndex ? 1 : 0.7,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    const newIndex = (currentIndex + newDirection + slides.length) % slides.length;
    setCurrentIndex(newIndex);
    updateSlideAnimations(newIndex);
  };

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
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-8" ref={carouselRef}>
      <div className="max-w-7xl mx-auto relative">
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
              opacity: { duration: 0.2 }
            }}
            className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-[2px]" />
            <img
              src={slides[currentIndex].src}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3 sm:p-4 md:p-8">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-center px-2">
                  {slides[currentIndex].title}
                </h2>
                <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-white/10 backdrop-blur-[2px] rounded-full text-white font-medium hover:bg-white/20 transition-all duration-200">
                  {slides[currentIndex].button}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1 sm:px-2 md:px-4 pointer-events-none">
          <button
            onClick={() => paginate(-1)}
            className="p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-[2px] text-white hover:bg-white/20 transition-all duration-200 pointer-events-auto z-50"
          >
            <IconArrowNarrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-[2px] text-white hover:bg-white/20 transition-all duration-200 pointer-events-auto z-50"
          >
            <IconArrowNarrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-50">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                updateSlideAnimations(index);
              }}
              className={cn(
                "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 pointer-events-auto",
                index === currentIndex ? "bg-white w-3 sm:w-4" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 