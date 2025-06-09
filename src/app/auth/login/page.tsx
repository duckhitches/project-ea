"use client"

import type React from "react"

import { useState } from "react"
import { account, ID } from "@/lib/appwrite"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Sparkles, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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

      // Create new session - using createEmailSession (the correct method name for your SDK version)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col lg:flex-row">
      {/* Left Side - Branding with Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Image Background with Gradient Overlay */}
        <div className="absolute inset-0">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />

          {/* Image overlay */}
          <img
            src="/login-page.jpg"
            alt="Professional working environment"
            className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay"
          />

          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 mix-blend-multiply"></div>

          {/* Final overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <div className="relative z-10 p-8 xl:p-12 flex flex-col justify-between h-full">
          <div>
            <Link href="/" className="inline-flex items-center text-white hover:text-gray-200 transition-colors mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="space-y-6">
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                Welcome Back to
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  AI Interview
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Continue your journey to interview success with our AI-powered platform
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Sparkles, text: "AI-Powered Feedback" },
                { icon: Shield, text: "Secure & Private" },
                { icon: Zap, text: "Instant Results" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-white">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span className="text-blue-100">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Back Button */}
          <div className="lg:hidden">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue your interview preparation</p>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-gray-900">Sign In</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-center text-sm text-gray-500 italic">Too lazy to sign up?</p>
                <Button
                  type="button"
                  onClick={handleGuestLogin}
                  disabled={loading}
                  variant="outline"
                  className="w-full h-12 border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all duration-200"
                >
                  <User className="w-4 h-4 mr-2" />
                  {loading ? "Signing in..." : "Continue as Guest"}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features for Mobile */}
          <div className="lg:hidden grid grid-cols-3 gap-4 pt-6">
            {[
              { icon: Sparkles, text: "AI Feedback" },
              { icon: Shield, text: "Secure" },
              { icon: Zap, text: "Fast Results" },
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
