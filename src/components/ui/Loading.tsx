'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading = ({ message = "SYSTEM_INITIALIZING", fullScreen = true }: LoadingProps) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const content = (
    <div className={`flex flex-col items-center justify-center font-mono transition-colors duration-500 ${fullScreen ? 'fixed inset-0 min-h-screen bg-white dark:bg-black z-[100]' : 'w-full h-full py-20 bg-zinc-50/50 dark:bg-black/50'}`}>
      {/* Terminal Grain / Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] dark:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      
      <div className="relative w-full max-w-md px-6 space-y-8">
        {/* Top Status Bar */}
        <div className="flex justify-between items-center text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <span>Bootloader v2.4.0</span>
          <span className="animate-pulse text-emerald-600 dark:text-emerald-500">Node_Stable</span>
        </div>

        <div className="space-y-4">
          {/* Main Identifier */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-pink-500 animate-pulse" />
            <h2 className="text-xl font-boldonse text-zinc-900 dark:text-white uppercase tracking-tighter transition-colors">
              EA.AI <span className="text-zinc-400 dark:text-zinc-600">Core</span>
            </h2>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-end">
              <p className="text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-widest transition-colors font-bold">
                {message}{dots}
              </p>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-600">ID: BOOT_SEQ_0xFF</span>
            </div>
            
            {/* ASCII Style Progress Bar */}
            <div className="h-4 border border-zinc-200 dark:border-zinc-800 p-[2px] relative overflow-hidden bg-zinc-50 dark:bg-transparent">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "0%" }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent w-1/2"
               />
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="h-full bg-pink-500/80 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
               />
            </div>
          </div>
        </div>

        {/* Technical Logs */}
        <div className="space-y-1 opacity-40">
           {[
             "MEM_POOL_INITIALIZED [OK]",
             "NEURAL_HOOKS_SYNCED [OK]",
             "UPLINK_ESTABLISHED [OK]",
             "SECURE_LAYER_ARMED [OK]"
           ].map((log, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: i * 0.2 }}
               className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase flex justify-between"
             >
               <span>{'>'} {log}</span>
               <span className="text-zinc-300 dark:text-zinc-700">0.00{i}s</span>
             </motion.div>
           ))}
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex justify-center">
            <div className="flex gap-4 items-center opacity-30 dark:opacity-20 group">
                <div className="w-1 h-3 bg-zinc-300 dark:bg-zinc-700" />
                <div className="w-1 h-3 bg-zinc-400 dark:bg-zinc-700" />
                <div className="w-1 h-3 bg-zinc-400 dark:bg-zinc-600" />
                <div className="w-1 h-3 bg-pink-500" />
                <div className="w-1 h-3 bg-zinc-400 dark:bg-zinc-600" />
                <div className="w-1 h-3 bg-zinc-400 dark:bg-zinc-700" />
                <div className="w-1 h-3 bg-zinc-300 dark:bg-zinc-700" />
            </div>
        </div>
      </div>
    </div>
  );

  return content;
};
