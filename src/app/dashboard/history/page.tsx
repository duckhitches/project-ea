"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Clock, AlertCircle, Calendar, MapPin, Monitor, Activity, RefreshCw, ArrowRight, LogIn, LogOut } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
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

  const LoadingButton = ({ children, loading, onClick, className }: any) => (
    <Button
      onClick={onClick}
      disabled={loading}
      className={cn(
        "relative overflow-hidden bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-900 text-white dark:text-black rounded-full transition-all duration-200",
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black  dark:bg-white flex items-center justify-center">
            <Clock className="w-5 h-5 text-white dark:text-black" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Activity History</h1>
        </div>
        
        <LoadingButton
          loading={refreshing}
          onClick={fetchUser}
          className="px-4 py-2 text-sm"
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
          Refresh Data
        </LoadingButton>
      </motion.div>

      {isGuest ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert className="bg-amber-50 border border-amber-100 rounded-xl">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Login history is only available for registered users.
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <LoadingButton
              onClick={() => router.push('/auth/signup')}
              className="px-6 py-2"
            >
              Sign up now
              <ArrowRight className="w-4 h-4 ml-2" />
            </LoadingButton>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Current Session */}
          <Card className="overflow-hidden border-0 shadow-sm dark:bg-black dark:border-gray-900 dark:border-0">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Current Session</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">User</div>
                  <div className="font-medium text-gray-900">{user?.name || user?.email}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    Active Now
                  </Badge>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Session Started</div>
                  <div className="font-medium text-gray-900">
                    {currentSession ? formatDate(currentSession.loginTime) : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Login History */}
          <Card className="overflow-hidden border-0 shadow-sm dark:bg-black dark:border-gray-900 dark:border-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Login History</h2>
                </div>
                <Badge variant="outline" className="text-sm">
                  {loginHistory.length} sessions
                </Badge>
              </div>
              
              {loginHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500 ">
                  <LogIn className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No login sessions recorded yet.</p>
                  <p className="text-sm">Your sessions will appear here after staying logged in for 5+ seconds.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {loginHistory.slice().reverse().map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                          <LogIn className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {formatDate(session.loginTime)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {session.device} • {getSessionDuration(session)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {session.logoutTime ? (
                          <Badge variant="outline" className="text-xs dark:bg-gray-800 dark:text-white">
                            Completed
                          </Badge>
                        ) : (
                          <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Activity Summary */}
          <Card className="overflow-hidden border-0 shadow-sm dark:bg-black dark:border-gray-900 dark:border-0 ">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Monitor className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Summary</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {currentSession ? 1 : 0}
                  </div>
                  <div className="text-sm text-gray-600">Active Sessions</div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {user?.$createdAt ? Math.floor((Date.now() - new Date(user.$createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                  </div>
                  <div className="text-sm text-gray-600">Days as Member</div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{loginHistory.length}</div>
                  <div className="text-sm text-gray-600">Total Sessions</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Account Created</span>
                </div>
                <p className="text-sm text-gray-600">
                  {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : "N/A"}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default HistoryPage