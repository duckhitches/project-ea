"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContent } from "./SidebarContent"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import ThemeToggle from "@/components/ui/ThemeToggle"

export function MobileNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    // Close sheet when path changes
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <div className="lg:hidden h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 bg-white dark:bg-zinc-950 sticky top-0 z-40">
            <div className="flex items-center">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 w-64">
                         <SidebarContent />
                    </SheetContent>
                </Sheet>
                <span className="ml-4 font-boldonse tracking-widest text-sm text-zinc-900 dark:text-white">NOQWIT.AI</span>
            </div>
            
            <div className="scale-75">
                <ThemeToggle />
            </div>
        </div>
    )
}
