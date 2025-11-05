import React, { useState } from 'react';
import { InterviewMode } from '@/app/components/ai-coach/types';
import { LinkIcon } from './Icons';


const SetupScreen: React.FC<{
  onStart: (name: string, role: string, resumeText: string | null) => void;
  mode: InterviewMode;
  setMode: (mode: InterviewMode) => void;
}> = ({ onStart, mode, setMode }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [resumeText, setResumeText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && role) {
      onStart(name, role, resumeText.trim() || null);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center overflow-y-auto">
      <div className="w-full max-w-lg">
        <h2 className="text-4xl font-bold mb-2">Welcome!</h2>
        <p className="text-lg text-gray-400 mb-8">Let&apos;s get you ready for your next interview.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What&apos;s your name?"
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="What role are you applying for?"
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here (optional)"
            className="w-full h-32 p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            aria-label="Paste your resume text here"
          />

          <div className="text-sm text-gray-400 text-center -mt-2">
            <p>Need to convert a PDF resume to text?</p>
            <a 
              href="https://www.perplexity.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Try a PDF-to-text converter like Perplexity AI
              <LinkIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center justify-center space-x-4 pt-4">
            <span className="text-gray-400">Mode:</span>
            <button type="button" onClick={() => setMode(InterviewMode.CASUAL)} className={`px-4 py-2 rounded-lg ${mode === InterviewMode.CASUAL ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'}`}>Casual</button>
            <button type="button" onClick={() => setMode(InterviewMode.STRICT)} className={`px-4 py-2 rounded-lg ${mode === InterviewMode.STRICT ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'}`}>Strict</button>
          </div>

          <button type="submit" className="w-full p-4 bg-green-600 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={!name || !role}>
            Start Interview
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupScreen;



