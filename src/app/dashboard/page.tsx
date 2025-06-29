"use client"

import type React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Michroma } from "next/font/google"
import { useState, useEffect } from "react"
import { account } from "@/lib/appwrite"
import dynamic from "next/dynamic"
import { UserIcon, Clock, Shield, Monitor, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/resizable-navbar"
import ThemeToggle from "@/components/ui/ThemeToggle"

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
  return <DashboardContent />
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<number | null>(null)
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
        const currentUser = await account.get()
        setUser(currentUser)
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
        await account.deleteSession("current")
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
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    )
  }

  const navItems = [
    { name: "Profile", value: "profile", icon: UserIcon },
    { name: "History", value: "history", icon: Clock },
    { name: "AI Interview", value: "ai", icon: Monitor },
    { name: "Security", value: "security", icon: Shield },
  ]

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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <div 
            className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-md font-medium text-gray-600 dark:text-gray-400 transition duration-200 hover:text-gray-800 dark:hover:text-gray-200 lg:flex lg:space-x-2"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navItems.map((item, idx) => {
              return (
                <motion.div
                  key={item.value}
                  className="relative"
                  animate={{
                    marginLeft: hoveredNav === idx ? "8px" : "0px",
                    marginRight: hoveredNav === idx ? "8px" : "0px",
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <button
                    onMouseEnter={() => setHoveredNav(idx)}
                  onClick={() => handleTabChange(item.value)}
                    className="relative px-4 py-2 text-gray-600 dark:text-gray-300 block"
                >
                    {(activeTab === item.value || hoveredNav === idx) && (
                    <motion.div
                      layoutId="hovered"
                      className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-gray-800"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                  )}
                  <span className="relative z-20 flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </span>
                </button>
                </motion.div>
              )
            })}
          </div>
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary" onClick={handleLogout}>
              Sign Out
            </NavbarButton>
          </div>
        </NavBody>
        {/* Mobile Nav */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-3">
              <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            </div>
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item) => {
              return (
                <button
                  key={item.value}
                  onClick={() => {
                    handleTabChange(item.value)
                    setIsMobileMenuOpen(false)
                  }}
                  className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 w-full text-left py-2 flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </button>
              )
            })}
            <NavbarButton
              onClick={() => {
                setIsMobileMenuOpen(false)
                handleLogout()
              }}
              variant="primary"
              className="w-full"
            >
              Sign Out
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Message Alert */}
      {message && (
        <div className="max-w-4xl mx-auto px-4 pt-4">
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
      <main className="max-w-4xl mx-auto py-6 px-4">
        {renderActiveTab()}
      </main>

      {/* Theme Toggle - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  )
}
