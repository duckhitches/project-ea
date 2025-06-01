"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconHeart } from "@tabler/icons-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About", href: "#About" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/Contact" },
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
        { name: "Help Center", href: "/Contact" },
        { name: "Documentation", href: "/docs" },
        { name: "Status", href: "/status" },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950 font-michroma" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" suppressHydrationWarning>
          {/* Brand Section */}
          <div className="space-y-4" suppressHydrationWarning>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Project EA</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 ">
              Transforming interviews with AI-powered conversations.
            </p>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4" suppressHydrationWarning>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {section.title}
              </h3>
              <ul className="space-y-2" suppressHydrationWarning>
                {section.links.map((link) => (
                  <li key={link.name} suppressHydrationWarning>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                      suppressHydrationWarning
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800" suppressHydrationWarning>
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0" suppressHydrationWarning>
            <p className="text-sm text-neutral-600 dark:text-neutral-400" suppressHydrationWarning>
              © {currentYear} Project EA. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400" suppressHydrationWarning>
              <span>Created with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                suppressHydrationWarning
              >
                <IconHeart className="h-4 w-4 text-red-500" />
              </motion.div>
              <span>by EA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 