"use client"

import type React from "react"
import { useState } from "react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, ArrowRight, Check, AlertCircle, Eye, EyeOff, CheckCircle, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { StickyBanner } from "@/components/ui/sticky-banner"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [bannerMessage, setBannerMessage] = useState("Check mail to verify & unlock access.")
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!isSupabaseConfigured()) {
      setError("Sign-up is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.")
      return
    }
    setLoading(true)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: name } },
      })

      if (signUpError) throw signUpError

      if (data.user) {
        if (name) {
          await supabase.from('user_profiles').upsert({ id: data.user.id, name: name })
        }

        // Clear guest session data on successful signup
        localStorage.removeItem("guestSession")
        localStorage.removeItem("guestName")

        setSignupSuccess(true)
        setBannerMessage("Check mail to verify & unlock access.")
      } else {
        throw new Error("Failed to create account")
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      const message = error?.message === "Missing Supabase environment variables"
        ? "Sign-up is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
        : (error?.message || "An error occurred during signup")
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: any) {
      setError(error.message || "GitHub login failed")
      setLoading(false)
    }
  }

  const handleGuestLogin = async () => {
    setLoading(true)
    try {
      if (isSupabaseConfigured()) {
        try { await supabase.auth.signOut() } catch (e) {}
      }
      localStorage.setItem("guestSession", "true")
      localStorage.setItem("guestName", "Guest User")
      window.location.href = "/dashboard"
    } catch (error: any) {
      setError(error.message || "Guest login failed")
    } finally {
      setLoading(false)
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(password)
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500", "bg-emerald-600"]
  const strengthLabels = ["Critical", "Weak", "Moderate", "Strong", "Secure"]

  return (
    <div className={cn("min-h-screen flex bg-zinc-50 dark:bg-zinc-950 font-sans transition-all", bannerMessage ? "pt-14" : "")}>
      {bannerMessage && (
        <StickyBanner 
          className="bg-black/80 text-emerald-400 border-b border-emerald-500/20 backdrop-blur-xl" 
          hideOnScroll
        >
          <div className="flex items-center gap-3 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>{bannerMessage}</span>
          </div>
        </StickyBanner>
      )}

      {/* Left Side - Technical Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 border-r border-zinc-800 relative flex-col justify-between p-12 overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

        {/* Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors gap-2 group font-mono text-sm uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return Home</span>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-lg">
          <div className="inline-block px-3 py-1 mb-6 border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-mono uppercase tracking-widest rounded-sm">
            New Registration
          </div>
          <h1 className="text-4xl xl:text-5xl font-boldonse text-white tracking-widest uppercase mb-6">
            Begin Your <br />
            Optimization <span className="text-zinc-600">Journey</span>
          </h1>
          <div className="space-y-4 font-light text-zinc-400">
             {[
                "Deploy AI-driven analysis modules.",
                "Access secure, private training environment.",
                "Track performance metrics in real-time."
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-emerald-500 rounded-none" />
                    <span>{text}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex justify-between items-end border-t border-zinc-800 pt-8">
           <div className="flex flex-col gap-1">
             <span className="text-zinc-600 text-xs font-mono uppercase">Encryption</span>
             <span className="text-zinc-400 text-xs font-mono uppercase">AES-256 Enabled</span>
           </div>
           <div className="text-zinc-600 text-xs font-mono">Secure Connection</div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative bg-white dark:bg-zinc-950">
        <div className="w-full max-w-sm">
           {/* Mobile Back */}
            <div className="lg:hidden mb-10">
                <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors gap-2 font-mono text-xs uppercase tracking-wider">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return</span>
                </Link>
            </div>

            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-boldonse uppercase tracking-wider text-black dark:text-white mb-2">Create Profile</h2>
              <p className="text-zinc-500 font-mono text-xs">Initialize your candidate workspace.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                        "h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-sans pl-4",
                        focusedField === 'name' && "border-emerald-500"
                    )}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                        "h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-sans pl-4",
                        focusedField === 'email' && "border-emerald-500"
                    )}
                    placeholder="name@example.com"
                    required
                  />
                  <AnimatePresence>
                     {email && email.includes('@') && (
                        <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="absolute right-4 top-1/2 -translate-y-1/2">
                             <Check className="w-4 h-4 text-emerald-500" />
                        </motion.div>
                     )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                   className={cn(
                        "h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-sans pl-4 pr-12",
                        focusedField === 'password' && "border-emerald-500"
                    )}
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Technical Strength Meter */}
                {password && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-1 pt-1">
                    <div className="flex gap-1 h-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            "flex-1 transition-all duration-300 rounded-sm",
                            level <= passwordStrength ? strengthColors[passwordStrength - 1] : "bg-zinc-100 dark:bg-zinc-800"
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] font-mono uppercase text-zinc-400">
                        <span>Complexity</span>
                        <span className={cn("transition-colors", passwordStrength > 0 ? "text-black dark:text-white" : "")}>
                            {strengthLabels[passwordStrength - 1] || "None"}
                        </span>
                    </div>
                  </motion.div>
                )}
              </div>

               {/* Error Message */}
               <AnimatePresence>
                    {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                            <Alert variant="destructive" className="bg-red-500/5 border-red-500/20 text-red-500 font-mono text-xs">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

              <div className="space-y-3 pt-2">
                 <Button 
                    type="submit" 
                    disabled={loading || signupSuccess}
                    className="w-full h-12 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-md font-medium text-sm transition-all shadow-sm"
                 >
                    {loading ? (
                         <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                        </div>
                    ) : (
                        "Create Profile"
                    )}
                </Button>

                <Button 
                    type="button" 
                    onClick={handleGuestLogin}
                    disabled={loading}
                    variant="outline"
                    className="w-full h-12 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-md font-mono text-xs uppercase tracking-wide"
                >
                    <User className="w-4 h-4 mr-2" />
                    Guest Access
                </Button>

                <Button 
                    type="button" 
                    onClick={handleGithubLogin}
                    disabled={loading}
                    variant="outline"
                    className="w-full h-12 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-md font-mono text-xs uppercase tracking-wide"
                >
                    <Github className="w-4 h-4 mr-2" />
                    Continue with GitHub
                </Button>
              </div>

              <div className="pt-8 flex flex-col items-center gap-4 border-t border-zinc-100 dark:border-zinc-900">
                  <p className="text-zinc-500 text-sm">
                    {signupSuccess ? (
                        <span>Verification pending. <Link href="/auth/login" className="text-emerald-500 hover:underline font-medium">Proceed to Login</Link></span>
                    ) : (
                        <span>Already registered? <Link href="/auth/login" className="text-emerald-500 hover:underline font-medium">Login Required</Link></span>
                    )}
                  </p>
                    <div className="flex gap-4 text-xs text-zinc-400 font-mono">
                         <Link href="/terms" className="hover:text-zinc-600 dark:hover:text-zinc-300">Terms</Link>
                         <span>•</span>
                         <Link href="/privacy" className="hover:text-zinc-600 dark:hover:text-zinc-300">Privacy</Link>
                    </div>
              </div>

            </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
