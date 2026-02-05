"use client";
import React, { SVGProps, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

interface StickyBannerProps {
  className?: string;
  children: React.ReactNode;
  hideOnScroll?: boolean;
  position?: "sticky" | "fixed";
}

export const StickyBanner = ({
  className,
  children,
  hideOnScroll = false,
  position = "fixed",
}: StickyBannerProps) => {
  const [open, setOpen] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideOnScroll && latest > 40) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  });

  const basePositionClasses =
    position === "fixed"
      ? "fixed inset-x-0 top-0"
      : "sticky inset-x-0 top-0";

  if (!open) return null;

  return (
    <motion.div
      className={cn(
        basePositionClasses,
        "z-[100] flex min-h-12 w-full items-center justify-center px-4 py-2 font-mono selection:bg-white selection:text-black",
        "border-b border-white/10 backdrop-blur-md shadow-[0_1px_10px_rgba(0,0,0,0.5)]",
        className,
      )}
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: -100,
        opacity: 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <div className="flex items-center gap-4 max-w-7xl w-full justify-center">
        {children}
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-none border border-white/20 p-1 text-white/50 transition hover:text-white hover:border-white/40 focus:outline-none"
        onClick={() => setOpen(false)}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
