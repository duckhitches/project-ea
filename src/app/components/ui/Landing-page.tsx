'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowDown, CheckCircle, Sparkles, Users, Zap, ExternalLink, Shield, Award, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import About from '../About'

export const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-white">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-50 sm:object-contain md:object-cover"
        >
          <source src="/interview.mp4" type="video/mp4" />
        </video>
      </div>

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
              className="relative z-10"
            >
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-blue-800 text-xs font-medium mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Interview Practice
              </div>

              <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl mb-24">
                <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold text-balance text-black md:text-5xl lg:text-6xl xl:text-7xl">
                  Master Your Interview Skills{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">
                      With <span className="rounded-xl font-bold bg-white/20 backdrop-blur-md bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Confidence</span>
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-3 bg-blue-500/30 rounded-full blur-sm"></span>
                  </span>
                  
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mx-auto max-w-2xl py-6 sm:py-8 text-center text-2xl sm:text-2xl text-gray-800"
                >
                  Perfect for students, interns, and job seekers - practice mock interviews with AI and transform your career journey into success.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-wrap items-center justify-center gap-4 pt-4"
                >
                  <button
                    onClick={() => router.push("/auth/login")}
                    className="rounded-full bg-black/90 backdrop-blur-sm px-8 py-3 text-sm sm:text-base font-medium text-white transition-all hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
                  >
                    Get Started Free
                  </button>
                  <button
                    onClick={scrollToAbout}
                    className="rounded-full border border-black/50 bg-white/80 backdrop-blur-sm px-8 py-3 text-sm sm:text-base font-medium text-black shadow-sm transition-all hover:shadow-md hover:scale-105 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
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
      <section id="about" className="relative py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Our Story
              </div>
              <p className="text-gray-600 text-2xl sm:text-2xl max-w-3xl mx-auto mt-6">
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
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="#founders">
                    Meet Our Team
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <div className="mt-52"><About /></div>
        </div>
      </section>
    </div>
  )
}
