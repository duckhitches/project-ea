import React from 'react';
import { Feedback, InterviewMode } from '@/app/components/ai-coach/types';

interface FeedbackScreenProps {
  feedback: Feedback;
  mode: InterviewMode;
  onRestart: () => void;
}

const FeedbackCard: React.FC<{ title: string; children: React.ReactNode; color: string; className?: string }> = ({ title, children, color, className }) => (
    <div className={`bg-gray-800 p-6 rounded-lg ${className}`}>
        <h3 className={`text-xl font-semibold mb-3 text-${color}-400`}>{title}</h3>
        {children}
    </div>
);

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ feedback, mode, onRestart }) => {
  return (
    <div className="flex flex-col h-full p-4 md:p-8 overflow-y-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">Interview Report</h2>
        <p className="text-gray-400 mt-2">Here is a summary of your performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FeedbackCard title="Strengths" color="green">
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
        </FeedbackCard>
        <FeedbackCard title="Areas for Improvement" color="yellow">
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                {feedback.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
            </ul>
        </FeedbackCard>
         <FeedbackCard title="Tone Analysis" color="cyan">
            <ul className="list-disc list-inside space-y-2 text-gray-300">
                {feedback.toneAnalysis.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
        </FeedbackCard>
        <FeedbackCard title="Pronunciation Guidance" color="orange">
            <div className="space-y-3 text-gray-300">
                {feedback.pronunciationTips.map((tip, i) => (
                    <div key={i}>
                        <p className="font-semibold">{tip.term}</p>
                        <p className="text-sm text-gray-400 italic">{tip.guidance}</p>
                    </div>
                ))}
            </div>
        </FeedbackCard>
        <FeedbackCard title="Actionable Practice Plan" color="blue" className="md:col-span-2">
            <p className="text-gray-300">{feedback.plan}</p>
        </FeedbackCard>
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-purple-400">Confidence Score</h3>
            <p className="text-5xl font-bold my-2">{feedback.score}<span className="text-2xl text-gray-400">/100</span></p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-400">Session Details</h3>
            <p className="text-lg my-2">Mode: <span className={`font-semibold ${mode === InterviewMode.STRICT ? 'text-red-400' : 'text-blue-400'}`}>{mode}</span></p>
        </div>
      </div>
      
      <div className="text-center mt-auto pt-4">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          Start New Interview
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;



