import React, { useState, useEffect } from "react";
import { Feedback, InterviewMode } from "../types";

/** API quota error: code 429 */
const QUOTA_ERROR = {
  code: 429,
  message: "API_QUOTA_EXCEEDED :: CHECK_BILLING",
};

interface FeedbackScreenProps {
  feedback: Feedback;
  mode: InterviewMode;
  onRestart: () => void;
  quotaExceededError?: boolean;
}

const StatCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({
  title,
  children,
  className = "",
}) => (
  <section
    className={`border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 ${className}`}
  >
    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4 border-b border-zinc-100 dark:border-zinc-900 pb-2">
      {">"} {title}
    </h3>
    <div className="text-sm text-zinc-900 dark:text-zinc-300 font-mono">{children}</div>
  </section>
);

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ feedback, mode, onRestart, quotaExceededError = false }) => {
  const [showQuotaPopup, setShowQuotaPopup] = useState(false);

  useEffect(() => {
    if (quotaExceededError) setShowQuotaPopup(true);
  }, [quotaExceededError]);

  return (
    <div className="flex flex-col text-zinc-600 dark:text-zinc-300 font-mono relative">
      {/* Quota exceeded popup */}
      {showQuotaPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-white dark:bg-zinc-900 border border-red-500 max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center border border-red-500 text-red-500 font-bold">!</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase mb-1">
                  CRITICAL_ERROR
                </h3>
                <p className="text-sm text-red-600 dark:text-red-400 font-mono uppercase">
                  {QUOTA_ERROR.message}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                  CODE: {QUOTA_ERROR.code}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowQuotaPopup(false)}
                className="px-4 py-2 bg-red-600 text-white font-bold uppercase text-xs hover:bg-red-500"
              >
                Dismiss_Alert
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Score Card - Takes up 4 columns on large screens */}
        <div className="md:col-span-4 space-y-6">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 flex flex-col items-center justify-center text-center aspect-square shadow-xl">
               <div className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Confidence_Interval</div>
               <div className="text-6xl font-boldonse text-zinc-900 dark:text-white">{feedback.score ?? 0}</div>
               <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-1 mt-4 relative overflow-hidden">
                  <div style={{width: `${feedback.score ?? 0}%`}} className="absolute inset-y-0 left-0 bg-emerald-500" />
               </div>
            </div>
            
            <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4">
                <div className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Session_Metadata</div>
                <div className="space-y-1">
                   <div className="flex justify-between text-xs font-bold">
                     <span className="text-zinc-400 dark:text-zinc-600">MODE:</span>
                     <span className="text-zinc-900 dark:text-white uppercase">{mode}</span>
                   </div>
                   <div className="flex justify-between text-xs font-bold">
                     <span className="text-zinc-400 dark:text-zinc-600">STATUS:</span>
                     <span className="text-emerald-600 dark:text-emerald-500 uppercase">ANALYSIS_COMPLETE</span>
                   </div>
                </div>
            </div>
        </div>

        {/* Details Grid - Takes up 8 columns */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <StatCard title="Key_Strengths" className="md:col-span-1">
            {feedback.strengths && feedback.strengths.length ? (
              <ul className="space-y-2">
                {feedback.strengths.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 font-bold">+</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-zinc-400 dark:text-zinc-600 italic">No significant strengths isolated.</p>
            )}
          </StatCard>

          <StatCard title="Areas_For_Optimization" className="md:col-span-1">
            {feedback.improvements && feedback.improvements.length ? (
              <ul className="space-y-2">
                {feedback.improvements.map((imp, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-pink-600 dark:text-pink-500 font-bold">!</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-zinc-400 dark:text-zinc-600 italic">No critical faults detected.</p>
            )}
          </StatCard>

          <StatCard title="Action_Plan_V1" className="md:col-span-2 bg-zinc-900 dark:bg-gradient-to-br from-zinc-900 to-black text-white">
            {feedback.plan ? (
               <div className="prose prose-invert prose-p:text-sm prose-p:font-mono max-w-none">
                 {feedback.plan.split('\n').map((line, i) => (
                    <div key={i} className="mb-1">{line}</div>
                 ))}
               </div>
            ) : (
              <p className="text-zinc-400 italic">Generate new dataset for plan creation.</p>
            )}
          </StatCard>
        </div>

        {/* Tone & Pronunciation - Full Width */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
           <StatCard title="Tone_Analysis">
            {feedback.toneAnalysis && feedback.toneAnalysis.length ? (
              <ul className="space-y-2">
                {feedback.toneAnalysis.map((t, i) => (
                  <li key={i} className="flex gap-2 text-xs uppercase tracking-wide">
                    <span className="text-zinc-400 dark:text-zinc-600">::</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-zinc-400 dark:text-zinc-600 italic">Audio variance within nominal parameters.</p>
            )}
          </StatCard>

          <StatCard title="Linguistic_Correction">
            {feedback.pronunciationTips && feedback.pronunciationTips.length ? (
              <div className="space-y-3">
                {feedback.pronunciationTips.map((tip, i) => (
                  <div key={i} className="border-l border-zinc-200 dark:border-zinc-700 pl-3">
                    <p className="font-bold text-zinc-900 dark:text-white uppercase text-xs">{tip.term}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{tip.guidance}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 dark:text-zinc-600 italic">Phonetic accuracy: 100%.</p>
            )}
          </StatCard>
        </div>
      </main>

      <footer className="mt-8 flex justify-end">
            <button
              onClick={onRestart}
              className="px-8 py-4 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-bold uppercase tracking-widest text-sm transition-colors shadow-xl"
            >
              Re-Initialize Simulation
            </button>
      </footer>
    </div>
  );
};

export default FeedbackScreen;