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
import { Loading } from "@/components/ui/Loading"

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

  // Reset window scroll on phase change to ensure screen doesn't "load from the bottom"
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [phase])

  if (!isMounted) {
    return <Loading message="INITIALIZING_ENVIRONMENT" />
  }

  // Render ai-coach phased UI
  if (phase === InterviewPhase.SETUP) {
    return (
      <div className="min-h-screen bg-transparent p-4 md:p-8 font-mono">
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b-2 border-zinc-200 dark:border-zinc-800 pb-4">
               <h1 className="text-3xl font-boldonse text-zinc-900 dark:text-white uppercase tracking-tight">System Configuration</h1>
               <p className="text-zinc-500 mt-1 uppercase text-xs tracking-widest">
                 {"/// INTERVIEW_MODULE_V2.0 /// INITIALIZING..."}
               </p>
            </div>
            <SetupScreen onStart={startInterview} mode={mode} setMode={setMode} />
        </div>
      </div>
    )
  }

  if (phase === InterviewPhase.INTERVIEW) {
    return (
      <div className="min-h-screen bg-transparent p-4 md:p-8 font-mono">
         <div className="max-w-4xl mx-auto h-[80vh]">
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
      <div className="min-h-screen bg-transparent p-4 md:p-8 font-mono">
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b-2 border-zinc-200 dark:border-zinc-800 pb-4 flex justify-between items-end">
               <div>
                   <h1 className="text-3xl font-boldonse text-zinc-900 dark:text-white uppercase tracking-tight">Session Report</h1>
                   <p className="text-zinc-500 mt-1 uppercase text-xs tracking-widest">
                     {"/// DATA_ANALYSIS_COMPLETE ///"}
                   </p>
               </div>
               <div className="text-emerald-600 dark:text-emerald-500 font-bold uppercase text-xs animate-pulse">
                   log_saved_successfully
               </div>
            </div>
            <FeedbackScreen feedback={feedback} mode={mode} onRestart={resetInterview} quotaExceededError={quotaExceededError} />
        </div>
      </div>
    )
  }

  // Feedback loading state (phase is FEEDBACK but feedback not ready yet)
  if (phase === InterviewPhase.FEEDBACK && !feedback) {
    return <Loading message="COMPILING_FEEDBACK_REPORT" />
  }

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 font-mono">
       <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="border-b-2 border-zinc-200 dark:border-zinc-800 pb-6">
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-pink-500 animate-pulse" />
                  <span className="text-xs text-pink-500 uppercase tracking-widest">AI Trainer Module</span>
               </div>
               <h1 className="text-4xl md:text-5xl font-boldonse text-zinc-900 dark:text-white uppercase tracking-tight">
                  Interview <span className="text-zinc-400 dark:text-zinc-600">Coach</span>
               </h1>
               <p className="text-zinc-500 mt-4 max-w-lg">
                 Advanced simulation environment for technical interview preparation.
                 {isGuest && <span className="text-amber-600 dark:text-amber-500 ml-2"> [DEMO_MODE_ACTIVE]</span>}
               </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 {
                   icon: Brain,
                   title: "Neural Analysis",
                   desc: "Real-time semantic feedback processing."
                 },
                 {
                   icon: Volume2,
                   title: "Voice Synth",
                   desc: "Low-latency audio interaction engine."
                 },
                 {
                   icon: Sparkles,
                   title: "Scenario Gen",
                   desc: "Dynamic problem generation algorithms."
                 }
               ].map((feature, i) => (
                 <div key={i} className="group border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 hover:border-zinc-900 dark:hover:border-white transition-colors">
                     <feature.icon className="w-8 h-8 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white mb-4 transition-colors" />
                     <h3 className="font-bold text-zinc-900 dark:text-white uppercase mb-2 tracking-wide">{feature.title}</h3>
                     <p className="text-xs text-zinc-500 uppercase tracking-widest">{feature.desc}</p>
                 </div>
               ))}
            </div>

            {/* Guest Notice */}
            {isGuest && (
               <div className="border border-amber-900/20 dark:border-amber-900/50 bg-amber-500/5 dark:bg-amber-900/10 p-4 text-center">
                   <p className="text-amber-700 dark:text-amber-500 font-mono text-sm uppercase tracking-wide">
                      Notice: Session limit set to 2 minutes. <Link href="/auth/signup" className="underline decoration-amber-500 underline-offset-4 hover:text-zinc-900 dark:hover:text-white">Initialize Full Account</Link>
                   </p>
               </div>
            )}
       </div>
    </div>
  )
}

export default AIInterview
