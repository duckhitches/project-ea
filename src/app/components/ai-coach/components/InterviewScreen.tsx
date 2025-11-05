import React, { useRef, useEffect, useState } from 'react';
import { InterviewState, Message } from '@/app/components/ai-coach/types';
import { MicIcon, StopIcon, EyeIcon, EyeOffIcon, ThumbsUpIcon, ThumbsDownIcon } from './Icons';

interface InterviewScreenProps {
  state: InterviewState;
  messages: Message[];
  userTranscript: string;
  elapsedTime: number;
  startRecording: () => void;
  stopRecording: () => void;
  endInterview: () => void;
  handleFeedback: (messageIndex: number, feedback: 'good' | 'bad') => void;
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const InterviewScreen: React.FC<InterviewScreenProps> = ({
  state,
  messages,
  userTranscript,
  elapsedTime,
  startRecording,
  stopRecording,
  endInterview,
  handleFeedback,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTimerVisible, setIsTimerVisible] = useState(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, userTranscript]);

  const getStatusText = () => {
    switch (state) {
      case InterviewState.GENERATING_QUESTIONS:
        return 'Preparing your questions...';
      case InterviewState.AI_SPEAKING:
        return 'AI is speaking...';
      case InterviewState.LISTENING:
        return 'Listening...';
      case InterviewState.PROCESSING:
        return 'Processing your answer...';
      default:
        return 'Ready for your answer.';
    }
  };

  const isMicActive = state === InterviewState.LISTENING;
  const isMicDisabled = state !== InterviewState.IDLE && state !== InterviewState.LISTENING;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 flex justify-between items-center px-4 md:px-6 py-2 border-b border-gray-700">
        <div className="w-10"></div> {/* Spacer */}
        <div className="text-center">
          {isTimerVisible && (
            <p className="font-mono text-lg text-gray-400 tracking-wider" aria-live="off" aria-atomic="true">
              {formatTime(elapsedTime)}
            </p>
          )}
        </div>
        <button 
            onClick={() => setIsTimerVisible(!isTimerVisible)} 
            className="p-2 text-gray-500 hover:text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            aria-label={isTimerVisible ? "Hide timer" : "Show timer"}
        >
            {isTimerVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex flex-col flex-grow p-4 md:p-6 overflow-hidden">
        <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4">
          {messages.map((msg, index) => {
            const isLastMessage = index === messages.length - 1;
            const isAiSpeaking = msg.sender === 'AI' && isLastMessage && state === InterviewState.AI_SPEAKING;
            
            const aiBubbleClasses = `bg-gray-700 rounded-bl-none border-2 ${
              isAiSpeaking
                ? 'border-blue-500/50 shadow-lg shadow-blue-500/20'
                : 'border-transparent'
            }`;
            const userBubbleClasses = 'bg-blue-600 rounded-br-none';

            return (
              <div key={index} className={`flex items-end gap-2 ${msg.sender === 'AI' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-prose p-3 rounded-xl transition-all duration-300 ${msg.sender === 'AI' ? aiBubbleClasses : userBubbleClasses}`}>
                  {msg.sender === 'AI' && msg.text === '...' ? (
                    <div className="flex space-x-1 items-center h-6">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.1s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                    </div>
                  ) : (
                    <p className="text-white">{msg.text}</p>
                  )}
                </div>
                {msg.sender === 'AI' && msg.text !== '...' && (
                  <div className="flex gap-1 mb-1">
                     <button 
                      onClick={() => handleFeedback(index, 'good')}
                      className={`p-1.5 rounded-full transition-colors ${
                          msg.feedback === 'good'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-600 text-gray-400 hover:bg-gray-500'
                      }`}
                      aria-label="Good response"
                      >
                          <ThumbsUpIcon className="w-4 h-4" />
                      </button>
                      <button 
                          onClick={() => handleFeedback(index, 'bad')}
                          className={`p-1.5 rounded-full transition-colors ${
                              msg.feedback === 'bad'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-600 text-gray-400 hover:bg-gray-500'
                          }`}
                          aria-label="Bad response"
                      >
                          <ThumbsDownIcon className="w-4 h-4" />
                      </button>
                  </div>
                )}
              </div>
            );
          })}
          {userTranscript && (
            <div className="flex justify-end">
              <div className="max-w-prose p-3 rounded-xl bg-blue-600/50 rounded-br-none">
                <p className="text-white/70 italic">{userTranscript}</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex-shrink-0 flex flex-col items-center">
          <p className="text-gray-400 h-6 mb-4">{getStatusText()}</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={endInterview}
              className="px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              End Interview
            </button>
            <button
              onClick={isMicActive ? stopRecording : startRecording}
              disabled={isMicDisabled}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
                ${isMicActive ? 'bg-red-500 animate-pulse' : 'bg-blue-600'}
                ${isMicDisabled ? 'bg-gray-600 cursor-not-allowed' : 'hover:bg-blue-700'}
              `}
            >
              {isMicActive ? <StopIcon className="w-8 h-8" /> : <MicIcon className="w-8 h-8" />}
            </button>
            <div className="w-[110px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScreen;



