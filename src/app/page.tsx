'use client'

import React from 'react'
import { useState } from 'react'
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

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ]

  const scrollToCarousel = () => {
    document.getElementById('carousel')?.scrollIntoView({ behavior: 'smooth' })
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

      <WavyBackground className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="mx-auto max-w-7xl text-center text-4xl font-bold text-balance text-gray-900 md:text-4xl lg:text-6xl">
            Your next opportunity begins{" "}
            <span className="inline-block rounded-xl bg-blue-500/20 px-4 py-1 text-gray-900 underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
              right here
            </span>
            .
          </h2>
          <p className="mx-auto max-w-2xl py-4 sm:py-6 md:py-8 text-center text-sm text-gray-600 md:text-base">
            Whether you're hiring talent or becoming it — every interview is a step
            toward something greater. Let AI make the journey smoother and smarter.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 sm:pt-3 md:pt-4">
            <button className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none">
              Join the club
            </button>
            <button onClick={scrollToCarousel} className="rounded-md border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:outline-none">
              Read more
            </button>
          </div>
        </div>
      </WavyBackground>

      <div id='carousel' className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
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

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Know about the
            <div className='flex flex-col items-center justify-center'>
              <PointerHighlight>
                <span>founders</span>
              </PointerHighlight>
            </div>
          </h2>
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-lg p-8 border border-gray-100">
          <TimelineDemo />
        </div>
      </div>
    </div>
  )
}
