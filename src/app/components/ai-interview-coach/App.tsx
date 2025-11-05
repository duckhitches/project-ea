import React from 'react';
import { useInterview } from './hooks/useInterview';
import SetupScreen from './components/SetupScreen';
import InterviewScreen from './components/InterviewScreen';
import FeedbackScreen from './components/FeedbackScreen';
import { InterviewPhase } from './types';
import Header from './components/Header';

const App: React.FC = () => {
  const {
    phase,
    mode,
    setMode,
    startInterview,
    interviewState,
    liveTranscript,
    messages,
    endInterview,
    feedback,
    resetInterview,
    elapsedTime,
    handleFeedback,
  } = useInterview();

  const renderPhase = () => {
    switch (phase) {
      case InterviewPhase.SETUP:
        return <SetupScreen onStart={startInterview} mode={mode} setMode={setMode} />;
      case InterviewPhase.INTERVIEW:
        return (
          <InterviewScreen
            state={interviewState}
            messages={messages}
            endInterview={endInterview}
            liveTranscript={liveTranscript}
            elapsedTime={elapsedTime}
            handleFeedback={handleFeedback}
          />
        );
      case InterviewPhase.FEEDBACK:
        return feedback ? (
          <FeedbackScreen feedback={feedback} mode={mode} onRestart={resetInterview} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-xl">Generating your feedback report...</div>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mt-4"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl h-[85vh] bg-gray-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700 flex flex-col">
          {renderPhase()}
        </div>
      </main>
    </div>
  );
};

export default App;
