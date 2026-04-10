'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, CheckCircle, Sparkles, Users, Zap, ExternalLink, Shield, Award, ArrowRight, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import About from '../sections/About'

export const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    // Use multiple methods for better browser compatibility
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // Fallback for older browsers
    if (document.documentElement.scrollTop > 0) {
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (document.body.scrollTop > 0) {
      document.body.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Check multiple scroll positions for better compatibility
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      setShowScrollTop(scrollY > 300)
    }

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Check initial scroll position
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen max-w-7xl mx-auto font-mono transition-colors duration-300 px-4 sm:px-6 lg:px-8">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full overflow-hidden"
      >
        <div className="relative mt-0 pt-12 sm:pt-16 md:pt-20 lg:pt-28 xl:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <div className="flex flex-col items-center justify-center h-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full"
            >
              {/* Decorative elements - Brutalist Grid Background */}
              <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

              <div className="relative bg-white dark:bg-black border-2 sm:border-4 border-black dark:border-white p-4 sm:p-6 md:p-8 lg:p-14 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] mb-16 sm:mb-20 lg:mb-28 max-w-5xl mx-auto">
                {/* System Status Banner */}
                <div className="flex justify-center mb-6 sm:mb-8 lg:mb-10">
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 border border-pink-500 transform -rotate-1">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" aria-hidden />
                      <span className="text-pink-500 text-xs font-bold uppercase tracking-widest">System Online</span>
                   </div>
                </div>

                <h1 className="mx-auto max-w-5xl text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-boldonse text-black dark:text-white uppercase tracking-tighter leading-tight mb-8 sm:mb-6 lg:mb-10">
                  Master Your Interview Skills{" "}
                  <span className="relative inline-block mt-2 sm:mt-0">
                    <span className="relative z-10 bg-pink-500 text-white px-2 sm:px-4 py-0.5 sm:py-0 inline-block transform -rotate-2 border-2 border-transparent break-words">
                      Confidence
                    </span>
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mx-auto max-w-2xl py-4 sm:py-6 md:py-8 lg:py-10 text-center text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-mono border-l-4 border-black dark:border-white pl-3 sm:pl-4 leading-relaxed break-words"
                >
                  {'//'} Perfect for students, interns, and job seekers.<br/>
                  {'//'} Practice mock interviews with AI. Transform your career journey.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 lg:pt-12"
                >
                  <button
                    onClick={() => router.push("/auth/login")}
                    className="min-h-[48px] w-full sm:w-auto bg-pink-500 text-white border-2 border-transparent hover:border-black dark:hover:border-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg lg:text-xl font-boldonse uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-pink-600 transition-all"
                  >
                    Get Started Free
                  </button>
                  <a
                    href="https://portfolio-eshan-2z6t.vercel.app/boring-projects/noqwit-ai-interview-platform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center bg-transparent text-black dark:text-white border-2 border-black dark:border-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg lg:text-xl font-boldonse uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  >
                    Learn More
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <section id="about" className="relative py-12 sm:py-16 md:py-20 lg:py-28 border-t-2 sm:border-t-4 border-black dark:border-white bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 lg:space-y-6"
            >
              <div className="inline-block bg-pink-500/10 border border-pink-500 px-3 py-1.5 mb-2 sm:mb-4 transform -rotate-2">
                 <span className="text-pink-500 font-mono text-xs uppercase tracking-widest">{'//'} Our Story</span>
              </div>
              
              <p className="text-black dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mt-4 sm:mt-6 lg:mt-8 font-boldonse uppercase leading-snug px-2">
                We are a team of developers who are passionate about creating a platform that helps people prepare for interviews.
              </p>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-8 sm:mt-12 lg:mt-16"
              >
                <Button
                  asChild
                  size="lg"
                  className="min-h-[48px] bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-2 border-transparent hover:border-pink-500 px-6 py-4 sm:px-8 sm:py-6 rounded-none text-base sm:text-lg lg:text-xl font-boldonse uppercase tracking-widest shadow-none hover:shadow-[4px_4px_0px_0px_#ec4899] transition-all duration-200"
                >
                  <Link href="#founders" className="flex items-center justify-center gap-2">
                    Meet The Team
                    <ArrowRight className="w-5 h-5 shrink-0" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-36 p-4 sm:p-6 lg:p-8 border-2 border-black dark:border-white bg-white dark:bg-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            <About />
          </div>
        </div>
      </section>

      {/* Go to Top Button - Rendered via Portal to avoid stacking context issues */}
      {mounted && createPortal(
        showScrollTop && (
          <button
            onClick={(e) => {
              e.preventDefault()
              scrollToTop()
            }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex items-center justify-center min-w-[48px] min-h-[48px] w-12 h-12 sm:w-14 sm:h-14 bg-pink-500 text-white rounded-none border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200 cursor-pointer"
            style={{ 
              position: 'fixed',
              zIndex: 9999,
              isolation: 'isolate'
            }}
            aria-label="Scroll to top"
            type="button"
          >
            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
          </button>
        ),
        document.body
      )}
    </div>
  )
}
