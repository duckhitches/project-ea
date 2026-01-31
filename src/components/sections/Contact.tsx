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
    description: "Expert in modern web technologies, cloud infrastructure, and deployment automation.",
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
  role: "CEO & Founder",
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
    <div className="min-h-screen bg-transparent text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header Section */}
      <div className="relative border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            {/* Back Link */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-200 group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all duration-200 mr-3">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                </div>
                <span className="font-medium">Back to Home</span>
              </Link>
            </motion.div>

            {/* Header Content */}
            <div className="text-center max-w-4xl mx-auto">
             

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Get in Touch Today
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 dark:text-gray-300 text-lg md:text-xl"
              >
                Have questions about our AI interview platform? Our expert team is ready to help you succeed.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Preferred Way
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Multiple ways to reach us - pick what works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                  className="group relative bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-white/10"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black dark:bg-white mb-6 group-hover:scale-110 transition-transform duration-200">
                      <IconComponent className="w-8 h-8 text-white dark:text-black" />
                    </div>

                    <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
                    <div className="font-medium mb-2">{method.value}</div>

                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">
                      <Clock className="w-3 h-3 mr-1" />
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
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Skilled professionals ready to bring your ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {developerTeam.map((developer, index) => (
              <motion.div
                key={developer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-white/10"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={(developer.avatar || "/logo.svg").split("?")[0]}
                      alt={developer.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  {/* <div className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1 rounded-full">
                    {developer.rating} ⭐
                  </div> */}

                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-xl font-bold mb-1">{developer.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{developer.role}</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs">
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{developer.experience}</span>
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{developer.projects}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{developer.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Core Expertise
                  </h4>
                  <div className="space-y-2">
                    {developer.skills.map((skill, i) => (
                      <div key={i} className="flex items-center text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={developer.href}
                  className="block w-full bg-black dark:bg-white text-white dark:text-black py-4 px-6 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-center"
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Executive Support Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Professional administrative support for all your business needs
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 dark:border-white/10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={(eaTeam.avatar || "/logo.svg").split("?")[0]}
                    alt={eaTeam.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                {/* <div className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1 rounded-full">
                  {eaTeam.rating} ⭐
                </div> */}

                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-xl font-bold mb-1">{eaTeam.name}</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">{eaTeam.role}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs">
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{eaTeam.teamSize}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{eaTeam.availability}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{eaTeam.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Our Services
                </h4>
                <div className="space-y-2">
                  {eaTeam.services.map((service, i) => (
                    <div key={i} className="flex items-center text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                      <div className="w-2 h-2 bg-black dark:bg-white rounded-full mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={eaTeam.href}
                className="block w-full bg-black dark:bg-white text-white dark:text-black py-4 px-6 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Contact The Boring Project Team
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-24 text-center"
        >
          <div className="bg-black dark:bg-white text-white dark:text-black rounded-3xl p-12">
            <h3 className="text-3xl font-bold mb-6">Ready to Start Your Project with The Boring Project?</h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Let&apos;s get started!
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://calendly.com/shettennavareshan/30min"
              className="inline-flex bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 py-4 px-8 rounded-2xl font-semibold transition-all duration-200"
            >
              Schedule a Call
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
