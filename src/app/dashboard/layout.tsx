"use client"

import { DashboardSidebar } from "@/components/dashboard/Sidebar"
import { MobileNav } from "@/components/dashboard/MobileNav"
import GlobalBackground from "@/components/GlobalBackground"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-pink-500/30">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50 dark:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 dark:from-zinc-950 via-transparent to-transparent opacity-60 dark:opacity-80" />
      </div>

      <DashboardSidebar />
      <MobileNav />

      <main className="lg:pl-64 relative z-10 min-h-screen flex flex-col">
        {/* Top Header - Optional, for breadcrumbs or page title if needed */}
        {/* <header className="h-16 border-b border-zinc-800 flex items-center px-8 bg-black/50 backdrop-blur-sm lg:hidden">
            ...
        </header> */}
        
        <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-12 max-w-7xl w-full mx-auto">
            {children}
        </div>
      </main>
    </div>
  )
}
