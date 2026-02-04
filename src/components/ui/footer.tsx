"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconHeart } from "@tabler/icons-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About", href: "/" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/contact" },
        { name: "Documentation", href: "/docs" },
        { name: "Status", href: "/status" },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black font-mono text-sm" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" suppressHydrationWarning>
          {/* Brand Section */}
          <div className="space-y-4" suppressHydrationWarning>
            <h3 className="text-md font-bold text-black dark:text-white flex items-center gap-2 uppercase tracking-tight">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
              System Online
            </h3>
            <div className="flex items-center gap-2">
               <Image src="/brand-logo.png" width={32} height={32} className="w-8 h-8 rounded-none border border-gray-300 dark:border-gray-700 p-1 object-contain bg-black" alt="Logo" />
               <span className="font-bold">The Boring Interview</span>
            </div>
            <p className="text-xs text-pink-500/80 font-mono">
              {'//'} Version 2.4.0-stable<br/>
              {'//'} AI-powered interview optimization protocol initiated.
            </p>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4" suppressHydrationWarning>
              <h3 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-600 tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2" suppressHydrationWarning>
                {section.links.map((link) => (
                  <li key={link.name} suppressHydrationWarning>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline decoration-pink-500 underline-offset-4 transition-all"
                      suppressHydrationWarning
                    >
                      {`> ${link.name}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800" suppressHydrationWarning>
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0" suppressHydrationWarning>
            <p className="text-xs text-gray-500 dark:text-gray-500" suppressHydrationWarning>
              {'/*'} © {currentYear} The Boring Interview (NoQwit.ai). All rights reserved. {'*/'}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-500" suppressHydrationWarning>
              <span>Deployed with</span>
              <IconHeart className="h-3 w-3 text-pink-500" />
              <span>by <span className="text-black dark:text-white font-bold">The Boring Project</span></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 