"use client"

import type React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Michroma } from "next/font/google"
import { useState, useEffect, Suspense } from "react"
import { supabase } from "@/lib/supabase"
import dynamic from "next/dynamic"
import { UserIcon, Clock, Shield, Monitor, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import StaggeredMenu from "@/components/StaggeredMenu"
import ThemeToggle from "@/components/ui/ThemeToggle"
import Image from "next/image"

// Dynamically import components
const ProfilePage = dynamic(() => import("./profile/page"), { ssr: false })
const HistoryPage = dynamic(() => import("./history/page"), { ssr: false })
const SecurityPage = dynamic(() => import("./security/page"), { ssr: false })
const AIInterviewPage = dynamic(() => import("./ai-interview/page"), { ssr: false })

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
})

// Disable SSR for this component
const DashboardContent = dynamic(() => Promise.resolve(Dashboard), {
  ssr: false,
})

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div></div>}>
      <DashboardContent />
    </Suspense>
  )
}

interface UserProfile {
  email: string
  lastLogin: string
  name?: string
  $createdAt?: string
  $id?: string
  prefs?: any
}

const Dashboard = () => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get active tab from URL or default to AI Interview
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get('tab')
    return tab || "ai"
  })

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
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        
        if (user) {
          // Get user profile
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          
          setUser({
            email: user.email || '',
            name: profile?.name || user.user_metadata?.name || '',
            lastLogin: user.last_sign_in_at || new Date().toISOString(),
            $createdAt: user.created_at,
            $id: user.id,
            prefs: profile || {}
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // Update URL without page reload
    const url = new URL(window.location.href)
    url.searchParams.set('tab', tab)
    window.history.pushState({}, '', url.toString())
  }

  const handleLogout = async () => {
    try {
      if (isGuest) {
        // Clear guest session
        localStorage.removeItem("guestSession")
        localStorage.removeItem("guestName")
      } else {
        // Regular user logout
        await supabase.auth.signOut()
      }
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout error:", error)
      // Force redirect even if logout fails
      router.push("/auth/login")
    }
  }

  const clearMessage = () => {
    setTimeout(() => {
      setMessage("")
      setMessageType("")
    }, 5000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    )
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfilePage />
      case "history":
        return <HistoryPage />
      case "security":
        return <SecurityPage />
      case "ai":
      default:
        return <AIInterviewPage />
    }
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      <StaggeredMenu
        items={[
          {
            label: "Profile",
            ariaLabel: "Profile",
            onClick: () => handleTabChange("profile"),
          },
          {
            label: "History",
            ariaLabel: "History",
            onClick: () => handleTabChange("history"),
          },
          {
            label: "AI Interview",
            ariaLabel: "AI Interview",
            onClick: () => handleTabChange("ai"),
          },
          {
            label: "Security",
            ariaLabel: "Security",
            onClick: () => handleTabChange("security"),
          },
          {
            label: "Sign Out",
            ariaLabel: "Sign Out",
            onClick: handleLogout,
          }
        ]}
        logoContent={<div className="flex items-center gap-3"><Image src="/brand-logo.png" width={40} height={40} className="w-10 h-10 rounded-full bg-black p-2 object-contain" alt="Logo" /><span className="text-sm md:text-xl font-boldonse tracking-tighter text-pink-500">The Boring Interview</span></div>}
        colors={["#0f0518", "#1a0b2e", "#260d40", "#D02752"]}
        menuButtonColor="#ec4899" 
        openMenuButtonColor="#ffffff"
        accentColor="#ec4899"
      />
      {/* Message Alert */}
      {message && (
        <div className="max-w-4xl mx-auto px-4 pt-28">
          <Alert className={messageType === "success" ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20" : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"}>
            {messageType === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            )}
            <AlertDescription className={messageType === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}>
              {message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Tab Content */}
      <main className={`max-w-4xl mx-auto px-4 pb-20 ${message ? 'pt-6' : 'pt-28'}`}>
        {renderActiveTab()}
      </main>

      {/* Theme Toggle - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  )
}
