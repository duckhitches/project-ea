"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { supabase, getInterviewSessions, isSupabaseConfigured } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Monitor, 
  History, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Calendar 
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

function getTimeAgo(dateString: string | undefined | null) {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + " years ago"
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + " months ago"
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + " days ago"
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + " hours ago"
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + " minutes ago"
  return Math.floor(seconds) + " seconds ago"
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    lastSession: "N/A",
    lastSessionId: null as string | null
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Check for guest session first
        const guestSession = localStorage.getItem("guestSession")
        if (guestSession === "true") {
          setUser({
            user_metadata: {
              name: localStorage.getItem("guestName") || "Guest User"
            }
          })
          setLoading(false)
          return
        }

        // 2. Only hit Supabase when configured
        if (!isSupabaseConfigured()) {
          setLoading(false)
          return
        }

        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser(user)

          // Fetch real stats from interview_sessions (Supabase)
          const sessions = await getInterviewSessions(user.id)

          const totalInterviews = sessions.length

          const scores = sessions
            .map((s) => s.score)
            .filter((s) => s !== null && s !== undefined)
            .map((s) => Number(s))
          const averageScore =
            scores.length > 0
              ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
              : 0

          const latest = sessions[0]
          const lastSessionDate = latest
            ? latest.completed_at || latest.created_at || latest.started_at
            : null
          const lastSession = getTimeAgo(lastSessionDate ?? undefined)
          const lastSessionId = latest?.id ?? null

          setStats({
            totalInterviews,
            averageScore,
            lastSession,
            lastSessionId
          })
        }
      } catch (e) {
        console.error("Dashboard auth error:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 sm:h-32 bg-zinc-900/50 rounded-sm" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-2xl sm:text-3xl font-boldonse uppercase tracking-widest text-zinc-900 dark:text-white leading-tight">
          Command Center
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-mono text-xs sm:text-sm leading-snug">
          Welcome back, <span className="text-zinc-900 dark:text-white">{user?.user_metadata?.name || "Candidate"}</span>. System ready.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 sm:p-6 pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Total Sessions
            </CardTitle>
            <Monitor className="h-4 w-4 text-pink-500 shrink-0" aria-hidden />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-boldonse">{stats.totalInterviews}</div>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono mt-1 leading-snug">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 sm:p-6 pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Avg. Performance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-boldonse">{stats.averageScore}%</div>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono mt-1 leading-snug">Top 10% of candidates</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 sm:p-6 pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Last Active
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500 shrink-0" aria-hidden />
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-lg sm:text-xl font-boldonse truncate">{stats.lastSession}</div>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono mt-1 leading-snug">
              {stats.lastSessionId ? `Session ${stats.lastSessionId.slice(0, 8)}…` : "No sessions yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <div className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-sm flex flex-col justify-between group hover:border-pink-500/50 transition-colors">
          <div>
            <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-sm flex items-center justify-center mb-3 sm:mb-4 text-pink-500">
              <Monitor className="w-5 h-5" aria-hidden />
            </div>
            <h3 className="text-lg sm:text-xl font-boldonse uppercase tracking-wide mb-2 text-zinc-900 dark:text-white leading-tight">Start New Interview</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-mono leading-relaxed mb-4 sm:mb-6">
              Initialize a new AI-driven mock interview session. Configure parameters and begin simulation.
            </p>
          </div>
          <Link href="/dashboard/ai-interview">
            <Button className="w-full min-h-[48px] bg-pink-600 hover:bg-pink-700 text-white rounded-sm font-mono text-xs sm:text-sm uppercase tracking-wider h-11">
              Initialize Session <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
            </Button>
          </Link>
        </div>

        <div className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-sm flex flex-col justify-between group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
          <div>
            <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-sm flex items-center justify-center mb-3 sm:mb-4 text-zinc-600 dark:text-zinc-400">
              <History className="w-5 h-5" aria-hidden />
            </div>
            <h3 className="text-lg sm:text-xl font-boldonse uppercase tracking-wide mb-2 text-zinc-900 dark:text-white leading-tight">Review History</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-mono leading-relaxed mb-4 sm:mb-6">
              Access logs of previous sessions, performance metrics, and detailed feedback reports.
            </p>
          </div>
          <Link href="/dashboard/history">
            <Button variant="outline" className="w-full min-h-[48px] border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-sm font-mono text-xs sm:text-sm uppercase tracking-wider h-11">
              Access Logs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
