"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Monitor, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import AIInterview from "@/app/components/AIInterview"
import Loading from "../loading"

interface UserProfile {
  email: string
  lastLogin: string
  name?: string
  $createdAt?: string
  $id?: string
  prefs?: any
}

const AIInterviewPage = () => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Check if it's a guest session first
        const guestSession = localStorage.getItem("guestSession")
        if (guestSession === "true") {
          setIsGuest(true)
          setUser({
            name: "Guest User",
            email: "guest@example.com",
            $createdAt: new Date().toISOString(),
            $id: "guest",
            lastLogin: new Date().toISOString()
          })
          setLoading(false)
          return
        }

        // Regular user session
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (!currentUser) {
          setUser(null)
        } else {
          setUser({
            email: currentUser.email ?? "",
            lastLogin: new Date().toISOString(),
            name: (currentUser.user_metadata as any)?.name,
            $id: currentUser.id,
            $createdAt: currentUser.created_at ?? undefined,
            prefs: (currentUser.user_metadata as any) || undefined,
          })
        }
      } catch (error) {
        console.error("Auth error:", error)
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  if (loading) {
    return <Loading message="Loading AI Interview..." />
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Monitor className="w-6 h-6 text-gray-900 dark:text-white" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Interview</h2>
      </div>

      {isGuest && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Alert className="border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <AlertDescription className="text-gray-800 dark:text-gray-200">
              You&apos;re using a guest account. Sign up for full access to personalized interview features and unlimited sessions!
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <AIInterview isGuest={isGuest} />
      </motion.div>
    </div>
  )
}

export default AIInterviewPage 