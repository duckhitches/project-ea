"use client"
import { Timeline } from "./timeline"
import { motion } from "framer-motion"
import { ExternalLink, Sparkles, Heart, Code, Brain, Rocket, Users, Award, TrendingUp, Shield, Zap } from "lucide-react"

const timelineData = [
  {
    title: "The Beginning",
    icon: <Rocket className="w-5 h-5 text-black dark:text-white" />,
    content: (
      <div className="space-y-4 font-mono">
        <p className="text-black dark:text-white">
          Our journey began with a simple observation: interview preparation was broken. Traditional methods were expensive, 
          inaccessible, and lacked personalization. We saw an opportunity to leverage AI to make interview coaching 
          available to everyone.
        </p>
      </div>
    ),
  },
  {
    title: "The Vision",
    icon: <Brain className="w-5 h-5 text-black dark:text-white" />,
    content: (
      <div className="space-y-4 font-mono">
        <p className="text-black dark:text-white">
          We envisioned a platform where <span className="font-bold underline">AI</span> would provide personalized feedback, adapt to each user&apos;s needs, and help 
          candidates build confidence through practice. Our goal was to democratize access to high-quality interview 
          preparation.
        </p>
      </div>
    ),
  },
  {
    title: "The Technology",
    icon: <Code className="w-5 h-5 text-black dark:text-white" />,
    content: (
      <div className="space-y-4 font-mono">
        <p className="text-black dark:text-white">
          We developed advanced AI models that could understand context, evaluate responses, and provide constructive 
          feedback. Our technology combines natural language processing with machine learning to create a realistic 
          interview experience.
        </p>
      </div>
    ),
  },
  {
    title: "The Impact",
    icon: <TrendingUp className="w-5 h-5 text-black dark:text-white" />,
    content: (
      <div className="space-y-4 font-mono">
        <p className="text-black dark:text-white">
          Today, our platform has helped thousands of candidates land their dream jobs. With a <span className="bg-black text-white dark:bg-white dark:text-black px-1">94% success rate</span> and 
          growing community of users, we&apos;re proud of the impact we&apos;ve made in transforming interview preparation.
        </p>
      </div>
    ),
  },
  {
    title: "The Future",
    icon: <Zap className="w-5 h-5 text-black dark:text-white" />,
    content: (
      <div className="space-y-4 font-mono">
        <p className="text-black dark:text-white">
          We&apos;re constantly innovating and expanding our platform. From new AI models to additional interview types, 
          we&apos;re committed to making interview preparation even more effective and accessible for everyone.
        </p>
      </div>
    ),
  },
]

export function TimelineDemo() {
  return <Timeline data={timelineData} />
}
