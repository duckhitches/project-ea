"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Brain,
  Code,
  Heart,
  Rocket,
  Users,
  Award,
  TrendingUp,
  Shield,
  Zap,
  ExternalLink,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkle,
  Sparkles,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CarouselDemo } from "./ui/carousel-demo"
import { Timeline } from "./ui/timeline"
import { TimelineDemo } from "./ui/timeline-demo"
import { PointerHighlight } from "./ui/pointer-highlight"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const foundersData = [
  {
    name: "Aryan S P",
    role: "AI/ML Specialist",
    title: "Co-Founder & Chief Technology Officer",
    description:
      "Expertise in AI/ML, AI Integration and LLM training. Passionate about creating intelligent systems that understand and respond to human needs.",
    skills: [
      "Machine Learning & Deep Learning",
      "Python, TensorFlow, PyTorch",
      "Natural Language Processing",
      "Computer Vision",
      "AI Model Deployment",
      "LLM Training & Fine-tuning",
    ],
    image: "/profaryan.jpg",
    linkedin: "https://www.linkedin.com/in/aryansp/",
    experience: "2+ Years",
    projects: "5+ AI Models",
    achievements: ["Published AI Research", "ML Competition Winner", "Open Source Contributor"],
  },
  {
    name: "Eshan Vijay Shettennavar",
    role: "Full Stack Developer",
    title: "Co-Founder & Chief Executive Officer",
    description:
      "Expertise in Full stack web development, UI/UX Design and DevOps. Crafting beautiful, scalable applications with modern technologies.",
    skills: [
      "React, Next.js, TypeScript, Javascript",
      "Node.js, Python, Go",
      "AWS, Docker, Azure",
      "UI/UX Design",
      "DevOps & CI/CD",
      "Database Optimization",
    ],
    image: "/profeshan.jpg",
    linkedin: "https://www.linkedin.com/in/eshan-shettennavar/",
    experience: "2+ Years",
    projects: "5+ Projects",
    achievements: ["Full Stack Expert", "Cloud Architecture", "Published gamified web app"],
  },
]

const trustFactors = [
  {
    icon: Users,
    title: "1000+ Active Users",
    description: "Trusted by thousands of job seekers worldwide",
    stat: "10K+",
  },
  {
    icon: Award,
    title: "94% Success Rate",
    description: "Our users land their dream jobs faster",
    stat: "94%",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms for personalized feedback",
    stat: "98%",
  },
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your data is secure and never shared",
    stat: "100%",
  },
]

const whyWeBuiltThis = {
  title: "Why We Built AI Interview",
  subtitle: "Our Mission to Democratize Interview Success",
  story:
    "We experienced firsthand the anxiety and uncertainty that comes with job interviews. Despite being skilled professionals, we struggled with interview preparation and wished for a platform that could provide personalized, AI-powered feedback. That's when we decided to build the solution we wished existed.",
  problems: [
    "Limited access to quality interview coaching",
    "Expensive one-on-one training sessions",
    "Lack of personalized feedback",
    "Interview anxiety and lack of confidence",
    "No standardized practice platform",
  ],
  solution: [
    "AI-powered mock interviews available 24/7",
    "Affordable and accessible to everyone",
    "Personalized feedback and improvement tips",
    "Confidence building through practice",
    "Comprehensive interview preparation platform",
  ],
  image: "/meme.jpg",
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const foundersRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 1])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Hero section animations
    const heroTl = gsap.timeline()
    heroTl
      .fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(".hero-subtitle", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
      .fromTo(
        ".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      )

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
    )

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
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-gray-900 overflow-hidden" id="About">
      
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        id="About"
        className="relative min-h-screen space-y-10 flex items-center justify-center bg-white dark:bg-gray-900"
      >
        {/* Background Pattern */}
        {/* <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div> */}
        

        <div className="relative z-10 max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 pb-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            About Us
          </div>
        
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-6 leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent">
              AI Interview
            </span>
          </h1>

          <p className="hero-subtitle text-2xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
            Empowering careers through AI-powered interview preparation
          </p>

          <p className="hero-description text-2xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We&apos;re on a mission to democratize interview success by making professional-grade interview coaching
            accessible to everyone, everywhere, at any time.
          </p>

          <div className="mt-12"><TimelineDemo /></div>
        </div>
      </motion.section>

      {/* Founders Section */}
      <section id="founders" ref={foundersRef} className="py-20 sm:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Meet the Founders
            </div>
            <h2 className="text-4xl flex flex-col items-center justify-center sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              The Minds Behind{" "}
              <PointerHighlight pointerClassName="text-blue-500 dark:text-purple-500">Innovation</PointerHighlight>
            </h2>
            <p className="text-2xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Two passionate technologists united by a vision to transform how people prepare for interviews
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {foundersData.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="founder-card"
              >
                <Card className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <CardContent className="p-8 sm:p-10">
                    <div className="flex flex-col items-center text-center mb-8">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative mb-6"
                      >
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-xl">
                          <img
                            src={founder.image || "/placeholder.svg"}
                            alt={founder.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-white fill-current" />
                        </div>
                      </motion.div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {founder.name}
                      </h3>
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">{founder.title}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                          {founder.experience}
                        </span>
                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">{founder.projects}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 sm:text-lg md:text-xl  lg:text-xl xl:text-xl dark:text-gray-300 mb-8 leading-relaxed">{founder.description}</p>

                    <div className="mb-8">
                      <h4 className="text-2xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        {founder.role === "AI/ML Specialist" ? (
                          <Brain className="w-5 h-5 mr-2 text-purple-600" />
                        ) : (
                          <Code className="w-5 h-5 mr-2 text-blue-600" />
                        )}
                        Core Expertise
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {founder.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: skillIndex * 0.1 }}
                            className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700 sm:text-lg md:text-lg lg:text-lg xl:text-lg dark:text-gray-300 text-base">{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-yellow-600" />
                        Key Achievements
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {founder.achievements.map((achievement, achIndex) => (
                          <span
                            key={achIndex}
                            className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-black hover:bg-black text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 sm:text-lg md:text-xl lg:text-lg xl:text-xl"
                    >
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Connect on LinkedIn
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Built This Section */}
      <section
        ref={storyRef}
        className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-800"

      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20"
            id="features"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium mb-6">
              <Rocket className="w-4 h-4 mr-2" />
              Our Story
            </div>
            <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {whyWeBuiltThis.title}
            </h2>
            <p className="text-2xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {whyWeBuiltThis.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src={whyWeBuiltThis.image || "/placeholder.svg"}
                  alt="Why we built this"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-medium">
                    &quot;Every great product starts with a personal problem that needs solving.&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"

            >
              <div>
                <h3 className="text-3xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  The Problem We Faced
                </h3>
                <p className="text-xl sm:text-xl text-gray-900 dark:text-gray-300 mb-6 leading-relaxed">{whyWeBuiltThis.story}</p>
                <div className="space-y-3">
                  {whyWeBuiltThis.problems.map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span className="text-xl sm:text-xl text-gray-600 dark:text-gray-300">{problem}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Solution</h3>
                <div className="space-y-3">
                  {whyWeBuiltThis.solution.map((solution, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <Sparkle className="w-5 h-5 text-yellow-500 mt-1 mr-4 flex-shrink-0" />
                      <span className="text-xl sm:text-xl text-gray-600 dark:text-gray-300">{solution}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section ref={trustRef} className="py-20 sm:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Why Trust Us
            </div>
            <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Proven Results That{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Speak for Themselves
              </span>
            </h2>
            <p className="text-2xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform has helped thousands of professionals land their dream jobs with confidence
            </p>
          </motion.div>

          {/* Carousel Section */}
          <div className="mb-20">
            <CarouselDemo />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trustFactors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="trust-card"
              >
                <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-16 h-16 mx-auto mb-6 bg-black dark:bg-gray-700 rounded-2xl flex items-center justify-center"
                    >
                      <factor.icon className="w-8 h-8 text-white dark:text-gray-900" />
                    </motion.div>
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:text-white mb-2">
                      {factor.stat}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {factor.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{factor.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
