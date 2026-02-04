"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Iridescence from "./Iridescence";

// Pink-500 Accent Color
const ACCENT_COLOR: [number, number, number] = [0.925, 0.282, 0.6];

export default function GlobalBackground() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use Pink-500 for both modes to ensure the accent line is visible.
  const color = ACCENT_COLOR;

  return (
    <div className="fixed inset-0 -z-50 w-full h-full pointer-events-none">
      <Iridescence
        color={color}
        mouseReact={true}
        amplitude={0.1}
        speed={0.7} // Slightly slower for hypnotic effect
        className="opacity-40 dark:opacity-30" // Subtle background presence
      />
    </div>
  );
}
