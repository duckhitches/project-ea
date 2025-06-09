'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from './components/ui/resizable-navbar'
import { CarouselDemo } from './components/ui/carousel-demo'
import { PointerHighlight } from './components/ui/pointer-highlight'
import { WavyBackground } from './components/ui/wavy-background'
import { TimelineDemo } from './components/ui/timeline-demo'
import { motion } from 'framer-motion'
import { ArrowDown, CheckCircle, Sparkles, Users, Zap, ExternalLink, Shield, Award, ArrowRight } from 'lucide-react'
import About from './components/About'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "/Pricing",
    },
    {
      name: "Contact",
      link: "/Contact",
    },
    {
      name: "Go to Dashboard",
      link: "/dashboard",
    },
  ]

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary" href="/auth/login">Login</NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-gray-600 hover:text-gray-900"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                href="/auth/login"
                className="w-full"
              >
                Login
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
       
        className="relative w-full overflow-hidden bg-white shadow-lg border border-gray-100"
      >
        {/* Enhanced Hero Section */}
        <WavyBackground className="mt-0 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
          <div className="flex flex-col items-center justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Interview Practice
              </div>

              <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold text-balance text-gray-900 md:text-5xl lg:text-6xl xl:text-7xl">
                Your Next Opportunity Begins{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 rounded-xl font-bold bg-blue-500/20 px-4 py-1 text-gray-900 backdrop-blur-sm">
                    Right Here
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-3 bg-blue-500/30 rounded-full blur-sm"></span>
                </span>
                .
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mx-auto max-w-2xl py-6 sm:py-8 text-center text-base sm:text-lg text-gray-800"
              >
                Whether you&apos;re hiring talent or becoming it — every interview is a step toward something greater. Let AI
                make the journey smoother and smarter.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-4 pt-4"
              >
                <button
                  onClick={() => router.push("/auth/login")}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm sm:text-base font-medium text-white transition-all hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                  Get Started Free
                </button>
                <button
                  onClick={scrollToAbout}
                  className="rounded-full border border-gray-200 bg-white px-8 py-3 text-sm sm:text-base font-medium text-gray-900 shadow-sm transition-all hover:shadow-md hover:scale-105 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:outline-none"
                >
                  Learn More
                </button>
              </motion.div>
            </motion.div>
          </div>
        </WavyBackground>
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
              {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  AI Interview?
                </span>
              </h2> */}
              <p className="text-gray-600 text-2xl sm:text-xl max-w-3xl mx-auto mt-6">
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

      {/* Enhanced CTA Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              Start Your Journey Today
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 px-4 py-1 rounded-xlbackdrop-blur-sm">
                  Interview Skills?
                </span>
               
              </span>
            </h2>


            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of successful candidates who have already improved their interview performance with our
              AI-powered platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-gray-900 hover:bg-black hover:text-white hover:border-white border-2 border-black px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/auth/signup">
                  Start Free Trial
                  <Zap className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 text-black bg-white  hover:text-white hover:bg-black hover:border-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/Contact">
                  Contact Us
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-2 text-gray-300">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-5 h-5" />
                <span className="text-sm">10K+ Active Users</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Award className="w-5 h-5" />
                <span className="text-sm">94% Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
