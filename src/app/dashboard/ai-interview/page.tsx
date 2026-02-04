"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Monitor, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import AIInterview from "@/components/ai-interview-coach/AIInterview"
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
        // Regular user session (Prioritize real authentication)
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        
        if (currentUser) {
          // If we have a real user, ensure guest mode is cleared
          localStorage.removeItem("guestSession")
          localStorage.removeItem("guestName")
          setIsGuest(false)
          
          setUser({
            email: currentUser.email ?? "",
            lastLogin: new Date().toISOString(),
            name: (currentUser.user_metadata as any)?.name,
            $id: currentUser.id,
            $createdAt: currentUser.created_at ?? undefined,
            prefs: (currentUser.user_metadata as any) || undefined,
          })
          setLoading(false)
          return
        }

        // Only check for guest session if no real user is found
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

        // No session found
        setUser(null)
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
      

      {isGuest && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-amber-500/5 dark:bg-amber-500/5 border-2 border-amber-500/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group"
        >
          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] dark:bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none" />
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-amber-500" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-amber-500" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-amber-500" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-amber-500" />

          <div className="flex items-start gap-4 flex-1 relative z-10">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/30 dark:group-hover:bg-amber-500/20 transition-colors duration-500">
              <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-amber-700 dark:text-amber-500 font-boldonse uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="animate-pulse">{'>>'}</span> Unauthorized Access Mode
              </h3>
              <p className="text-amber-800/70 dark:text-amber-500/70 font-mono text-xs max-w-2xl leading-relaxed">
                System is currently running in GUEST_MODE. Session history persistence is disabled. 
                Initialize a full account to unlock personalized analysis and unlimited access.
              </p>
            </div>
          </div>

          <Button
            onClick={() => router.push('/auth/signup')}
            className="group/btn relative bg-amber-500 hover:bg-amber-400 text-black rounded-none border-2 border-zinc-950 dark:border-black font-bold uppercase tracking-wider h-12 px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <span>Initialize Account</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
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