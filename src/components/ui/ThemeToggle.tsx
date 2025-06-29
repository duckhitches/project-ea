'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HiSun } from 'react-icons/hi';
import { HiMoon } from 'react-icons/hi2';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface ThemeToggleProps {
  onToggle?: (isDark: boolean) => void;
}

export default function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Animate particles on mount
      particlesRef.current.forEach((particle, i) => {
        gsap.to(particle, {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          repeat: -1,
          ease: "power2.inOut",
          delay: i * 0.2,
          yoyo: true,
        });
      });
    }
  }, [mounted]);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    // Button press animation
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    // Trigger theme change
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    onToggle?.(!isDark);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <motion.button
        ref={buttonRef}
        onClick={toggleTheme}
        className={`
          w-10 h-10 rounded-full flex items-center justify-center
          ${isDark ? 'bg-gray-800' : 'bg-white'}
          shadow-lg hover:shadow-xl transition-shadow
          relative z-10
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isDark ? 'dark' : 'light'}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? (
              <HiMoon className="w-5 h-5 text-purple-400" />
            ) : (
              <HiSun className="w-5 h-5 text-yellow-400" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isDark
              ? '0 0 10px rgba(147, 51, 234, 0.3)'
              : '0 0 10px rgba(234, 179, 8, 0.3)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Particle Effects */}
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={el => { particlesRef.current[i] = el!; }}
            className={`
              absolute w-1 h-1 rounded-full
              ${isDark ? 'bg-purple-400' : 'bg-yellow-400'}
            `}
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 60}deg) translateY(-12px)`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}