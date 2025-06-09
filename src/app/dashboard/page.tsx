"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Michroma } from "next/font/google"
import { useState, useEffect } from "react"
import { account } from "@/lib/appwrite"
import dynamic from "next/dynamic"
import { UserIcon, Clock, Shield, Monitor, CheckCircle, AlertCircle, Camera, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import AIInterview from "../components/AIInterview"
import LoginHistoryComponent from "@/app/components/LoginHistory"
import SecuritySettingsComponent from "@/app/components/SecuritySettings"

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
  const [profileLoading, setProfileLoading] = useState(false)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("ai")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [isGuest, setIsGuest] = useState(false)

  // Profile state
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    profilePicture: "",
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
          setProfileData({
            name: "Guest User",
            email: "guest@example.com",
            bio: "",
            location: "",
            website: "",
            profilePicture: "",
          })
          setLoading(false)
          return
        }

        // Regular user session
        const currentUser = await account.get()
        setUser(currentUser)
        setProfileData({
          name: currentUser.name || "",
          email: currentUser.email || "",
          bio: currentUser.prefs?.bio || "",
          location: currentUser.prefs?.location || "",
          website: currentUser.prefs?.website || "",
          profilePicture: currentUser.prefs?.profilePicture || "",
        })
      } catch (error) {
        console.error("Auth error:", error)
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isGuest) {
      setMessage("Profile updates are not available for guest users")
      setMessageType("error")
      clearMessage()
      return
    }

    setProfileLoading(true)
    try {
      // Update name using Appwrite
      if (profileData.name !== user?.name) {
        await account.updateName(profileData.name)
      }

      // Update email using Appwrite (requires verification)
      if (profileData.email !== user?.email) {
        await account.updateEmail(profileData.email, profileData.email) // This will send verification
      }

      // Update preferences (bio, location, website, profilePicture) using Appwrite prefs
      const prefs = {
        bio: profileData.bio || "",
        location: profileData.location || "",
        website: profileData.website || "",
        profilePicture: profileData.profilePicture || ""
      }
      
      await account.updatePrefs(prefs)

      // Refresh user data
      const updatedUser = await account.get()
      setUser(updatedUser)

      setMessage("Profile updated successfully!")
      setMessageType("success")
      clearMessage()
    } catch (error: any) {
      console.error("Profile update error:", error)
      let errorMessage = "Error updating profile"

      if (error.code === 400) {
        errorMessage = "Invalid profile data"
      } else if (error.code === 401) {
        errorMessage = "Authentication required"
      } else if (error.message) {
        errorMessage = error.message
      }

      setMessage(errorMessage)
      setMessageType("error")
      clearMessage()
    } finally {
      setProfileLoading(false)
    }
  }

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Profile picture must be less than 5MB")
      setMessageType("error")
      clearMessage()
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file")
      setMessageType("error")
      clearMessage()
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setProfileData({ ...profileData, profilePicture: result })
    }
    reader.readAsDataURL(file)
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  const navItems = [
    { name: "Profile", value: "profile", icon: UserIcon },
    { name: "History", value: "history", icon: Clock },
    { name: "AI Interview", value: "ai", icon: Monitor },
    { name: "Security", value: "security", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
            {navItems.map((item) => {
              return (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
                >
                  {activeTab === item.value && (
                    <motion.div
                      layoutId="hovered"
                      className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                    />
                  )}
                  <span className="relative z-20 flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </span>
                </button>
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
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item) => {
              return (
                <button
                  key={item.value}
                  onClick={() => {
                    setActiveTab(item.value)
                    setIsMobileMenuOpen(false)
                  }}
                  className="relative text-gray-600 hover:text-gray-900 w-full text-left py-2 flex items-center gap-2"
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
          <Alert className={messageType === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            {messageType === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={messageType === "success" ? "text-green-800" : "text-red-800"}>
              {message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Tab Content */}
      <main className="max-w-4xl mx-auto py-6 px-4">
        {activeTab === "profile" && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <UserIcon className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
            </div>

            {isGuest && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  You are using a guest account. Sign up to save your profile information!
                </AlertDescription>
              </Alert>
            )}

            {/* Profile Picture Card */}
            <motion.div
          className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Upload a profile picture to personalize your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {profileData.profilePicture ? (
                        <img
                          src={profileData.profilePicture || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{profileData.name ? profileData.name[0].toUpperCase() : "U"}</span>
                      )}
                    </div>
                    {!isGuest && (
                      <label className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg">
                        <Camera className="w-4 h-4 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureUpload}
                          className="hidden"
                          disabled={profileLoading}
                        />
                      </label>
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{profileData.name || "Your Name"}</h3>
                    <p className="text-gray-600 mb-3">{profileData.email}</p>
                    {!isGuest && (
                      <div className="text-sm text-gray-500">
                        <p>Recommended: Square image, at least 200x200px</p>
                        <p>Maximum file size: 5MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Personal Information Card */}
            <motion.div
          className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="h-12 text-base border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                        disabled={isGuest || profileLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="h-12 text-base border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                        disabled={isGuest || profileLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell us about yourself, your experience, and your goals..."
                      className="min-h-[120px] text-base border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 resize-none"
                      disabled={isGuest || profileLoading}
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">{profileData.bio.length}/500 characters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        placeholder="City, Country"
                        className="h-12 text-base border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                        disabled={isGuest || profileLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        placeholder="https://yourwebsite.com"
                        className="h-12 text-base border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                        disabled={isGuest || profileLoading}
                      />
                    </div>
                  </div>

                  {!isGuest && (
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={profileLoading}
                        className="w-full md:w-auto h-12 px-8 bg-black hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {profileLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            <span>Updating Profile...</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Upload className="w-4 h-4 mr-2" />
                            <span>Update Profile</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
            </motion.div>
            {/* Account Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your account details and membership information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">User ID</span>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {user?.$id?.slice(0, 8)}...
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Account Status</span>
                    <Badge className={isGuest ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
                      {isGuest ? "Guest" : "Active"}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Member Since</span>
                  <span className="text-sm text-gray-600">
                    {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Login History</h2>
            </div>

            {isGuest ? (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Login history is only available for registered users.
                </AlertDescription>
              </Alert>
            ) : (
              <LoginHistoryComponent />
            )}
          </div>
        )}

        {activeTab === "ai" && <AIInterview isGuest={isGuest} />}

        {activeTab === "security" && (
          <motion.div
          className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            {isGuest ? (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Security settings are only available for registered users. Please sign up to access these features.
                </AlertDescription>
              </Alert>
            ) : (
              <SecuritySettingsComponent />
            )}
          </motion.div>
        )}
      </main>
    </div>
  )
}
