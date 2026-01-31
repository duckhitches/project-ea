import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InterviewState, Message } from "../types";
import {
  StopIcon,
  EyeIcon,
  EyeOffIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from "./Icons";

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
  const isUserScrollingRef = useRef(false);

  // Set scroll position to top on initial mount
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container && isInitialMountRef.current) {
      // Force scroll to top immediately on mount
      container.scrollTop = 0;
      isInitialMountRef.current = false;
      prevMessagesLengthRef.current = messages.length;
    }
  }, []);

  // Smart auto-scroll: only scroll if user is near bottom or new message arrived
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // Skip auto-scroll on initial mount (already handled above)
    if (isInitialMountRef.current) {
      return;
    }

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    // Only auto-scroll if:
    // 1. New message was added (length increased)
    // 2. User is near the bottom (within 100px)
    if (messages.length > prevMessagesLengthRef.current && isNearBottom) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  // Handle scroll events to detect user scrolling
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      isUserScrollingRef.current = !isNearBottom;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const getStatusText = () => {
    switch (state) {
      case InterviewState.CONNECTING:
        return "Connecting to AI coach...";
      case InterviewState.IN_CONVERSATION:
        return "Conversation is live...";
      case InterviewState.ENDING:
        return "Ending interview...";
      case InterviewState.PROCESSING:
        return "Generating your feedback...";
      default:
        return "Ready to start.";
    }
  };

  const isConversationActive = state === InterviewState.IN_CONVERSATION;

  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col bg-white/5 dark:bg-black/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl overflow-hidden w-full max-w-md sm:max-w-lg h-[540px] sm:h-[600px] mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 flex justify-between items-center px-4 sm:px-5 py-2.5 border-b border-white/10 dark:border-white/5 bg-white/5 dark:bg-white/5 backdrop-blur-md"
      >
        <div className="w-10" /> {/* Spacer for symmetry */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            {isTimerVisible && (
              <motion.p
                key="timer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-lg text-black dark:text-white tracking-wider"
                aria-live="off"
                aria-atomic="true"
              >
                {formatTime(elapsedTime)}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={() => setIsTimerVisible(!isTimerVisible)}
          className="p-2 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black transition-colors"
          aria-label={isTimerVisible ? "Hide timer" : "Show timer"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <AnimatePresence mode="wait">
            {isTimerVisible ? (
              <motion.div
                key="eye-off"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <EyeOffIcon className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="eye"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <EyeIcon className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6 overflow-hidden bg-transparent">
        <div
          ref={messagesContainerRef}
          className="flex-grow overflow-y-auto mb-4 pr-1 sm:pr-2 pb-4 sm:pb-6 space-y-3 sm:space-y-4 scroll-smooth"
        >
          {messages.map((msg, index) => {
            const isAI = msg.sender === "AI";
            // Use a stable key based on message content and index to prevent re-animations
            const messageKey = `${msg.sender}-${index}-${msg.text.substring(0, 20)}`;
            return (
              <motion.div
                key={messageKey}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                className={`flex items-end gap-2 ${
                  isAI ? "justify-start" : "justify-end"
                }`}
              >
                <motion.div
                  className={`max-w-[85%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl shadow-md border ${
                    isAI
                      ? "bg-white/10 dark:bg-white/5 backdrop-blur-md text-black dark:text-white border-white/10 dark:border-white/10 rounded-bl-none"
                      : "bg-pink-500 text-white border-pink-600 dark:border-pink-400 rounded-br-none"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isAI
                        ? "text-black dark:text-white"
                        : "text-white"
                    }`}
                  >
                    {msg.text}
                  </p>
                </motion.div>

                {/* feedback controls shown for AI messages on larger screens */}
                {isAI && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="hidden sm:flex gap-2 items-center ml-1"
                  >
                    <motion.button
                      onClick={() => handleFeedback(index, "good")}
                      className={`p-1.5 rounded-full transition-colors border ${
                        msg.feedback === "good"
                          ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                          : "bg-white dark:bg-black/50 text-black dark:text-white border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10"
                      } focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/50`}
                      aria-label="Good response"
                      title="Mark as good"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      
                    </motion.button>

                    <motion.button
                      onClick={() => handleFeedback(index, "bad")}
                      className={`p-1.5 rounded-full transition-colors border ${
                        msg.feedback === "bad"
                          ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                          : "bg-white dark:bg-black/50 text-black dark:text-white border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10"
                      } focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/50`}
                      aria-label="Bad response"
                      title="Mark as needs improvement"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
          
          {/* Live transcript display for user input */}
          {liveTranscript && liveTranscript.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="flex items-end gap-2 justify-end"
            >
              <motion.div
                className="max-w-[85%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl shadow-md border bg-pink-400/80 text-white border-pink-500 dark:border-pink-400 rounded-br-none"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <p className="text-sm sm:text-base leading-relaxed text-white">
                  {liveTranscript}
                </p>
              </motion.div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Footer controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-shrink-0 flex flex-col items-center mt-2 sm:mt-3"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={state}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="text-black dark:text-white h-6 mb-2 sm:mb-3 text-sm font-medium"
              aria-live="polite"
            >
              {getStatusText()}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={endInterview}
              disabled={!isConversationActive}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/50 transition-all ${
                isConversationActive
                  ? "bg-black dark:bg-white text-white dark:text-black hover:brightness-95 dark:hover:brightness-90 shadow-lg"
                  : "bg-white dark:bg-black/50 text-black dark:text-white border border-black/10 dark:border-white/20 cursor-not-allowed opacity-60"
              }`}
              whileHover={
                isConversationActive
                  ? { scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }
                  : {}
              }
              whileTap={isConversationActive ? { scale: 0.95 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                animate={isConversationActive ? { rotate: 0 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                <StopIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
              <span>End Interview</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InterviewScreen;