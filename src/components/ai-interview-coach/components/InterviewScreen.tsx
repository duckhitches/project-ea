import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InterviewState, Message } from "../types";
import {
  StopIcon,
  EyeIcon,
  EyeOffIcon,
} from "./Icons";
import { cn } from "@/lib/utils";

interface InterviewScreenProps {
  state: InterviewState;
  messages: Message[];
  liveTranscript: string;
  elapsedTime: number;
  endInterview: () => void;
  handleFeedback: (messageIndex: number, feedback: "good" | "bad") => void;
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const InterviewScreen: React.FC<InterviewScreenProps> = ({
  state,
  messages,
  liveTranscript,
  elapsedTime,
  endInterview,
  handleFeedback,
}) => {
  const [isTimerVisible, setIsTimerVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);
  const isInitialMountRef = useRef(true);

  // Set scroll position to top on initial mount
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container && isInitialMountRef.current) {
      container.scrollTop = 0;
      isInitialMountRef.current = false;
      prevMessagesLengthRef.current = messages.length;
    }
  }, []);

  // Smart auto-scroll
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    if (isInitialMountRef.current) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (messages.length > prevMessagesLengthRef.current && isNearBottom) {
      setTimeout(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth"
        });
      }, 100);
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  const getStatusText = () => {
    switch (state) {
      case InterviewState.CONNECTING:
        return "ESTABLISHING_UPLINK...";
      case InterviewState.IN_CONVERSATION:
        return "CONNECTION_STABLE :: LIVE_FEED";
      case InterviewState.ENDING:
        return "TERMINATING_SESSION...";
      case InterviewState.PROCESSING:
        return "COMPILING_DATA_PACKETS...";
      default:
        return "SYSTEM_READY";
    }
  };

  const isConversationActive = state === InterviewState.IN_CONVERSATION;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-2xl relative font-mono text-zinc-600 dark:text-zinc-300 overflow-hidden">
      
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-3 px-4 text-xs font-bold uppercase tracking-wider relative z-10 transition-colors">
         <div className="flex items-center gap-3">
             <div className={cn(
               "w-3 h-3 rounded-full border border-zinc-900 dark:border-black",
               isConversationActive ? "bg-emerald-500 animate-pulse outline outline-emerald-500/20" : "bg-red-500"
             )} />
             <span className="text-zinc-900 dark:text-zinc-100">{getStatusText()}</span>
         </div>
         <div className="flex items-center gap-4">
             {isTimerVisible && (
               <span className="text-zinc-900 dark:text-white font-mono">{formatTime(elapsedTime)}</span>
             )}
             <button onClick={() => setIsTimerVisible(!isTimerVisible)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
               {isTimerVisible ? <EyeIcon className="w-4 h-4"/> : <EyeOffIcon className="w-4 h-4"/>}
             </button>
         </div>
      </div>

      {/* Terminal Output */}
      <div 
         ref={messagesContainerRef}
         className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 font-mono text-sm custom-scrollbar bg-zinc-50/50 dark:bg-black/90 transition-colors"
      >
         {messages.length === 0 && (
             <div className="text-zinc-400 dark:text-zinc-600 p-4">
               <div>{'>'} INITIALIZING_NEURAL_INTERFACE...</div>
               <div>{'>'} WAITING_FOR_AUDIO_STREAM...</div>
             </div>
         )}
         
         {messages.map((msg, index) => {
           const isAI = msg.sender === "AI";
           return (
             <div key={index} className="flex flex-col gap-1 group">
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider opacity-50">
                   <span className={cn(isAI ? "text-emerald-600 dark:text-emerald-500" : "text-pink-600 dark:text-pink-500")}>
                     {isAI ? "> AI_CORE_SYSTEM" : "> CANDIDATE_AUDIO_IN"}
                   </span>
                   <span className="text-zinc-400 dark:text-zinc-600">
                     [{new Date().toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'})}]
                   </span>
                </div>
                <div className={cn(
                   "pl-4 border-l-2 transition-colors",
                   isAI 
                    ? "border-emerald-500/30 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-100" 
                    : "border-pink-500/30 dark:border-pink-500/30 text-zinc-900 dark:text-white"
                )}>
                   {msg.text}
                </div>
                {/* Minimal Feedback Controls */}
                {isAI && (
                   <div className="pl-4 mt-1 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleFeedback(index, "good")} className={cn("text-[10px] uppercase border px-2 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors", msg.feedback === "good" ? "bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white" : "border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500")}>[ACK]</button>
                      <button onClick={() => handleFeedback(index, "bad")} className={cn("text-[10px] uppercase border px-2 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors", msg.feedback === "bad" ? "bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white" : "border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500")}>[FLAG]</button>
                   </div>
                )}
             </div>
           )
         })}

         {/* Live Transcript / Input Indicator */}
         {liveTranscript && (
            <div className="flex flex-col gap-1 opacity-70">
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-pink-600 dark:text-pink-500">
                   {">"} DETECTING_SPEECH...
                </div>
                <div className="pl-4 border-l-2 border-pink-500/50 text-pink-700 dark:text-pink-200 break-words font-medium">
                   {liveTranscript}<span className="animate-pulse">_</span>
                </div>
            </div>
         )}
         <div ref={messagesEndRef} />
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center transition-colors">
         <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest hidden md:block">
            AUDIO_CHANNEL: <span className="text-emerald-600 dark:text-emerald-500 font-bold">ACTIVE</span> | LATENCY: 24MS
         </div>
         
         <button
            onClick={endInterview}
            disabled={!isConversationActive}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-6 py-3 font-bold uppercase tracking-wider text-xs transition-colors disabled:opacity-50 disabled:grayscale shadow-lg shadow-red-500/10"
         >
            <StopIcon className="w-4 h-4" />
            Abort Session
         </button>
      </div>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] dark:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};

export default InterviewScreen;