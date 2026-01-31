"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Iridescence from "./Iridescence";

const LIGHT_COLOR: [number, number, number] = [0.95, 0.95, 0.95];
const DARK_COLOR: [number, number, number] = [0.15, 0.05, 0.25];

export default function GlobalBackground() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  const color = isDark ? DARK_COLOR : LIGHT_COLOR;

  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <Iridescence
        color={color}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />
    </div>
  );
}
