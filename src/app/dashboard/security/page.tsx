"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Shield, AlertCircle, Lock, Key, Eye, EyeOff, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Loading from "../loading"

interface UserProfile {
  email: string
  lastLogin: string
  name?: string
  $createdAt?: string
  $id?: string
  prefs?: any
}

const SecurityPage = () => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  // Password change form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
          setUser({
            email: user.email || '',
            name: user.user_metadata?.name || '',
            lastLogin: user.last_sign_in_at || new Date().toISOString(),
            $createdAt: user.created_at,
            $id: user.id,
            prefs: {}
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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New passwords do not match")
      setMessageType("error")
      clearMessage()
      return
    }

    if (passwordData.newPassword.length < 8) {
      setMessage("New password must be at least 8 characters long")
      setMessageType("error")
      clearMessage()
      return
    }

    setPasswordLoading(true)
    try {
      // Update password in Supabase
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      })
      
      if (error) throw error
      
      setMessage("Password updated successfully!")
      setMessageType("success")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      clearMessage()
    } catch (error: any) {
      console.error("Password update error:", error)
      let errorMessage = "Error updating password"

      if (error.code === 400) {
        errorMessage = "Current password is incorrect"
      } else if (error.code === 401) {
        errorMessage = "Authentication required"
      } else if (error.message) {
        errorMessage = error.message
      }

      setMessage(errorMessage)
      setMessageType("error")
      clearMessage()
    } finally {
      setPasswordLoading(false)
    }
  }

  const clearMessage = () => {
    setTimeout(() => {
      setMessage("")
      setMessageType("")
    }, 5000)
  }

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(passwordData.newPassword)

  // Loading Button Component
  const LoadingButton = ({ 
    children, 
    loading, 
    onClick, 
    className,
    type = "button"
  }: {
    children: React.ReactNode
    loading: boolean
    onClick?: () => void
    className?: string
    type?: "button" | "submit" | "reset"
  }) => (
    <Button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={cn(
        "relative overflow-hidden bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-900 text-white dark:text-black rounded-full transition-all duration-200",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-white rounded-full"
                  animate={{
                    y: ["0%", "-50%", "0%"],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )

  // Loading component
  if (loading) {
    return <Loading message="Loading security settings..." />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8 space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
            <Shield className="w-5 h-5 text-white dark:text-black" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Security Settings</h1>
        </div>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Alert 
              className={cn(
                "border rounded-lg shadow-sm",
                messageType === "success" 
                  ? "border-green-100 bg-green-50" 
                  : "border-red-100 bg-red-50"
              )}
            >
              {messageType === "success" ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              <AlertDescription className={cn(
                "text-sm font-medium",
                messageType === "success" ? "text-green-800" : "text-red-800"
              )}>
                {message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {isGuest ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert className="bg-amber-50 border border-amber-100 rounded-xl">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Security settings are only available for registered users.
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <LoadingButton
              onClick={() => router.push('/auth/signup')}
              loading={false}
              className="px-6 py-2"
            >
              Create an account
              <ArrowRight className="w-4 h-4 ml-2" />
            </LoadingButton>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Security Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-100 dark:border-gray-900 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Security Overview</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-white mb-6">Your account security status and recommendations</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Email Verification</span>
                  <Badge className="bg-green-50 text-green-700 border-green-200">Verified</Badge>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Password Strength</span>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200">Strong</Badge>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">2FA Status</span>
                  <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Not Enabled</Badge>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Password Change Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-100 dark:border-gray-900 p-6"
          >
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="flex items-center gap-3 mb-4 ">
                <Key className="w-5 h-5 text-gray-400 " />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h2>
              </div>
              
              {/* Current Password */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-white">Current Password</Label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="h-11 border-gray-200 focus:border-gray-900 focus:ring-0 rounded-lg pr-10 dark:bg-black dark:border-gray-700"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white "
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-white">New Password</Label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="h-11 border-gray-200 focus:border-gray-900 focus:ring-0 rounded-lg pr-10 dark:bg-black dark:border-gray-700 dark:text-white"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white "
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-white">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="h-11 border-gray-200 focus:border-gray-900 focus:ring-0 rounded-lg pr-10 dark:bg-black dark:border-gray-700 dark:text-white"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white "
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {passwordData.newPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-all duration-300",
                          level <= passwordStrength
                            ? level <= 2
                              ? "bg-red-500"
                              : level <= 4
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Password strength:{" "}
                    {passwordStrength <= 2
                      ? "Weak"
                      : passwordStrength <= 4
                      ? "Good"
                      : "Strong"}
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                loading={passwordLoading}
                className="w-full md:w-auto px-6 py-2"
              >
                <Key className="w-4 h-4 mr-2 " />
                Update Password
              </LoadingButton>
            </form>
          </motion.div>

          {/* Security Recommendations Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-100 dark:border-gray-900 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security Recommendations</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-black">Enable Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600 dark:text-black mt-1">
                    Add an extra layer of security to your account with 2FA.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-black">Use a Strong Password</h3>
                  <p className="text-sm text-gray-600 dark:text-black mt-1">
                    Include uppercase, lowercase, numbers, and special characters.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-black">Regular Security Reviews</h3>
                  <p className="text-sm text-gray-600 dark:text-black mt-1">
                    Review your account activity and update security settings regularly.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default SecurityPage 