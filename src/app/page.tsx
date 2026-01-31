'use client'

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import StaggeredMenu from '@/components/StaggeredMenu'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { LandingPage } from './components/ui/Landing-page'

export default function Home() {
  const router = useRouter()



  return (
    <div className="min-h-screen">
      <div className='flex justify-center mb-10'>
      <StaggeredMenu
        items={[
          { label: "Features", ariaLabel: "Features", link: "#features" },
          { label: "Pricing", ariaLabel: "Pricing", link: "/pricing" },
          { label: "Contact", ariaLabel: "Contact", link: "/contact" },
          { label: "Dashboard", ariaLabel: "Dashboard", link: "/dashboard" },
          { label: "Login", ariaLabel: "Login", link: "/auth/login" },
          { label: "Sign Up", ariaLabel: "Sign Up", link: "/auth/signup" }
        ]}
        socialItems={[
          
          { label: "LinkedIn", link: "https://linkedin.com/in/eshan-shettennavar/" },
          { label: "GitHub", link: "https://github.com/duckhitches" }
        ]}
        logoContent={<div className="flex items-center gap-3"><Image src="/brand-logo.png" width={40} height={40} className="w-10 h-10 rounded-full bg-black p-2 object-contain" alt="Logo" /><span className="text-sm md:text-xl font-boldonse tracking-tighter text-pink-500">The Boring Interview</span></div>}
        colors={["#0f0518", "#1a0b2e", "#260d40", "#D02752"]}
        menuButtonColor="#ec4899" 
        openMenuButtonColor="#ffffff"
        accentColor="#ec4899"
      />
      </div>
      
      {/* Theme Toggle - Fixed position */}
      <div className="fixed bottom-6 left-6 z-10">
        <ThemeToggle />
      </div>

      <LandingPage />

      {/* Enhanced CTA Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden bg-black dark:bg-white">
        <div className="absolute inset-0 bg-[url('/next.svg')] opacity-5 bg-cover"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="space-y-8"
          >
            {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium dark:text-black dark:bg-black/10">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Start Your Journey Today
            </div> */}

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 dark:text-black">
              Ready to Transform Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 px-4 py-1 rounded-xlbackdrop-blur-sm">
                  Interview Skills?
                </span>
              </span>
            </h2>

            <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed dark:text-black">
              Join thousands of successful candidates who have already improved their interview performance with our
              AI-powered platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/signup"
                className="bg-white text-gray-900 hover:bg-black hover:text-white hover:border-white border-2 border-black px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Start Free Trial
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </a>
              <a
                href="/contact"
                className="border-2 text-black bg-white hover:text-white hover:bg-black hover:border-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Contact Us
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-2 text-gray-300 dark:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 dark:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><circle cx="17" cy="17" r="4" /></svg>
                <span className="text-sm">10K+ Active Users</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 dark:text-black">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7.5 21 12 18.5 16.5 21 15.79 13.88" /></svg>
                <span className="text-sm">94% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
