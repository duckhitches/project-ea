"use client"

import type React from "react"
import { useState } from "react"
import { account, ID } from "@/lib/appwrite"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, User, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // First, delete all existing sessions
      try {
        await account.deleteSession("current")
      } catch (error) {
        console.log("No sessions to delete or error deleting sessions:", error)
      }

      // Create new session
      const session = await account.createEmailSession(email, password)

      if (session) {
        // Record login history
        try {
          await fetch("/api/users/history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ipAddress: "client_ip",
              userAgent: navigator.userAgent,
            }),
          })
        } catch (error) {
          console.error("Error recording login history:", error)
        }

        // Force a hard navigation to dashboard
        window.location.href = "/dashboard"
      } else {
        throw new Error("Failed to create session")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  const handleGuestLogin = async () => {
    setLoading(true)
    try {
      // Delete any existing sessions
      try {
        await account.deleteSession("current")
      } catch (error) {
        console.log("No sessions to delete or error deleting sessions:", error)
      }

      // Create a guest session in localStorage
      localStorage.setItem("guestSession", "true")
      localStorage.setItem("guestName", "Guest User")

      // Navigate to dashboard
      window.location.href = "/dashboard"
    } catch (error: any) {
      console.error("Guest login error:", error)
      setError(error.message || "An error occurred during guest login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Clean Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12 xl:p-16">
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">Home</span>
            </Link>
          </div>

          <div className="space-y-8 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl xl:text-6xl font-light text-white leading-tight tracking-tight">
                Welcome
                <span className="block text-3xl xl:text-4xl bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mt-2">
                  to AI Interview
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              {[
                "AI-powered interview preparation",
                "Real-time feedback and analysis",
                "Track your improvement journey"
              ].map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3 text-gray-300"
                >
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <span className="text-lg">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="text-gray-500 text-xs">
            <p>&copy; 2024 AI Interview. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-white lg:bg-gray-50 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md lg:max-w-sm"
        >
          {/* Mobile Back Button */}
          <div className="lg:hidden mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">Back</span>
            </Link>
          </div>

          {/* Form Container */}
          <div className="bg-white lg:bg-transparent lg:p-0 p-8 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label 
                  htmlFor="email" 
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "h-12 px-4 bg-white border transition-all duration-200",
                      focusedField === 'email' 
                        ? "border-gray-900 shadow-sm" 
                        : "border-gray-200"
                    )}
                    required
                  />
                  <AnimatePresence>
                    {email && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label 
                    htmlFor="password" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={cn(
                    "h-12 px-4 bg-white border transition-all duration-200",
                    focusedField === 'password' 
                      ? "border-gray-900 shadow-sm" 
                      : "border-gray-200"
                  )}
                  required
                />
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Alert className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-800 text-sm">
                        {error}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="relative w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-300 overflow-hidden group"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {/* Custom loading animation */}
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-white rounded-full"
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
                      className="flex items-center justify-center"
                    >
                      Sign in
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white lg:bg-gray-50 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Guest Login */}
            <Button
              type="button"
              onClick={handleGuestLogin}
              disabled={loading}
              variant="outline"
              className="w-full h-12 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all duration-200"
            >
              <User className="w-4 h-4 mr-2" />
              Continue as Guest
            </Button>

            {/* Sign up link */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link 
                href="/auth/signup" 
                className="font-medium text-gray-900 hover:text-gray-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login