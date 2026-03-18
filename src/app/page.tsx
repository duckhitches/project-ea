'use client'

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import StaggeredMenu from '@/components/StaggeredMenu'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { LandingPage } from '@/components/ui/Landing-page'
import DevMessageBanner from '@/components/DevMessageBanner'

export default function Home() {
  const router = useRouter()



  return (
    <div className="min-h-screen bg-transparent text-foreground transition-colors duration-300">
      <DevMessageBanner />
      <div className='flex justify-center mb-10'>
      <StaggeredMenu
        items={[
          { label: "Features", ariaLabel: "Features", link: "/#features" },
          { label: "Pricing", ariaLabel: "Pricing", link: "/pricing" },
          { label: "Contact", ariaLabel: "Contact", link: "/contact" },
          // { label: "Dashboard", ariaLabel: "Dashboard", link: "/dashboard" },
          { label: "Login", ariaLabel: "Login", link: "/auth/login" },
          { label: "Sign Up", ariaLabel: "Sign Up", link: "/auth/signup" }
        ]}
        socialItems={[
          
          { label: "LinkedIn", link: "https://linkedin.com/in/eshan-shettennavar/" },
          { label: "GitHub", link: "https://github.com/duckhitches" }
        ]}
        logoContent={<div className="flex items-center gap-3"><Image src="/brand-logo.png" width={40} height={40} className="w-10 h-10 rounded-full bg-black p-2 object-contain" alt="Logo" /><span className="text-sm md:text-xl font-boldonse tracking-tighter text-pink-500">The Boring Interview</span></div>}
        colors={["#ec4899", "#be185d", "#9d174d", "#831843"]}
        menuButtonColor="#ec4899" 
        openMenuButtonColor="#ffffff"
        accentColor="#ec4899"
      />
      </div>
      
      {/* Theme Toggle - Fixed position */}
      <div className="fixed bottom-6 left-6 z-[30]">
        <ThemeToggle />
      </div>

      <LandingPage />

      {/* Enhanced CTA Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden bg-white dark:bg-black border-t-4 border-black dark:border-white transition-colors duration-300">
        {/* Abstract shapes/grid background instead of svg */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black dark:text-white">
          <div className="space-y-8">
            <div className="inline-block bg-pink-500/10 border-2 border-pink-500 px-4 py-1 transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(236,72,153,0.3)] mb-4 backdrop-blur-sm">
              <span className="text-pink-500 font-boldonse uppercase tracking-widest text-sm">
                {'//'} System Status: Ready
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-boldonse text-black dark:text-white mb-6 uppercase tracking-tighter leading-none">
              TRANSFORM YOUR<br/>
              <span className="bg-pink-500 text-white px-2 inline-block transform rotate-1 border-2 border-transparent">
                INTERVIEW
              </span>{" "}
              SKILLS
            </h2>

            <p className="text-xl font-mono text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto border-l-4 border-black dark:border-white pl-4 text-left">
              {'//'} Join thousands of successful candidates who have already optimized their interview performance protocols.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/auth/signup"
                className="w-full sm:w-auto bg-pink-500 text-white hover:bg-pink-600 border-4 border-transparent hover:border-black dark:hover:border-white px-8 py-5 rounded-none text-xl font-boldonse uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 flex items-center justify-center"
              >
                Initiate Trial
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </a>
              <a
                href="/contact"
                className="w-full sm:w-auto border-4 border-black dark:border-white text-black dark:text-white bg-transparent hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black px-8 py-5 rounded-none text-xl font-boldonse uppercase tracking-widest transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center"
              >
                Contact
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-16">
              <div className="flex items-center gap-3 border-2 border-gray-200 dark:border-white/20 p-3 bg-gray-50 dark:bg-white/5 hover:border-pink-500/50 hover:bg-pink-500/5 transition-colors duration-300">
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-300 uppercase">Secure</span>
              </div>
              <div className="flex items-center gap-3 border-2 border-gray-200 dark:border-white/20 p-3 bg-gray-50 dark:bg-white/5 hover:border-pink-500/50 hover:bg-pink-500/5 transition-colors duration-300">
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><circle cx="17" cy="17" r="4" /></svg>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-300 uppercase">10K+ Users</span>
              </div>
              <div className="flex items-center gap-3 border-2 border-gray-200 dark:border-white/20 p-3 bg-gray-50 dark:bg-white/5 hover:border-pink-500/50 hover:bg-pink-500/5 transition-colors duration-300">
                 <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7.5 21 12 18.5 16.5 21 15.79 13.88" /></svg>
                <span className="text-sm font-mono text-gray-600 dark:text-gray-300 uppercase">94% Success</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
