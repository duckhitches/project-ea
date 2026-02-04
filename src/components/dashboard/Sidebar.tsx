"use client"

import { SidebarContent } from "./SidebarContent"

export function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-200 dark:border-zinc-800 flex flex-col hidden lg:flex font-mono">
      <SidebarContent />
    </aside>
  )
}
