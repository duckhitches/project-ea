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
    <div className="min-h-screen max-w-7xl mx-auto font-mono transition-colors duration-300">


      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full overflow-hidden"
      >
        <div className="relative mt-0 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
          <div className="flex flex-col items-center justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full"
            >
              {/* Decorative elements - Brutalist Grid Background */}
              <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

              <div className="relative bg-white dark:bg-black border-4 border-black dark:border-white p-6 sm:p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] mb-24 max-w-5xl mx-auto">
                {/* System Status Banner */}
                <div className="flex justify-center mb-8">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500 transform -rotate-1">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"/>
                      <span className="text-pink-500 text-xs font-bold uppercase tracking-widest">System Online</span>
                   </div>
                </div>

                <h1 className="mx-auto max-w-5xl text-center text-4xl font-boldonse text-black dark:text-white md:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tighter leading-none mb-6">
                  Master Your Interview Skills{" "}
                  <span className="relative inline-block mt-2 sm:mt-0">
                    <span className="relative z-10 bg-pink-500 text-white px-4 py-0 inline-block transform -rotate-2 border-2 border-transparent">
                      Confidence
                    </span>
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mx-auto max-w-2xl py-6 sm:py-8 text-center text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-mono border-l-4 border-black dark:border-white pl-4"
                >
                  {'//'} Perfect for students, interns, and job seekers.<br/>
                  {'//'} Practice mock interviews with AI. Transform your career journey.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                >
                  <button
                    onClick={() => router.push("/auth/login")}
                    className="w-full sm:w-auto bg-pink-500 text-white border-2 border-transparent hover:border-black dark:hover:border-white px-8 py-4 text-xl font-boldonse uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-pink-600 transition-all"
                  >
                    Get Started Free
                  </button>
                  <button
                    onClick={scrollToAbout}
                    className="w-full sm:w-auto bg-transparent text-black dark:text-white border-2 border-black dark:border-white px-8 py-4 text-xl font-boldonse uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  >
                    Learn More
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-20 md:py-24 border-t-4 border-black dark:border-white bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-block bg-pink-500/10 border border-pink-500 px-3 py-1 mb-4 transform -rotate-2">
                 <span className="text-pink-500 font-mono text-xs uppercase tracking-widest">{'//'} Our Story</span>
              </div>
              
              <p className="text-black dark:text-white text-2xl sm:text-3xl max-w-3xl mx-auto mt-6 font-boldonse uppercase leading-tight">
                We are a team of developers who are passionate about creating a platform that helps people prepare for interviews.
              </p>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-2 border-transparent hover:border-pink-500 px-8 py-6 rounded-none text-xl font-boldonse uppercase tracking-widest shadow-none hover:shadow-[4px_4px_0px_0px_#ec4899] transition-all duration-200"
                >
                  <Link href="#founders">
                    Meet The Team
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <div className="mt-32 p-4 border-2 border-black dark:border-white bg-white dark:bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
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
            className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 bg-pink-500 text-white rounded-none border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200 cursor-pointer"
            style={{ 
              position: 'fixed',
              zIndex: 9999,
              isolation: 'isolate'
            }}
            aria-label="Scroll to top"
            type="button"
          >
            <span className="text-lg">
              <ArrowUp className="w-6 h-6" />
            </span>
          </button>
        ),
        document.body
      )}
    </div>
  )
}
