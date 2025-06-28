"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useConversation } from "@elevenlabs/react"
import { motion } from "framer-motion"
import { Mic, MicOff, Play, Square, Upload, FileText, Sparkles, Zap, Brain, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Dynamically import AudioVisualizer
const AudioVisualizerCanvas = dynamic(() => import("./ui/AudioVisualizer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse">Loading visualizer...</div>
    </div>
  ),
})

interface AIInterviewProps {
  isGuest?: boolean
}

const AIInterview = ({ isGuest = false }: AIInterviewProps) => {
  const [resumeText, setResumeText] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showVisualizer, setShowVisualizer] = useState(false)

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected")
      setIsRecording(true)
    },
    onDisconnect: () => {
      console.log("Disconnected")
      setIsRecording(false)
    },
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  })

  const startConversation = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      await conversation.startSession({
        agentId: "agent_01jxa7dek1eh78bqvhfmg10m34",
      })
    } catch (error) {
      console.error("Failed to start conversation:", error)
    }
  }

  const stopConversation = async () => {
    await conversation.endSession()
    setIsRecording(false)
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setResumeText(text)
    }
    reader.readAsText(file)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const StatusBadge = ({ status }: { status: string }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
      <div className={cn(
        "w-2 h-2 rounded-full animate-pulse",
        status === "connected" ? "bg-green-500" : 
        status === "connecting" ? "bg-yellow-500" : 
        "bg-gray-400"
      )} />
      <span className="text-xs font-medium text-gray-700">
        {status === "connected" ? "Active Session" : 
         status === "connecting" ? "Connecting..." : 
         "Ready to Start"}
      </span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-medium mb-4">
            <Brain className="w-3.5 h-3.5 mr-1.5" />
            AI-Powered Practice Interview
          </span>

          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            Perfect Your Interview Skills
          </h1>
          
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Get real-time feedback and guidance from our AI interviewer. 
            {isGuest && " Try a 2-minute demo or sign up for full access."}
          </p>
        </motion.div>

        {/* Main Interview Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8"
        >
          <div className="p-6 sm:p-8">
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-8">
              <StatusBadge status={conversation.status} />
              {!isGuest && (
                <span className="text-xs text-gray-500">
                  Session duration: 20 minutes
                </span>
              )}
            </div>

            {/* Visualizer */}
            <div className="relative aspect-[16/9] mb-8 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              {conversation.status === "connected" ? (
                <AudioVisualizerCanvas isActive={true} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <AudioVisualizerCanvas isActive={false} />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={startConversation}
                disabled={conversation.status === "connected" || conversation.status === "connecting"}
                className="w-full sm:w-auto h-11 px-6 bg-black hover:bg-gray-900 text-white rounded-full disabled:opacity-50"
              >
                <Mic className="w-4 h-4 mr-2" />
                {isGuest ? "Try Demo" : "Start Interview"}
              </Button>

              <Button
                onClick={stopConversation}
                disabled={conversation.status !== "connected"}
                className="w-full sm:w-auto h-11 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full disabled:opacity-50"
              >
                <Square className="w-4 h-4 mr-2" />
                End Session
              </Button>
            </div>

            {/* Instructions */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Instructions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600">1</span>
                  </div>
                  <p>Click &quot;Start Interview&quot; and allow microphone access when prompted</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600">2</span>
                  </div>
                  <p>Speak clearly and naturally when responding to questions</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600">3</span>
                  </div>
                  <p>Wait for the AI to process your response before continuing</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600">4</span>
                  </div>
                  <p>Click &quot;End Session&quot; when you&apos;re finished or want to start over</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resume Upload - Only for registered users */}
        {!isGuest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8"
          >
            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center">
                  <Upload className="w-5 h-5 mr-2 text-gray-600" />
                  Upload Your Resume (Coming Soon)
                </h3>
                <p className="text-sm text-gray-600">
                  Upload your resume for personalized interview questions (TXT format supported)
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <label className="block">
                  <input
                    type="file"
                    accept=".txt,.pdf"
                    onChange={handleResumeUpload}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all duration-200 cursor-pointer"
                  />
                </label>

                {resumeText && (
                  <motion.div
                    className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center mb-2">
                      <FileText className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">Resume Preview</span>
                    </div>
                    <div className="max-h-32 overflow-y-auto text-xs text-gray-700 font-mono bg-white p-3 rounded border">
                      <pre className="whitespace-pre-wrap">
                        {resumeText.slice(0, 500)}
                        {resumeText.length > 500 ? "\n... (truncated)" : ""}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

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
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <feature.icon className="w-5 h-5 text-gray-900 mb-2" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600">{feature.desc}</p>
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
            <p className="text-xs text-gray-500">
              Demo limited to 2 minutes. 
              <Link href="/auth/signup" className="text-gray-900 font-medium ml-1">
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
