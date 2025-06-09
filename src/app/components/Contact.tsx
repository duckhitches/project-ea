"use client"

import Link from "next/link"
import { ArrowLeft, Mail, MessageCircle, Linkedin, Clock, Code, Users } from "lucide-react"
import { useEffect, useState } from "react"

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
    href: "mailto:shettennavareshan@gmail.com",
    experience: "2+ Years",
    projects: "10+ Projects",
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
  name: "EA Team",
  role: "Executive Assistant",
  description: "Professional support team for business operations, scheduling, and administrative tasks.",
  services: [
    "Executive Support & Scheduling",
    "Project Coordination",
    "Client Communication",
    "Administrative Operations",
    "Business Process Management",
  ],
  avatar: "/EA.ai.svg?height=80&width=80",
  href: "mailto:duckhitches@outlook.com",
  teamSize: "5 Members",
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
    color: "from-blue-500 to-cyan-500",
    response: "Within 24 hours",
  },
  {
    name: "LinkedIn",
    value: "Eshan Shettennavar",
    href: "https://linkedin.com/in/eshan-shettennavar/",
    icon: Linkedin,
    description: "Professional networking",
    color: "from-blue-600 to-indigo-600",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 sm:py-8 md:py-12">
            {/* Back Link */}
            <div className="flex items-center mb-6 sm:mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md group-hover:shadow-lg transition-all duration-200 mr-3">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                </div>
                <span className="text-sm sm:text-base font-medium">Go Back</span>
              </Link>
            </div>

            {/* Header Content */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                We&apos;re here to help!{" "}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Get in
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Touch Today
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Have questions about our AI interview platform? Our expert team is ready to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Contact Methods */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Choose Your Preferred Way
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach us - pick what works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {contactMethods.map((method) => {
              const IconComponent = method.icon
              return (
                <a
                  key={method.name}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${method.color} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{method.name}</h3>

                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{method.description}</p>

                    <div className="text-xs sm:text-sm font-medium text-gray-900 mb-2">{method.value}</div>

                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {method.response}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Developer Team */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Skilled professionals ready to bring your ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {developerTeam.map((developer, index) => (
              <div
                key={developer.name}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                  <div className="relative">
                    <img
                      src={developer.avatar || "/placeholder.svg"}
                      alt={developer.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-gray-200"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {developer.rating} ⭐
                    </div>
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{developer.name}</h3>
                    <p className="text-sm sm:text-base text-blue-600 font-medium mb-2">{developer.role}</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{developer.experience}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{developer.projects}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">{developer.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Core Expertise
                  </h4>
                  <div className="space-y-2">
                    {developer.skills.map((skill, i) => (
                      <div key={i} className="flex items-center text-xs sm:text-sm bg-gray-50 rounded-lg px-3 py-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={developer.href}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                >
                  Contact {developer.name.split(" ")[0]}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* EA Team */}
        <div>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Executive Support Team
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Professional administrative support for all your business needs
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                <div className="relative">
                  <img
                    src={eaTeam.avatar || "/placeholder.svg"}
                    alt={eaTeam.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-gray-200"
                  />
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {eaTeam.rating} ⭐
                  </div>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{eaTeam.name}</h3>
                  <p className="text-sm sm:text-base text-purple-600 font-medium mb-2">{eaTeam.role}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">{eaTeam.teamSize}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">{eaTeam.availability}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">{eaTeam.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Our Services
                </h4>
                <div className="space-y-2">
                  {eaTeam.services.map((service, i) => (
                    <div key={i} className="flex items-center text-xs sm:text-sm bg-gray-50 rounded-lg px-3 py-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={eaTeam.href}
                className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                Contact EA Team
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 md:mt-24 text-center">
          <div className="bg-black rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Ready to Start Your Project?</h3>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
              Let&apos;s get started!{" "}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:justnord@gmail.com"
                className="bg-white text-black hover:bg-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105"
              >
                Schedule a Call
              </a>
              {/* <a
                href="https://linkedin.com/in/eshan-shettennavar/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105"
              >
                View Portfolio
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
