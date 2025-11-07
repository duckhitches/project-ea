import React, { useState } from "react";
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
  liveTranscript: _liveTranscript,
  elapsedTime,
  endInterview,
  handleFeedback,
}) => {
  const [isTimerVisible, setIsTimerVisible] = useState(true);

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

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-black shadow-sm overflow-hidden w-full max-w-md sm:max-w-lg h-[540px] sm:h-[600px] mx-auto">
      {/* Header */}
      <div className="flex-shrink-0 flex justify-between items-center px-4 sm:px-5 py-2.5 border-b border-black/10">
        <div className="w-10" /> {/* Spacer for symmetry */}
        <div className="text-center">
          {isTimerVisible && (
            <p
              className="font-mono text-lg text-black/70 tracking-wider"
              aria-live="off"
              aria-atomic="true"
            >
              {formatTime(elapsedTime)}
            </p>
          )}
        </div>

        <button
          onClick={() => setIsTimerVisible(!isTimerVisible)}
          className="p-2 text-black/70 hover:text-black rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
          aria-label={isTimerVisible ? "Hide timer" : "Show timer"}
        >
          {isTimerVisible ? (
            <EyeOffIcon className="w-6 h-6" />
          ) : (
            <EyeIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6 overflow-hidden">
        <div className="flex-grow overflow-y-auto mb-4 pr-1 sm:pr-2 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
          {messages.map((msg, index) => {
            const isAI = msg.sender === "AI";
            return (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  isAI ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl shadow-sm border ${
                    isAI
                      ? "bg-white text-black border-black/10 rounded-bl-none"
                      : "bg-black text-white border-black rounded-br-none"
                  }`}
                >
                  <p
                    className={`text-sm sm:text-base ${
                      isAI ? "text-black" : "text-white"
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>

                {/* feedback controls shown for AI messages on larger screens */}
                {isAI && (
                  <div className="hidden sm:flex gap-2 items-center ml-1">
                    <button
                      onClick={() => handleFeedback(index, "good")}
                      className={`p-1.5 rounded-full transition-colors border ${
                        msg.feedback === "good"
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black/10 hover:bg-black/5"
                      } focus:outline-none focus:ring-2 focus:ring-black`}
                      aria-label="Good response"
                      title="Mark as good"
                    >
                      <ThumbsUpIcon className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleFeedback(index, "bad")}
                      className={`p-1.5 rounded-full transition-colors border ${
                        msg.feedback === "bad"
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black/10 hover:bg-black/5"
                      } focus:outline-none focus:ring-2 focus:ring-black`}
                      aria-label="Bad response"
                      title="Mark as needs improvement"
                    >
                      <ThumbsDownIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Footer controls */}
        <div className="flex-shrink-0 flex flex-col items-center mt-2 sm:mt-3">
          <p
            className="text-black/60 h-6 mb-2 sm:mb-3 text-sm"
            aria-live="polite"
          >
            {getStatusText()}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={endInterview}
              disabled={!isConversationActive}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-black transition ${
                isConversationActive
                  ? "bg-black text-white hover:brightness-95"
                  : "bg-white text-black border border-black/10 cursor-not-allowed opacity-60"
              }`}
            >
              <StopIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>End Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScreen;