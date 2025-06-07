"use client"

import Link from "next/link"
import { ArrowLeft, Check, Star, Zap, Users, Shield, GraduationCap } from "lucide-react"

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
    color: "from-blue-500 to-cyan-500",
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
    color: "from-purple-500 to-pink-500",
    popular: true,
  },
  {
    name: "Student",
    price: "$11.99",
    period: "/mo",
    badge: "Student Special",
    features: ["Everything in Pro", "Upto 45 minutes of AI Interview"],
    icon: GraduationCap,
    color: "from-green-500 to-emerald-500",
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
    color: "from-orange-500 to-red-500",
  },
]

export default function Pricing() {
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
              <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Special Launch Pricing
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Choose Your
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Perfect Plan
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Start your interview preparation journey with our AI-powered platform. Choose the plan that fits your
                needs and budget.
              </p>

              <p className="text-sm text-gray-600">
                Let&apos;s get started!{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Pre-release Plan */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Limited Time Offer
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Get premium features for free during our pre-release phase
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="relative">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  🔥 Limited Time
                </div>
              </div>

              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gradient-to-r from-blue-500 to-purple-500 p-6 sm:p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />

                <div className="relative z-10">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {preReleasePlan.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600">
                        {preReleasePlan.price}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {preReleasePlan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => window.location.href = '/auth/login'} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Get Started Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post-release Plans */}
        <div>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Future Pricing Plans
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              After our launch, these will be our regular pricing tiers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {postReleasePlans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                    plan.popular ? "ring-2 ring-purple-500 scale-105" : ""
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                        ⭐ {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-6 sm:mb-8">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${plan.color} mb-4`}
                      >
                        <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                        {plan.period && <span className="text-sm sm:text-base text-gray-500">{plan.period}</span>}
                      </div>

                      {plan.badge && !plan.popular && (
                        <div className="text-sm text-blue-600 mt-1 font-medium">{plan.badge}</div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 sm:mt-20 md:mt-24 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Questions? We're here to help
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
            Contact our support team for any pricing questions
          </p>
          <Link href="/Contact">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
