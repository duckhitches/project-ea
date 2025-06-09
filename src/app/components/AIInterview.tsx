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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const getStatusColor = () => {
    switch (conversation.status) {
      case "connected":
        return "bg-green-500"
      case "connecting":
        return "bg-yellow-500"
      case "disconnected":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = () => {
    switch (conversation.status) {
      case "connected":
        return conversation.isSpeaking ? "AI is speaking..." : "Listening to you..."
      case "connecting":
        return "Connecting..."
      case "disconnected":
        return "Ready to start"
      default:
        return "Ready to start"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Subtle background pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.01),transparent_50%)] z-10"></div>

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm mb-6">
            <Brain className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Interview</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Practice with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              AI Interviewer
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isGuest
              ? "Experience our AI interviewer with a quick demo. Sign up for unlimited access!"
              : "Get real-time feedback and improve your interview skills with our advanced AI"}
          </p>
        </motion.div>

        {/* Main Interface - Centered in Particle Field */}
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/85 backdrop-blur-xl border border-gray-200/50 shadow-2xl shadow-blue-500/10 relative overflow-hidden">
            <CardContent className="p-6 sm:p-8 lg:p-12 relative z-10">
              {/* Clean AI Interface - No Sphere */}
              <div className="flex flex-col items-center mb-8 sm:mb-12">
                {/* Central Visualizer Area */}
                <div className="relative mb-8 w-full max-w-2xl">
                  <div className="w-full h-96 rounded-lg bg-white backdrop-blur-sm border border-gray-200/50 overflow-hidden">
                    <AudioVisualizerCanvas isActive={conversation.status === "connected"} />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-3 mb-8">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse shadow-sm`} />
                  <span className="text-gray-700 font-medium text-lg bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    {getStatusText()}
                  </span>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                  {isGuest ? (
                    <>
                      <Button
                        onClick={startConversation}
                        disabled={conversation.status === "connected"}
                        size="lg"
                        className="bg-black hover:bg-black  text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base border-0"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Try Demo
                      </Button>
                      <Button
                        onClick={stopConversation}
                        disabled={conversation.status !== "connected"}
                        size="lg"
                        className="bg-red-500 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base border-0"
                      >
                        <Square className="w-5 h-5 mr-2" />
                        Stop
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={startConversation}
                        disabled={conversation.status === "connected"}
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base border-0"
                      >
                        <Mic className="w-5 h-5 mr-2" />
                        Start Interview
                      </Button>
                      <Button
                        onClick={stopConversation}
                        disabled={conversation.status !== "connected"}
                        size="lg"
                        className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base border-0"
                      >
                        <MicOff className="w-5 h-5 mr-2" />
                        End Interview
                      </Button>
                    </>
                  )}
                </div>

                {/* Guest Limitation */}
                {isGuest && (
                  <Badge className="bg-yellow-100/90 text-yellow-800 border-yellow-200 px-4 py-2 backdrop-blur-sm">
                    <Zap className="w-4 h-4 mr-2" />
                    Demo limited to 2 minutes
                  </Badge>
                )}
              </div>

              {/* Audio Visualizer Sub-Card */}
              

              {/* Resume Upload - Only for registered users */}
              {!isGuest && (
                <motion.div
                  className="border-t border-gray-200/50 pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center">
                      <Upload className="w-5 h-5 mr-2 text-blue-600" />
                      Upload Your Resume (Rolling out soon)
                    </h3>
                    <p className="text-gray-600">
                      Upload your resume for personalized interview questions (TXT format supported)
                    </p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <label className="block">
                      {/* <input
                        type="file"
                        accept=".txt,.pdf"
                        onChange={handleResumeUpload}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200 cursor-pointer"
                      /> */}
                    </label>

                    {resumeText && (
                      <motion.div
                        className="mt-6 p-4 bg-gray-50/90 backdrop-blur-sm border border-gray-200 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center mb-2">
                          <FileText className="w-4 h-4 mr-2 text-green-600" />
                          <span className="text-sm font-medium text-gray-900">Resume Preview</span>
                        </div>
                        <div className="max-h-32 overflow-y-auto text-xs text-gray-700 font-mono bg-white/90 backdrop-blur-sm p-3 rounded border">
                          <pre className="whitespace-pre-wrap">
                            {resumeText.slice(0, 500)}
                            {resumeText.length > 500 ? "\n... (truncated)" : ""}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-4xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {[
            { icon: Brain, title: "AI Analysis", desc: "Real-time feedback on your responses" },
            { icon: Mic, title: "Voice Recognition", desc: "Natural conversation flow" },
            { icon: Sparkles, title: "Smart Questions", desc: "Personalized interview content" },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-white/75 backdrop-blur-sm border border-gray-200/50 text-center hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <CardContent className="p-4 sm:p-6">
                <feature.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h4 className="font-semibold text-gray-900 mb-2 text-base">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AIInterview
