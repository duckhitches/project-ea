"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Zap, Brain, Volume2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import SetupScreen from "@/components/ai-interview-coach/components/SetupScreen"
import InterviewScreen from "@/components/ai-interview-coach/components/InterviewScreen"
import FeedbackScreen from "@/components/ai-interview-coach/components/FeedbackScreen"
import { useInterview } from "@/components/ai-interview-coach/hooks/useInterview"
import { InterviewPhase } from "@/components/ai-interview-coach/types"

interface AIInterviewProps {
  isGuest?: boolean
}

const AIInterview = ({ isGuest = false }: AIInterviewProps) => {
  const {
    phase,
    mode,
    setMode,
    startInterview,
    interviewState,
    liveTranscript,
    messages,
    endInterview,
    feedback,
    quotaExceededError,
    resetInterview,
    elapsedTime,
    handleFeedback,
  } = useInterview()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    )
  }

  // Render ai-coach phased UI
  if (phase === InterviewPhase.SETUP) {
    return (
      <div className="min-h-screen bg-transparent transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">Perfect Your Interview Skills</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              Get real-time feedback and guidance from our AI interviewer.
              {isGuest && " Try a 2-minute demo or sign up for full access."}
            </p>
          </motion.div>
          <SetupScreen onStart={startInterview} mode={mode} setMode={setMode} />
        </div>
      </div>
    )
  }

  if (phase === InterviewPhase.INTERVIEW) {
    return (
      <div className="min-h-screen bg-transparent transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <InterviewScreen
            state={interviewState}
            messages={messages}
            liveTranscript={liveTranscript}
            elapsedTime={elapsedTime}
            endInterview={endInterview}
            handleFeedback={handleFeedback}
          />
        </div>
      </div>
    )
  }

  if (phase === InterviewPhase.FEEDBACK && feedback) {
    return (
      <div className="min-h-screen bg-transparent transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <FeedbackScreen feedback={feedback} mode={mode} onRestart={resetInterview} quotaExceededError={quotaExceededError} />
        </div>
      </div>
    )
  }

  // Feedback loading state (phase is FEEDBACK but feedback not ready yet)
  if (phase === InterviewPhase.FEEDBACK && !feedback) {
    return (
      <div className="min-h-screen bg-transparent transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-700 border-t-gray-900 dark:border-t-white animate-spin mb-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">Generating Feedback</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md">Analyzing your interview transcript and preparing a detailed report...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          

          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Perfect Your Interview Skills
          </h1>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Get real-time feedback and guidance from our AI interviewer. 
            {isGuest && " Try a 2-minute demo or sign up for full access."}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              icon: Brain,
              title: "AI Analysis",
              desc: "Get instant feedback on your responses"
            },
            {
              icon: Volume2,
              title: "Natural Conversation",
              desc: "Practice with human-like interactions"
            },
            {
              icon: Sparkles,
              title: "Smart Questions",
              desc: "Industry-specific interview scenarios"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 dark:bg-black/5 backdrop-blur-xl p-4 rounded-lg border border-white/10 dark:border-white/5 shadow-sm"
            >
              <feature.icon className="w-5 h-5 text-gray-900 dark:text-white mb-2" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Guest Notice */}
        {isGuest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Demo limited to 2 minutes. 
              <Link href="/auth/signup" className="text-gray-900 dark:text-white font-medium ml-1">
                Sign up for full access →
              </Link>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AIInterview
