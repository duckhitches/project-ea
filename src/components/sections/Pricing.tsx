"use client"

import Link from "next/link"
import { ArrowLeft, Check, Star, Zap, Users, Shield, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

const preReleasePlan = {
  name: "Pre-release",
  price: "Free",
  features: [
    "Access to AI Interview",
    "Basic Transcript",
    "Upto 30 minutes of AI Interview",
    "Priority AI Access",
    "Personalized Interview Feedback",
  ],
}

const postReleasePlans = [
  {
    name: "Starter",
    price: "Free",
    badge: "Forever Free",
    features: ["Free Access to AI Interview", "Free Transcript", "Upto 15 minutes of AI Interview"],
    icon: Users,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Upload Resume",
      "Upto 30 minutes of AI Interview",
      "Priority AI Access",
      "Advanced Analysis",
    ],
    icon: Zap,
    popular: true,
  },
  {
    name: "Student",
    price: "$11.99",
    period: "/mo",
    badge: "Student Special",
    features: ["Everything in Pro", "Upto 45 minutes of AI Interview"],
    icon: GraduationCap,
  },
  {
    name: "Elite",
    price: "$19.99",
    period: "/mo",
    badge: "Best Value",
    features: [
      "Everything in Pro",
      "Personalized Interview Feedback",
      "Unlimited Storage",
      "Upto 60 minutes of AI Interview",
    ],
    icon: Shield,
  },
]

export default function Pricing() {

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 font-mono">
      {/* Header Section */}
      <div className="relative border-b-4 border-black dark:border-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-16">
            {/* Back Link */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center text-gray-900 dark:text-white hover:underline transition-all duration-200 group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-none bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white mr-3 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                </div>
                <span className="font-bold uppercase tracking-widest">Back to Home</span>
              </Link>
            </motion.div>

            {/* Header Content */}
            <div className="text-center max-w-4xl mx-auto">
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-boldonse uppercase tracking-tighter mb-6 bg-black text-white dark:bg-white dark:text-black p-4 inline-block transform -rotate-1 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
              >
                Pricing Structure
              </motion.h1>
              <div className="text-black dark:text-white text-lg font-mono uppercase tracking-widest mt-4">
                {'//'} Select your tier allocation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Pre-release Plan */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-boldonse uppercase text-gray-900 dark:text-white mb-4 tracking-tight">
              Beta Access
            </h2>
            <p className="text-black dark:text-white font-mono text-sm uppercase tracking-widest">
              Limited time operational window
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 w-full text-center">
                <div className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-none text-sm font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] inline-block border-2 border-transparent">
                  Current Status: Active
                </div>
              </div>

              <div className="bg-white dark:bg-black rounded-none border-4 border-black dark:border-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                <div className="text-center mb-8 pt-6">
                  <h3 className="text-3xl font-boldonse uppercase text-gray-900 dark:text-white mb-4">
                    {preReleasePlan.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-6xl font-boldonse text-pink-500">
                      {preReleasePlan.price}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {preReleasePlan.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-black dark:bg-white rounded-none flex items-center justify-center border border-black dark:border-white">
                        <Check className="w-4 h-4 text-white dark:text-black" />
                      </div>
                      <span className="text-black dark:text-white uppercase font-mono text-sm pt-0.5">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-pink-500 text-white py-4 rounded-none font-boldonse uppercase tracking-widest transition-all duration-200 border-2 border-transparent hover:border-black dark:hover:border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-pink-600"
                  onClick={() => window.location.href = '/auth/login'}
                >
                  Confirm Entry
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Post-release Plans */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-boldonse uppercase text-gray-900 dark:text-white mb-4 tracking-tight">
              Future Roadmap
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-mono text-sm uppercase tracking-widest">
              Projected tier classification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {postReleasePlans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white dark:bg-black rounded-none border-2 border-black dark:border-white p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200 ${
                    plan.popular ? "border-4" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-full text-center">
                      <div className="bg-pink-500 text-white px-4 py-1 rounded-none text-xs font-bold uppercase tracking-widest border-2 border-black dark:border-white shadow-md inline-block">
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="p-8 h-full flex flex-col">
                    <div className="text-center mb-8 pt-2">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-gray-100 dark:bg-gray-800 mb-4 border-2 border-black dark:border-white">
                        <IconComponent className="w-8 h-8 text-black dark:text-white" />
                      </div>

                      <h3 className="text-2xl font-boldonse uppercase text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>

                      <div className="flex items-center justify-center gap-1">
                        <span className={`text-3xl font-boldonse ${plan.popular ? 'text-pink-500' : 'text-gray-900 dark:text-white'}`}>
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-gray-500 dark:text-gray-400 font-mono text-sm self-end mb-1">
                            {plan.period}
                          </span>
                        )}
                      </div>

                      {plan.badge && !plan.popular && (
                        <div className="text-xs text-black dark:text-white mt-2 font-mono uppercase bg-gray-200 dark:bg-gray-800 px-2 py-0.5 inline-block">{plan.badge}</div>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-4 h-4 mt-1 bg-black dark:bg-white rounded-none flex items-center justify-center">
                            <Check className="w-3 h-3 text-white dark:text-black" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-mono text-xs uppercase leading-tight">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={true}
                      className={`w-full py-3 rounded-none font-boldonse uppercase tracking-widest transition-all duration-200 border-2 border-black dark:border-white ${
                        plan.popular
                          ? "bg-black dark:bg-white text-white dark:text-black opacity-50 cursor-not-allowed"
                          : "bg-transparent text-gray-900 dark:text-white opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Locked
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-boldonse uppercase text-gray-900 dark:text-white mb-6">
            Help Signal
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 font-mono uppercase text-sm">
            Request support frequency
          </p>
          <Link href="/contact">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black dark:bg-white text-white dark:text-black py-4 px-8 rounded-none font-boldonse uppercase tracking-widest transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(128,128,128,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] border-2 border-transparent"
            >
              Contact Support
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )

}
