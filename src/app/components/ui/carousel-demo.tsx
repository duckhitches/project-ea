"use client"

import { Carousel } from "./carousel"

export function CarouselDemo() {
  const slideData = [
    {
      title: "Master Your Interviews",
      subtitle: "AI-Powered",
      description: "Practice with AI and get instant feedback to boost your confidence.",
      button: "Start Free",
      features: ["AI Feedback", "Real Questions", "Progress Track"],
      stats: [
        { label: "Success Rate", value: "94%" },
        // { label: "Users", value: "10K+" },
        // { label: "Sessions", value: "50K+" },
      ],
      src: "/pexels-1.jpg",
      gradient: "bg-gradient-to-br from-blue-600/80 via-purple-600/70 to-pink-600/60",
    },
    {
      title: "Instant AI Analysis",
      subtitle: "Smart Tech",
      description: "Get detailed insights on your performance and improvement tips.",
      button: "Try Analysis",
      features: ["Voice Analysis", "Body Language", "Smart Tips"],
      stats: [
        { label: "Accuracy", value: "98%" },
        { label: "Languages", value: "10+" },
        { label: "Models", value: "2+" },
      ],
      src: "/pexels-3.jpg",
      gradient: "bg-gradient-to-br from-green-600/80 via-teal-600/70 to-blue-600/60",
    },
    {
      title: "Perfect for Students",
      subtitle: "Career Ready",
      description: "Designed for students and freshers to ace their first interviews.",
      button: "Join Students",
      features: ["Entry Level", "Campus Prep", "Soft Skills"],
      stats: [
        { label: "Students", value: "25K+" },
        // { label: "Universities", value: "100+" },
        { label: "Placement", value: "89%" },
      ],
      src: "/pexels-2.jpg",
      gradient: "bg-gradient-to-br from-orange-600/80 via-red-600/70 to-pink-600/60",
    },
    {
      title: "Build Confidence",
      subtitle: "Expert Guide",
      description: "Overcome interview anxiety and present your best self.",
      button: "Get Confident",
      features: ["Anxiety Help", "Expert Tips", "Success Mind"],
      stats: [
        { label: "Confidence", value: "85%" },
        { label: "Less Anxiety", value: "78%" },
        { label: "Success", value: "100%" },
      ],
      src: "/pexels-4.jpg",
      gradient: "bg-gradient-to-br from-purple-600/80 via-indigo-600/70 to-blue-600/60",
    },
  ]

  return (
    <div className="relative overflow-hidden w-full h-full bg-gray-50 dark:bg-gray-900">
      <Carousel slides={slideData} />
    </div>
  )
}
