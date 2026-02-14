"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, MessageCircle, Linkedin, Clock, Code, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const developerTeam = [
  {
    name: "Eshan Shettennavar",
    role: "Full Stack Development & Testing",
    description: "Expert in modern web technologies, AI-integration, and deployment automation.",
    skills: [
      "React, Next.js, TypeScript, Framer Motion and more",
      "Node.js, Python, Go",
      "AWS, Docker, Azure, Google Cloud, Vercel and more",
      "CI/CD, Infrastructure as Code",
      "Database, UI/UX Design & Optimization",
    ],
    avatar: "/profileeshan.jpg?height=80&width=80",
    href: "https://forms.cloud.microsoft/r/ZYJbUAuLFA?origin=lprLink",
    experience: "2+ Years",
    projects: "5+ Test Automations , 10+ Projects",
    rating: "4.6",
  },
  {
    name: "Aaryan Gowda",
    role: "AI/ML Specialist",
    description: "Specialized in machine learning, deep learning, and AI-powered applications.",
    skills: [
      "Machine Learning & Deep Learning",
      "Python, TensorFlow, PyTorch",
      "Natural Language Processing, Computer Vision, and more",
      "AI Model Deployment, Optimization, and more",
    ],
    avatar: "/profilearyan.jpg?height=80&width=80",
    href: "mailto:aaryangowda006@gmail.com",
    experience: "2+ Years",
    projects: "5+ AI Models, 10+ Projects",
    rating: "4.8",
  },
]

const eaTeam = {
  name: "The Boring Project Team",
  role: "The Parent Company",
  description: "The Boring Project is the parent company of NoQwit.ai. It is a professional support team for business operations, scheduling, and administrative tasks.",
  services: [
    "Executive Support & Scheduling",
    "Project Coordination",
    "Client Communication",
    "Administrative Operations",
    "Business Process Management",
  ],
  avatar: "/brand-logo.png?height=80&width=80",
  href: "mailto:duckhitches@outlook.com",
  teamSize: "1 Member",
  availability: "24/7 Support",
  rating: "4.9",
}

const contactMethods = [
  {
    name: "Email",
    value: "justnording@gmail.com",
    href: "mailto:justnord@gmail.com",
    icon: Mail,
    description: "Get in touch via email",
    response: "Within 24 hours",
  },
  {
    name: "LinkedIn",
    value: "Eshan Shettennavar",
    href: "https://linkedin.com/in/eshan-shettennavar/",
    icon: Linkedin,
    description: "Professional networking",
    response: "Business inquiries",
  },
]

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }, [isSuccess])

  return (
    <div className="min-h-screen bg-transparent text-black dark:text-white transition-colors duration-300 font-mono">
      {/* Header Section */}
      <div className="relative border-b-2 sm:border-b-4 border-black dark:border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-12">
            {/* Back Link */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center mb-6 sm:mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center text-black dark:text-white hover:underline transition-all duration-200 group"
              >
                <div className="flex items-center justify-center min-w-[44px] min-h-[44px] w-10 h-10 rounded-none bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white mr-3 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden />
                </div>
                <span className="font-bold uppercase tracking-widest text-sm sm:text-base">Back to Home</span>
              </Link>
            </motion.div>

            {/* Header Content */}
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-boldonse uppercase tracking-tighter mb-4 sm:mb-6 bg-black text-white dark:bg-white dark:text-black p-3 sm:p-4 inline-block transform -rotate-1 border-2 sm:border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] leading-tight break-words"
              >
                Get in <span className="text-pink-500">Touch</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-black dark:text-white text-base sm:text-lg md:text-xl font-bold mt-6 sm:mt-8 border-2 border-black dark:border-white p-3 sm:p-4 inline-block bg-white dark:bg-black leading-snug break-words"
              >
                {'//'} Have questions? Our expert team is ready to help.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-boldonse uppercase mb-3 sm:mb-4 tracking-tight leading-tight">
              Choose Your Path
            </h2>
            <p className="text-black dark:text-white font-mono text-xs sm:text-sm uppercase tracking-widest leading-snug">
              Multiple vector points established
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.a
                  key={method.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white dark:bg-black rounded-none p-5 sm:p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 border-2 sm:border-4 border-black dark:border-white min-h-[44px]"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-none bg-black dark:bg-white mb-4 sm:mb-6 border-2 border-black dark:border-white group-hover:bg-pink-500 group-hover:border-pink-500 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white dark:text-black group-hover:text-white" aria-hidden />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-boldonse uppercase mb-2 group-hover:text-pink-500 transition-colors leading-tight">{method.name}</h3>
                    <p className="text-black dark:text-white mb-3 sm:mb-4 font-mono text-xs sm:text-sm leading-snug">{method.description}</p>
                    <div className="font-bold underline mb-3 sm:mb-4 text-sm sm:text-base break-all">{method.value}</div>

                    <div className="inline-flex items-center px-3 py-1.5 rounded-none bg-black dark:bg-white text-white dark:text-black text-xs font-mono uppercase border border-black dark:border-white">
                      <Clock className="w-3 h-3 mr-2 shrink-0" aria-hidden />
                      {method.response}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Developer Team */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-boldonse uppercase mb-3 sm:mb-4 tracking-tight leading-tight">
              Core Team
            </h2>
            <p className="text-black dark:text-white font-mono text-xs sm:text-sm uppercase tracking-widest leading-snug">
              Active operatives ready for deployment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
            {developerTeam.map((developer, index) => (
              <motion.div
                key={developer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-black rounded-none p-5 sm:p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] border-2 sm:border-4 border-black dark:border-white"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-none overflow-hidden border-2 border-black dark:border-white transition-all shrink-0">
                    <Image
                      src={(developer.avatar || "/logo.svg").split("?")[0]}
                      alt={developer.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="text-center sm:text-left flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-boldonse uppercase mb-1 leading-tight">{developer.name}</h3>
                    <p className="text-black dark:text-white font-mono text-xs sm:text-sm mb-2 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 inline-block border border-black dark:border-white">{developer.role}</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs font-mono">
                      <span className="bg-transparent border border-black dark:border-white px-2 py-1 rounded-none uppercase">{developer.experience}</span>
                      <span className="bg-transparent border border-black dark:border-white px-2 py-1 rounded-none uppercase">{developer.projects}</span>
                    </div>
                  </div>
                </div>

                <p className="text-black dark:text-white mb-4 sm:mb-6 leading-relaxed font-mono text-xs sm:text-sm border-l-4 border-black dark:border-white pl-3 sm:pl-4 italic">
                  &quot;{developer.description}&quot;
                </p>

                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-bold uppercase mb-2 sm:mb-3 flex items-center gap-2 font-mono border-b-2 border-black dark:border-white pb-1 w-fit">
                    <Code className="w-4 h-4 shrink-0" aria-hidden />
                    Stack
                  </h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {developer.skills.map((skill, i) => (
                      <div key={i} className="flex items-center text-xs font-mono uppercase leading-snug">
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-none mr-2 flex-shrink-0" />
                        <span className="text-black dark:text-white break-words">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={developer.href}
                  className="flex items-center justify-center min-h-[48px] w-full bg-black dark:bg-white text-white dark:text-black py-3 sm:py-4 px-4 sm:px-6 rounded-none font-boldonse uppercase tracking-widest transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] border-2 border-transparent hover:border-black dark:hover:border-white text-sm sm:text-base"
                >
                  Contact {developer.name.split(" ")[0]}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* EA Team */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-boldonse uppercase mb-3 sm:mb-4 tracking-tight leading-tight">
              Support Ops
            </h2>
            <p className="text-black dark:text-white font-mono text-xs sm:text-sm uppercase tracking-widest leading-snug">
              Logistical and administrative backbone
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-black rounded-none p-5 sm:p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] border-2 sm:border-4 border-black dark:border-white">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-none overflow-hidden border-2 border-black dark:border-white bg-black dark:bg-black grayscale hover:grayscale-0 transition-all shrink-0">
                  <Image
                    src={(eaTeam.avatar || "/logo.svg").split("?")[0]}
                    alt={eaTeam.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="text-center sm:text-left flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-boldonse uppercase mb-1 leading-tight">{eaTeam.name}</h3>
                  <p className="text-black dark:text-white font-mono text-xs sm:text-sm mb-2 bg-pink-100 dark:bg-gray-800 px-2 py-0.5 inline-block border border-black dark:border-white">{eaTeam.role}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs font-mono">
                    <span className="bg-transparent border border-black dark:border-white px-2 py-1 rounded-none uppercase">{eaTeam.teamSize}</span>
                    <span className="bg-transparent border border-black dark:border-white px-2 py-1 rounded-none uppercase">{eaTeam.availability}</span>
                  </div>
                </div>
              </div>

              <p className="text-black dark:text-white mb-4 sm:mb-6 leading-relaxed font-mono text-xs sm:text-sm border-l-4 border-black dark:border-white pl-3 sm:pl-4 italic">{eaTeam.description}</p>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm font-bold uppercase mb-2 sm:mb-3 flex items-center gap-2 font-mono border-b-2 border-black dark:border-white pb-1 w-fit">
                  <Users className="w-4 h-4 shrink-0" aria-hidden />
                  Services
                </h4>
                <div className="space-y-1.5 sm:space-y-2">
                  {eaTeam.services.map((service, i) => (
                    <div key={i} className="flex items-center text-xs font-mono uppercase bg-gray-100 dark:bg-gray-900 rounded-none px-3 py-2 border border-black dark:border-white leading-snug">
                      <div className="w-2 h-2 bg-black dark:bg-white rounded-none mr-2 flex-shrink-0" />
                      <span className="text-black dark:text-white break-words">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={eaTeam.href}
                className="flex items-center justify-center min-h-[48px] w-full bg-black dark:bg-white text-white dark:text-black py-3 sm:py-4 px-4 sm:px-6 rounded-none font-boldonse uppercase tracking-widest transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] border-2 border-transparent hover:border-black dark:hover:border-white text-sm sm:text-base"
              >
                Contact Team
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 sm:mt-20 lg:mt-24 text-center"
        >
          <div className="bg-black dark:bg-white text-white dark:text-black rounded-none p-6 sm:p-8 md:p-12 border-2 sm:border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(128,128,128,1)]">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-boldonse mb-4 sm:mb-6 uppercase tracking-tight leading-tight">Ready to Deploy?</h3>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 font-mono max-w-2xl mx-auto border-b-2 border-white dark:border-black inline-block pb-2 leading-snug">
              {'//'} Initiate handshake protocol
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://calendly.com/shettennavareshan/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] bg-white dark:bg-black text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 py-3 sm:py-4 px-6 sm:px-8 rounded-none font-boldonse uppercase tracking-widest transition-all duration-200 border-2 sm:border-4 border-transparent hover:border-black dark:hover:border-white text-sm sm:text-base"
            >
              Schedule Link
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
