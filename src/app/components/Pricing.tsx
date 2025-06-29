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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Header Section */}
      <div className="relative border-b border-gray-200 dark:border-gray-800">
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
                className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all duration-200 mr-3">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                </div>
                <span className="font-medium">Back to Home</span>
              </Link>
            </motion.div>

            {/* Header Content */}
            <div className="text-center max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium mb-6"
              >
                <Star className="w-4 h-4 mr-2" />
                Special Launch Pricing
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Choose Your Plan
                <span className="block text-gray-500 dark:text-gray-400">
                  Start your journey today
                </span>
              </motion.h1>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Limited Time Offer
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get premium features for free during our pre-release phase
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full text-sm font-bold shadow-xl">
                  Limited Time Offer
                </div>
              </div>

              <div className="bg-white dark:bg-black rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {preReleasePlan.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
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
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-5 h-5 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-gray-900 dark:text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => window.location.href = '/auth/login'}
                >
                  Get Started Free
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Post-release Plans */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Future Pricing Plans
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              After our launch, these will be our regular pricing tiers
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
                  className={`relative bg-white dark:bg-black rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                    plan.popular ? "ring-2 ring-gray-900 dark:ring-white" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-bold">
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <IconComponent className="w-8 h-8 text-gray-900 dark:text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>

                      <div className="flex items-center justify-center gap-2">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-gray-500 dark:text-gray-400">
                            {plan.period}
                          </span>
                        )}
                      </div>

                      {plan.badge && !plan.popular && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">{plan.badge}</div>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex-shrink-0 w-5 h-5 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-gray-900 dark:text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-2xl font-semibold transition-all duration-200 ${
                        plan.popular
                          ? "bg-black dark:bg-white text-white dark:text-black"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      }`}
                    >
                      Coming Soon
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
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Questions? We&apos;re here to help
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Contact our support team for any pricing questions
          </p>
          <Link href="/Contact">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black dark:bg-white text-white dark:text-black py-4 px-8 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Support
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
