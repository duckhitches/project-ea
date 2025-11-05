import React, { useState, useRef } from "react";
import { InterviewMode } from "../types";
import { UploadIcon } from "./Icons";
import { readFileContent } from "../utils/file";

const SetupScreen: React.FC<{
  onStart: (name: string, role: string, resumeText: string | null) => void;
  mode: InterviewMode;
  setMode: (mode: InterviewMode) => void;
}> = ({ onStart, mode, setMode }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && role) {
      onStart(name, role, resumeText.trim() || null);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsParsing(true);
    setParseError("");
    setResumeText("");

    try {
      const content = await readFileContent(file);
      // simple trim & normalize line endings
      setResumeText(typeof content === "string" ? content.trim() : "");
    } catch (error: any) {
      setParseError(error?.message || "Failed to read file.");
      setFileName("");
    } finally {
      setIsParsing(false);
      // clear the input value to allow re-uploading the same file
      if (e.target) e.target.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearResume = () => {
    setResumeText("");
    setFileName("");
    setParseError("");
  };

  return (
    <div className="min-h-full flex items-center justify-center p-6 sm:p-8 bg-white dark:bg-black text-black dark:text-white">
      <div className="w-full max-w-md sm:max-w-lg border border-black rounded-2xl p-6 sm:p-8">
        <header className="mb-5">
         
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Enter your details and optionally upload or paste your resume. Choose a mode and start the
            interview.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="candidate-name" className="block text-xs font-medium mb-2">
              Your name
            </label>
            <input
              id="candidate-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Priya Kumar"
              className="w-full px-4 py-2.5 border border-black rounded-lg bg-white text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="candidate-role" className="block text-xs font-medium mb-2">
              Role / Position
            </label>
            <input
              id="candidate-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Frontend Engineer"
              className="w-full px-4 py-2.5 border border-black rounded-lg bg-white text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Resume upload */}
          <div>
            <label className="block text-xs font-medium mb-2">Resume (optional)</label>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".txt,.pdf"
              aria-hidden="true"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={isParsing}
                className="flex-1 flex items-center gap-3 px-4 py-2.5 border border-dashed border-black rounded-lg bg-white text-black hover:bg-black/5 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-wait"
                aria-label={isParsing ? "Processing resume" : "Upload resume"}
              >
                <UploadIcon className="w-5 h-5" />
                <span className="text-sm">
                  {isParsing ? "Processing..." : fileName ? fileName : "Upload (.TXT only)"}
                </span>
              </button>

              <button
                type="button"
                onClick={clearResume}
                disabled={!resumeText && !fileName}
                className="px-4 py-2.5 border border-black rounded-lg bg-white text-black hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-40"
                aria-label="Clear resume"
              >
                Clear
              </button>
            </div>
            <div className="text-sm text-black/70 dark:text-white/70">
              <p>Need to convert a PDF resume to text?</p>
              <a 
                href="https://www.perplexity.ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors underline"
              >
                Try a PDF-to-text converter Using Perplexity AI
              </a>
            </div>
            {parseError && <p className="mt-2 text-sm text-black/80">Error: {parseError}</p>}
          </div>

          {/* Resume textarea / preview */}
          <div>
            <label htmlFor="resume-text" className="block text-xs font-medium mb-2">
              Paste or edit resume text
            </label>
            <textarea
              id="resume-text"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here (optional). If you uploaded a file it'll appear here."
              className="w-full min-h-[120px] px-4 py-2.5 border border-black rounded-lg bg-white text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black font-mono resize-y"
              aria-label="Paste or review your resume text here"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-black/60 dark:text-white/60">
              <span>{resumeText.length} characters</span>
              <span>{resumeText.split(/\s+/).filter(Boolean).length} words</span>
            </div>
          </div>

          {/* Mode segmented control */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="text-sm font-medium">Mode:</span>
            <div className="inline-flex rounded-lg border border-black bg-white dark:border-white">
              <button
                type="button"
                onClick={() => setMode(InterviewMode.CASUAL)}
                aria-pressed={mode === InterviewMode.CASUAL}
                className={`px-4 py-2 rounded-l-lg focus:outline-none ${
                  mode === InterviewMode.CASUAL
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black/5"
                }`}
              >
                Casual
              </button>
              <button
                type="button"
                onClick={() => setMode(InterviewMode.STRICT)}
                aria-pressed={mode === InterviewMode.STRICT}
                className={`px-4 py-2 rounded-r-lg focus:outline-none ${
                  mode === InterviewMode.STRICT
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black/5"
                }`}
              >
                Strict
              </button>
            </div>
          </div>

          {/* Start button */}
          <div>
            <button
              type="submit"
              className="w-full px-5 py-2.5 bg-black text-white dark:text-black dark:bg-white rounded-lg font-semibold hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name || !role}
            >
              Start Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupScreen;