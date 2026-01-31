"use client";

import React from "react";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import section components
import HeroSection from "./HeroSection";
import FoundersSection from "./FoundersSection";
import FeaturesSection from "./FeaturesSection";
import StorySection from "./StorySection";
import TrustSection from "./TrustSection";


// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const foundersRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(".hero-subtitle", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
      .fromTo(
        ".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      );

    // Founders section scroll animations
    gsap.fromTo(
      ".founder-card",
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: foundersRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Trust factors animation
    gsap.fromTo(
      ".trust-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: trustRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-transparent overflow-hidden" id="About">
      {/* Hero Section */}
      <div ref={heroRef}>
        <HeroSection scrollYProgress={scrollYProgress} />
      </div>

      {/* Founders Section */}
      <div ref={foundersRef}>
        <FoundersSection />
      </div>

      {/* Features Section */}
      <div ref={featuresRef} id="features">
        <FeaturesSection />
      </div>

      {/* Story Section */}
      <div ref={storyRef}>
        <StorySection />
      </div>

      {/* Trust Section */}
      <div ref={trustRef}>
        <TrustSection />
      </div>

      
    </div>
  );
}