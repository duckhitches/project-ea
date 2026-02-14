"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Shield, AlertCircle, Lock, Key, Eye, EyeOff, CheckCircle, ArrowRight, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loading } from "@/components/ui/Loading"
import { Skeleton } from "@/components/ui/skeleton"

export default function SecurityPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)
  
  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1. Check for guest session first
        const guestSession = localStorage.getItem("guestSession")
        if (guestSession === "true") {
          setIsGuest(true)
          setLoading(false)
          return
        }

        // 2. Try real authentication
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (user) {
          // If we have a real user, ensure guest mode is cleared
          localStorage.removeItem("guestSession")
          localStorage.removeItem("guestName")
          setIsGuest(false)
          setUser(user)
          setLoading(false)
          return
        }

        // 3. No session found
        router.push("/auth/login")
      } catch (error) {
        console.error("Auth error:", error)
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setMessageType("")

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("Passwords do not match")
      setMessageType("error")
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters")
      setMessageType("error")
      return
    }

    setPasswordLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: passwordData.newPassword })
      if (error) throw error
      setMessage("Credentials updated successfully.")
      setMessageType("success")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (e: any) {
      setMessage(e.message || "Update failed")
      setMessageType("error")
    } finally {
      setPasswordLoading(false)
    }
  }

  const getStrength = (pass: string) => {
    let s = 0
    if (pass.length > 5) s++
    if (pass.length > 8) s++
    if (/[A-Z]/.test(pass)) s++
    if (/[0-9]/.test(pass)) s++
    if (/[^A-Za-z0-9]/.test(pass)) s++
    return s
  }

  const strength = getStrength(passwordData.newPassword)

  if (loading) {
     return <Loading message="FETCHING_SECURITY_PROTOCOLS" fullScreen={false} />
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl font-mono text-zinc-600 dark:text-zinc-300">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4 sm:pb-6 transition-colors">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-sm border border-emerald-500/20 shrink-0">
             <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-500" aria-hidden />
          </div>
          <h1 className="text-xl sm:text-2xl font-boldonse uppercase tracking-widest text-zinc-900 dark:text-white transition-colors leading-tight">
            Security Console
          </h1>
        </div>
        <p className="text-zinc-400 dark:text-zinc-500 font-mono text-xs sm:text-sm pl-0 sm:pl-[3.25rem] leading-snug">
          Manage access credentials and encryption protocols.
        </p>
      </div>

      {isGuest ? (
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-red-500/5 border-2 border-red-500/20 dark:border-red-500/30 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 relative overflow-hidden group transition-colors"
        >
          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] dark:bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none" />
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-red-500" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-red-500" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-500" />

          <div className="flex items-start gap-4 flex-1 relative z-10">
            <div className="p-3 bg-red-500/10 border border-red-500/10 dark:border-red-500/20 group-hover:bg-red-500/20 transition-colors duration-500">
              <Terminal className="h-6 w-6 text-red-600 dark:text-red-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-red-600 dark:text-red-500 font-boldonse uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="animate-pulse">{'>>'}</span> Security Protocol Restricted
              </h3>
              <p className="text-red-700/70 dark:text-red-500/70 font-mono text-xs max-w-2xl leading-relaxed">
                Guest accounts are restricted from modifying system security parameters. 
                Initialize a full account to establish permanent credentials and biometric access.
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => router.push('/auth/signup')}
            className="group/btn relative min-h-[48px] bg-red-600 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-400 text-white dark:text-black rounded-none border-2 border-zinc-900 dark:border-black font-bold uppercase tracking-wider h-12 px-6 sm:px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm sm:text-base"
          >
            <span>Initialize Account</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      ) : (
        <>
            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 font-bold">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 rounded-none flex flex-col gap-2 shadow-sm transition-colors">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500">Encryption Status</span>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-mono text-sm uppercase">
                        <CheckCircle className="w-4 h-4" />
                        AES-256 Active
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 rounded-none flex flex-col gap-2 shadow-sm transition-colors">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500">Email Verification</span>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-mono text-sm uppercase">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 rounded-none flex flex-col gap-2 shadow-sm transition-colors">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500">Two-Factor Auth</span>
                     <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-mono text-sm uppercase">
                        <AlertCircle className="w-4 h-4" />
                        Disabled
                    </div>
                </div>
            </div>

            {/* Password Update Form */}
            <div className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-none p-4 sm:p-6 lg:p-8 shadow-sm transition-colors">
                 <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-boldonse uppercase bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 dark:from-white to-zinc-500 transition-colors leading-tight">Credential Update</h3>
                    <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-1 leading-snug">Modify your system access password.</p>
                 </div>

                 <form onSubmit={handlePasswordUpdate} className="space-y-6 max-w-lg">
                    {/* New Password */}
                    <div className="space-y-2">
                        <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">New Password</Label>
                        <div className="relative">
                            <Input 
                                type={showNew ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                className="bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-mono placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors h-11 rounded-none"
                                placeholder="ENTER_NEW_PASSWORD"
                            />
                             <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center -my-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                aria-label={showNew ? "Hide password" : "Show password"}
                            >
                                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                         {/* Strength Bar */}
                         <div className="flex gap-1 h-0.5 mt-2">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className={cn("flex-1 transition-colors duration-300", 
                                    i <= strength ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-800"
                                )} />
                            ))}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                         <Label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">Confirm Password</Label>
                        <Input 
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            className="bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-mono placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors h-11 rounded-none"
                            placeholder="CONFIRM_PASSWORD"
                        />
                    </div>

                     {/* Message */}
                     <AnimatePresence>
                        {message && (
                            <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:"auto"}} exit={{opacity:0, height:0}}>
                                 <Alert variant={messageType === "success" ? "default" : "destructive"} className={cn("font-mono text-xs sm:text-sm border rounded-none transition-colors leading-snug", messageType === "success" ? "border-emerald-500 text-emerald-700 dark:text-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10" : "border-red-500 text-red-700 dark:text-red-500 bg-red-500/5 dark:bg-red-500/10")}>
                                    <AlertDescription className="font-bold">
                                        {messageType === "success" ? "SUCCESS: " : "ERROR: "} {message}
                                    </AlertDescription>
                                 </Alert>
                            </motion.div>
                        )}
                     </AnimatePresence>

                    <div className="pt-4">
                         <Button
                            type="submit"
                            disabled={passwordLoading}
                            className="min-h-[48px] bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider rounded-none h-11 px-6 sm:px-8 w-full sm:w-auto shadow-md transition-all"
                        >
                            {passwordLoading ? "PROCESSING..." : "UPDATE CREDENTIALS"}
                         </Button>
                    </div>
                 </form>
            </div>
        </>
      )}
    </div>
  )
} 