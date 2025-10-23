// components/ui/GlowWrapper.tsx
"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface GlowWrapperProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  spread?: number;
  proximity?: number;
  disabled?: boolean;
  blur?: number;
  glow?: boolean;
  inactiveZone?: number;
}

export default function GlowWrapper({
  children,
  className = "",
  borderWidth = 3,
  spread = 80,
  proximity = 64,
  disabled = false,
  blur = 0,
  glow = true,
  inactiveZone = 0.01,
}: GlowWrapperProps) {
  return (
    <div className={`relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 ${className}`}>
      <GlowingEffect
        blur={blur}
        borderWidth={borderWidth}
        spread={spread}
        glow={glow}
        disabled={disabled}
        proximity={proximity}
        inactiveZone={inactiveZone}
      />
      <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        {children}
      </div>
    </div>
  );
}