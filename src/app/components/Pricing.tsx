"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

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
    features: ["Free Access to AI Interview", "Free Transcript", "Upto 15 minutes of AI Interview"],
  },
  {
    name: "Student",
    price: "$11.99/mo",
    features: [
      "Everything in pro",
      "Upto 45 minutes of AI Interview",
    
    ],
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    features: [
      "Everything in Starter",
      "Upload Resume",
      "Upto 30 minutes of AI Interview",
      "Priority AI Access",
      "Advanced Analysis",
    ],
  },
  {
    name: "Elite",
    price: "$19.99/mo",
    features: [
      "Everything in Pro",
      "Personalized Interview Feedback",
      "Unlimited Storage",
      "Upto 60 minutes of AI Interview",
    ],
  },
]

export default function Pricing() {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 flex flex-col items-center justify-center">
      {/* Header with back link and title - Improved alignment */}
      <div className="w-full mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 sm:mb-0">
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-lg">Go Back</span>
          </Link>
          <h2 className="text-4xl font-bold text-center sm:text-right">Pricing Plans</h2>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>

      {/* Pre-release Plan */}
      <div className="mb-12 w-full">
        <h3 className="text-2xl font-medium text-center mb-4">Pre-release Plan</h3>
        <div className="rounded-lg border border-gray-300 dark:border-neutral-700 p-6 shadow-sm bg-gray-50 dark:bg-neutral-800 flex flex-col justify-between max-w-md mx-auto">
          <div>
            <h4 className="text-xl font-semibold mb-2 text-center">{preReleasePlan.name}</h4>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
              {preReleasePlan.price}
            </p>
            <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300 mb-6 ">
              {preReleasePlan.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>
          </div>
          <button onClick={() => router.push('/auth/login')} className="mt-auto bg-black hover:text-amber-200 text-white py-2 px-4 rounded">Get Started</button>
        </div>
      </div>

      {/* Post-release Plans */}
      <h3 className="text-2xl font-medium text-center mb-4 w-full">Post-release Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {postReleasePlans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-lg border border-gray-300 dark:border-neutral-700 p-6 shadow-sm bg-gray-50 dark:bg-neutral-800 flex flex-col justify-between"
          >
            <div>
              <h4 className="text-xl font-semibold mb-2 text-center">{plan.name}</h4>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">{plan.price}</p>
              <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
            </div>
            <button className="mt-auto bg-black hover:text-amber-200 text-white py-2 px-4 rounded">Coming Soon</button>
          </div>
        ))}
      </div>
    </div>
  )
}
