"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { 
  Monitor, 
  History, 
  User, 
  Shield, 
  LogOut, 
  LayoutDashboard,
  Terminal
} from "lucide-react"
import ThemeToggle from "@/components/ui/ThemeToggle"

const menuItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Interview",
    href: "/dashboard/ai-interview",
    icon: Monitor,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Security",
    href: "/dashboard/security",
    icon: Shield,
  },
]

export function SidebarContent() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
      router.push('/')
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
      {/* Header - Desktop Only */}
      <div className="h-14 sm:h-16 hidden lg:flex items-center justify-between px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
          <Terminal className="w-5 h-5 text-pink-500 shrink-0" aria-hidden />
          <span className="font-boldonse tracking-widest text-base sm:text-lg">NOQWIT.AI</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 sm:py-6 px-3 sm:px-4 space-y-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3 sm:mb-4 px-2">
            <div className="text-xs font-mono text-zinc-600 dark:text-zinc-500 uppercase tracking-wider">
                System Modules
            </div>
            <div className="hidden lg:block scale-75 origin-right">
                <ThemeToggle />
            </div>
        </div>
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 min-h-[44px] text-xs sm:text-sm font-mono uppercase tracking-wide rounded-sm transition-all duration-200 group border border-transparent",
                isActive 
                  ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" 
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50"
              )}
            >
              <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-pink-500" : "text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-400")} aria-hidden />
              {item.title}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)] shrink-0" aria-hidden />
              )}
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
        <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] text-xs sm:text-sm font-mono uppercase tracking-wide text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/5 dark:hover:bg-red-500/10 rounded-sm transition-colors text-left"
        >
            <LogOut className="w-4 h-4 shrink-0" aria-hidden />
            Disconnect
        </button>
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-zinc-200 dark:border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-400 dark:text-zinc-600 uppercase leading-snug">
            <span>v2.4.0-stable</span>
            <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Online
            </span>
        </div>
      </div>
    </div>
  )
}
