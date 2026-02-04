"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { AlertCircle, Calendar, Monitor, Activity, RefreshCw, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loading } from "@/components/ui/Loading"

interface UserProfile {
  email: string
  lastLogin: string
  name?: string
  $createdAt?: string
  $id?: string
  prefs?: any
}

interface LoginSession {
  id: string
  loginTime: string
  logoutTime?: string
  duration?: string
  device: string
  location?: string
}

const HistoryPage = () => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [loginHistory, setLoginHistory] = useState<LoginSession[]>([])
  const [currentSession, setCurrentSession] = useState<LoginSession | null>(null)
  const router = useRouter()

  // Track current session
  useEffect(() => {
    if (isGuest || !user) return

    const sessionId = `session_${Date.now()}`
    const loginTime = new Date().toISOString()
    const device = navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'
    
    const newSession: LoginSession = {
      id: sessionId,
      loginTime,
      device,
      location: 'Unknown' // Could be enhanced with IP geolocation
    }

    setCurrentSession(newSession)

    // Wait 5 seconds before recording the session
    const timer = setTimeout(async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Create login history entry in Supabase
        const { data: historyEntry, error } = await supabase
          .from('login_history')
          .insert({
            user_id: user.id,
            timestamp: loginTime,
            device_type: device,
            location: 'Unknown'
          })
          .select()
          .single()

        if (error) {
          console.error('Failed to save login session:', error)
          return
        }

        // Fetch all login history for this user
        const { data: allHistory } = await supabase
          .from('login_history')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false })

        if (allHistory) {
          const formattedHistory = allHistory.map((entry: any) => ({
            id: entry.id,
            loginTime: entry.timestamp,
            logoutTime: entry.logout_time,
            duration: entry.session_duration ? `${entry.session_duration} minutes` : undefined,
            device: entry.device_type || 'Unknown',
            location: entry.location
          }))
          setLoginHistory(formattedHistory)
        }
      } catch (error) {
        console.error('Failed to save login session:', error)
      }
    }, 5000)

    // Cleanup on unmount
    return () => {
      clearTimeout(timer)
      if (currentSession) {
        handleLogout(currentSession)
      }
    }
  }, [user, isGuest])

  const handleLogout = async (session: LoginSession) => {
    try {
      const logoutTime = new Date().toISOString()
      const duration = new Date(logoutTime).getTime() - new Date(session.loginTime).getTime()
      const durationMinutes = Math.floor(duration / (1000 * 60))

      // Update session in Supabase
      const { error } = await supabase
        .from('login_history')
        .update({
          logout_time: logoutTime,
          session_duration: durationMinutes
        })
        .eq('id', session.id)

      if (error) throw error

      // Refresh login history
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: allHistory } = await supabase
          .from('login_history')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false })

        if (allHistory) {
          const formattedHistory = allHistory.map((entry: any) => ({
            id: entry.id,
            loginTime: entry.timestamp,
            logoutTime: entry.logout_time,
            duration: entry.session_duration ? `${entry.session_duration} minutes` : undefined,
            device: entry.device_type || 'Unknown',
            location: entry.location
          }))
          setLoginHistory(formattedHistory)
        }
      }
    } catch (error) {
      console.error('Failed to update logout time:', error)
    }
  }

  const fetchUser = async () => {
    setRefreshing(true)
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      
      if (user) {
        // If we have a real user, ensure guest mode is cleared
        localStorage.removeItem("guestSession")
        localStorage.removeItem("guestName")
        setIsGuest(false)

        setUser({
          email: user.email || '',
          name: user.user_metadata?.name || '',
          lastLogin: user.last_sign_in_at || new Date().toISOString(),
          $createdAt: user.created_at,
          $id: user.id,
          prefs: {}
        })
        
        // Load existing login history from Supabase
        const { data: history } = await supabase
          .from('login_history')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false })
        
        if (history) {
          const formattedHistory = history.map((entry: any) => ({
            id: entry.id,
            loginTime: entry.timestamp,
            logoutTime: entry.logout_time,
            duration: entry.session_duration ? `${entry.session_duration} minutes` : undefined,
            device: entry.device_type || 'Unknown',
            location: entry.location
          }))
          setLoginHistory(formattedHistory)
        }
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
        return
      }
    } catch (error) {
      console.error("Auth error:", error)
      router.push("/auth/login")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [router])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSessionDuration = (session: LoginSession) => {
    if (session.duration) return session.duration
    
    const endTime = session.logoutTime || new Date().toISOString()
    const duration = new Date(endTime).getTime() - new Date(session.loginTime).getTime()
    const minutes = Math.floor(duration / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  if (loading) {
    return <Loading message="Loading your activity history..." />
  }

  // Brutalist Loading Button
  const LoadingButton = ({ children, loading, onClick, className }: any) => (
    <Button
      onClick={onClick}
      disabled={loading}
      className={cn(
        "relative overflow-hidden bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-none border-2 border-transparent transition-all duration-200 font-bold uppercase tracking-wider h-10 px-6",
        className
      )}
    >
      <motion.span
        animate={{ opacity: loading ? 0.7 : 1 }}
        className="flex items-center gap-2"
      >
        {children}
      </motion.span>
    </Button>
  )

  const LogEntry = ({ session, index }: { session: any, index: number }) => (
    <div className="group border-b border-zinc-100 dark:border-zinc-900 font-mono text-xs sm:text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
      <div className="grid grid-cols-12 gap-2 p-3 items-center">
        {/* Timestamp */}
        <div className="col-span-12 sm:col-span-4 lg:col-span-3 text-zinc-400 dark:text-zinc-500 font-bold">
           <span className="text-pink-600 dark:text-pink-500 mr-2">[{index.toString().padStart(3, '0')}]</span>
           {formatDate(session.loginTime)}
        </div>

        {/* Device & Location */}
        <div className="col-span-6 sm:col-span-4 lg:col-span-4 text-zinc-600 dark:text-zinc-300 uppercase truncate">
           <span className="text-zinc-400 dark:text-zinc-600 mr-2 font-bold">SYS::</span>{session.device}
        </div>

        {/* Duration */}
        <div className="col-span-6 sm:col-span-2 lg:col-span-3 text-zinc-400 dark:text-zinc-500 text-right sm:text-left">
           {session.logoutTime ? (
             <span>{getSessionDuration(session)}</span>
           ) : (
             <span className="text-emerald-600 dark:text-emerald-500 animate-pulse font-bold">--:--:--</span>
           )}
        </div>

        {/* Status */}
        <div className="col-span-12 sm:col-span-2 text-right">
           {!session.logoutTime ? (
             <span className="bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
               LIVE
             </span>
           ) : (
             <span className="text-zinc-300 dark:text-zinc-700 text-[10px] uppercase tracking-wider font-bold">
               TERMINATED
             </span>
           )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 font-mono text-zinc-600 dark:text-zinc-300 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-6 transition-colors">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-600 dark:text-emerald-500 uppercase tracking-widest font-bold">System Audit Log</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-boldonse text-zinc-900 dark:text-white uppercase tracking-tight">
              Activity <span className="text-zinc-400 dark:text-zinc-600">History</span>
           </h1>
           <p className="text-zinc-500 mt-2 max-w-xl">
             Comprehensive log of all authentication events and active sessions.
           </p>
        </div>
        
        <LoadingButton
          loading={refreshing}
          onClick={fetchUser}
          className="shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]"
        >
          <motion.div
            animate={{ rotate: refreshing ? 360 : 0 }}
            transition={{ 
              duration: 1, 
              repeat: refreshing ? Infinity : 0,
              ease: "linear"
            }}
          >
            <RefreshCw className="w-4 h-4" />
          </motion.div>
          Sync Logs
        </LoadingButton>
      </div>

      {isGuest ? (
        <div className="border border-amber-500/20 dark:border-amber-500/30 bg-amber-500/5 p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px] transition-colors">
           <AlertCircle className="w-12 h-12 text-amber-600 dark:text-amber-500 mb-2" />
           <h3 className="text-amber-600 dark:text-amber-500 font-boldonse text-2xl uppercase tracking-widest">Access Restricted</h3>
           <p className="text-amber-700/80 dark:text-amber-500/80 font-mono text-sm max-w-md">
             Audit logs are classified information. Guest clearance level is insufficient for viewing historical data.
           </p>
           <Button
             onClick={() => router.push('/auth/signup')}
             className="mt-4 bg-amber-600 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-black rounded-none font-bold uppercase tracking-wider h-12 px-8 shadow-md"
           >
             Initialize Account
             <ArrowRight className="w-4 h-4 ml-2" />
           </Button>
        </div>
      ) : (
        <div className="space-y-12">
           
           {/* Stats Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors shadow-sm">
                 <div className="absolute top-0 right-0 p-2 opacity-5 dark:opacity-20 group-hover:opacity-10 dark:group-hover:opacity-50 transition-opacity">
                    <Activity className="w-16 h-16 text-emerald-500" />
                 </div>
                 <div className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2 font-bold">Active Sessions</div>
                 <div className="text-4xl font-boldonse text-zinc-900 dark:text-white transition-colors">{currentSession ? 1 : 0}</div>
                 <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-500 uppercase font-bold">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    System Online
                 </div>
              </div>

              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 relative overflow-hidden group hover:border-pink-500/50 transition-colors shadow-sm">
                 <div className="absolute top-0 right-0 p-2 opacity-5 dark:opacity-20 group-hover:opacity-10 dark:group-hover:opacity-50 transition-opacity">
                    <Calendar className="w-16 h-16 text-pink-500" />
                 </div>
                 <div className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2 font-bold">Retention Period</div>
                 <div className="text-4xl font-boldonse text-zinc-900 dark:text-white transition-colors">
                    {user?.$createdAt ? Math.floor((Date.now() - new Date(user.$createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                    <span className="text-lg text-zinc-400 dark:text-zinc-600 ml-1">DAYS</span>
                 </div>
                 <div className="mt-4 text-[10px] text-zinc-400 dark:text-zinc-600 uppercase border-t border-zinc-100 dark:border-zinc-900 pt-2 transition-colors">
                    Since: {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString() : "N/A"}
                 </div>
              </div>

              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 relative overflow-hidden group hover:border-zinc-400 dark:hover:border-white/50 transition-colors shadow-sm">
                 <div className="absolute top-0 right-0 p-2 opacity-5 dark:opacity-20 group-hover:opacity-10 dark:group-hover:opacity-50 transition-opacity">
                    <Monitor className="w-16 h-16 text-zinc-900 dark:text-white" />
                 </div>
                 <div className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2 font-bold">Total Events</div>
                 <div className="text-4xl font-boldonse text-zinc-900 dark:text-white transition-colors">{loginHistory.length}</div>
                 <div className="mt-4 text-[10px] text-zinc-400 dark:text-zinc-600 uppercase border-t border-zinc-100 dark:border-zinc-900 pt-2 transition-colors">
                    Log Integrity: Verified
                 </div>
              </div>
           </div>

           {/* Log Terminal */}
           <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black shadow-2xl transition-colors">
              {/* Terminal Header */}
              <div className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-2 flex items-center justify-between transition-colors">
                 <div className="flex items-center gap-2 px-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                 </div>
                 <div className="text-[10px] sm:text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase font-bold">
                    /var/log/auth.log • {user?.email}
                 </div>
              </div>

              {/* Log Content */}
              <div className="p-0">
                 {/* Table Header */}
                 <div className="grid grid-cols-12 gap-2 p-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold transition-colors">
                    <div className="col-span-12 sm:col-span-4 lg:col-span-3">Timestamp</div>
                    <div className="col-span-6 sm:col-span-4 lg:col-span-4 truncate">Device Hash</div>
                    <div className="col-span-6 sm:col-span-2 lg:col-span-3 text-right sm:text-left">Duration</div>
                    <div className="col-span-12 sm:col-span-2 text-right">State</div>
                 </div>

                 {loginHistory.length === 0 ? (
                    <div className="p-12 text-center text-zinc-400 dark:text-zinc-600 font-mono text-sm">
                       <p>{'>'} NO_LOGS_FOUND</p>
                       <p className="mt-2 text-xs opacity-50">Waiting for system events...</p>
                    </div>
                 ) : (
                    <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                       {loginHistory.slice().reverse().map((session, i) => (
                          <LogEntry key={session.id} session={session} index={loginHistory.length - i} />
                       ))}
                    </div>
                 )}
              </div>
              
              {/* Terminal Footer */}
              <div className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-2 px-4 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 flex justify-between transition-colors">
                 <span className="font-bold">END_OF_FILE</span>
                 <span className="animate-pulse">_</span>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}

export default HistoryPage