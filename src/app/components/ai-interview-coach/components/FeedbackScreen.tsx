import React from "react";
import { Feedback, InterviewMode } from "../types";

interface FeedbackScreenProps {
  feedback: Feedback;
  mode: InterviewMode;
  onRestart: () => void;
}

const StatCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({
  title,
  children,
  className = "",
}) => (
  <section
    aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
    className={`bg-white border border-black/10 rounded-lg p-6 ${className}`}
  >
    <h3 id={title.replace(/\s+/g, "-").toLowerCase()} className="text-lg font-semibold text-black mb-3">
      {title}
    </h3>
    <div className="text-sm text-black/80">{children}</div>
  </section>
);

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ feedback, mode, onRestart }) => {
  return (
    <div className="min-h-full flex flex-col bg-white dark:bg-black text-black dark:text-white p-6 md:p-8">
      <header className="max-w-4xl mx-auto w-full text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">Interview Report</h2>
        <p className="mt-2 text-sm text-black/70">A concise summary of your session and actionable next steps.</p>
      </header>

      <main className="max-w-5xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard title="Strengths">
            {feedback.strengths && feedback.strengths.length ? (
              <ul className="list-disc list-inside space-y-2 text-black/80">
                {feedback.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-black/70">No strengths detected — try focusing on giving concrete examples.</p>
            )}
          </StatCard>

          <StatCard title="Areas for Improvement">
            {feedback.improvements && feedback.improvements.length ? (
              <ul className="list-disc list-inside space-y-2 text-black/80">
                {feedback.improvements.map((imp, i) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            ) : (
              <p className="text-black/70">No specific improvements suggested.</p>
            )}
          </StatCard>

          <StatCard title="Tone Analysis">
            {feedback.toneAnalysis && feedback.toneAnalysis.length ? (
              <ul className="list-disc list-inside space-y-2 text-black/80">
                {feedback.toneAnalysis.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            ) : (
              <p className="text-black/70">Tone looks even — no major issues detected.</p>
            )}
          </StatCard>

          <StatCard title="Pronunciation Guidance">
            {feedback.pronunciationTips && feedback.pronunciationTips.length ? (
              <div className="space-y-4">
                {feedback.pronunciationTips.map((tip, i) => (
                  <div key={i} className="text-black/85">
                    <p className="font-medium">{tip.term}</p>
                    <p className="text-sm italic text-black/60 mt-1">{tip.guidance}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-black/70">No pronunciation issues detected.</p>
            )}
          </StatCard>

          <section className="bg-white border border-black/10 rounded-lg p-6 md:col-span-2">
            <h3 className="text-lg font-semibold mb-3 text-black">Actionable Practice Plan</h3>
            <div className="text-sm text-black/80">
              {feedback.plan ? (
                <p>{feedback.plan}</p>
              ) : (
                <p className="text-black/70">No plan available. Try re-running the interview or enable detailed feedback.</p>
              )}
            </div>
          </section>

          <div className="bg-white border border-black/10 rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-2 text-black">Confidence Score</h3>
            <p className="text-4xl font-bold text-black/90">{feedback.score ?? 0}</p>
            <span className="text-sm text-black/60 mt-1">out of 100</span>
          </div>

          <div className="bg-white border border-black/10 rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-2 text-black">Session Details</h3>
            <p className="text-sm text-black/80 dark:text-white/80 dark:text-black/80">
              Mode: <span className="font-medium">{mode}</span>
            </p>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto w-full mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-black/70 dark:text-white/70">
            <p>
              Want to run another session? Click <span className="font-medium">Start New Interview</span> to try a different
              mode or upload an updated resume.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onRestart}
              className="px-6 py-2.5 rounded-full bg-black text-white dark:text-black dark:bg-white font-semibold hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-black"
            >
              Start New Interview
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeedbackScreen;