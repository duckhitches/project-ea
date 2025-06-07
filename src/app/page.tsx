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
import { CardBody, CardContainer, CardItem } from '@/app/components/ui/3d-card'
import { WavyBackground } from './components/ui/wavy-background'
import { TimelineDemo } from './components/ui/timeline-demo'
import { motion } from 'framer-motion'
import { ArrowDown, CheckCircle, Sparkles, Users, Zap } from 'lucide-react'

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

  const scrollToCarousel = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
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
            id="About"
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
              className="mx-auto max-w-2xl py-6 sm:py-8 text-center text-base sm:text-lg text-gray-600"
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
                onClick={scrollToCarousel}
                className="rounded-full border border-gray-200 bg-white px-8 py-3 text-sm sm:text-base font-medium text-gray-900 shadow-sm transition-all hover:shadow-md hover:scale-105 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:outline-none"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>

          
        </div>
      </WavyBackground>
      </motion.div>


      <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            id="About"
            className="relative w-full overflow-hidden  bg-white  border border-gray-100"
          >  
      <div id='features' className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why and when to use our 
            <div className='flex flex-col items-center justify-center'>
              <PointerHighlight>
                <span>platform</span>
              </PointerHighlight>
            </div>
          </h2>
        </div>
        <CarouselDemo />
      </div>
      </motion.div>

      {/* Enhanced Founders Section */}
      <div className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 flex flex-col items-center justify-center"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-4">
              <Users className="w-3 h-3 mr-1" />
              Meet The Team
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl mb-4">
              Know about the{" "}
              <div className="flex flex-col items-center justify-center">
                <PointerHighlight>
                  <span>founders</span>
                </PointerHighlight>
              </div>
            </h2>

            <p className="max-w-2xl mx-auto text-gray-600 text-base sm:text-lg">
              The passionate team behind AI Interview, dedicated to revolutionizing the way people prepare for
              interviews.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            id="About"
            className="relative w-full overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100"
          >
            <TimelineDemo />
          </motion.div>
        </div>
      </div>
      </div>
  )
}
