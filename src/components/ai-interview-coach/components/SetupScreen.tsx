/**
 * Copyright (c) 2025 Eshan Vijay Shettennavar
 * 
 * This file is licensed under the MIT License.
 * See LICENSE-MIT.txt in the root directory for details.
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InterviewMode } from "../types";
import { UploadIcon } from "./Icons";
import { readFileContent } from "../utils/file";
import { cn } from "@/lib/utils";

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
    <div className="w-full text-zinc-600 dark:text-zinc-300 font-mono">
      <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative corner markers */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-zinc-950/20 dark:border-white/20"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-zinc-950/20 dark:border-white/20"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-zinc-950/20 dark:border-white/20"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-zinc-950/20 dark:border-white/20"></div>

        <header className="mb-8 border-b border-zinc-100 dark:border-zinc-900 pb-4">
          <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-1">
            {"// STEP 01: INITIALIZATION"}
          </p>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
             <div className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full"></div>
             <span>Enter candidate parameters to calibrate the neural interview model.</span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="candidate-name" className="block text-xs uppercase font-bold text-zinc-900 dark:text-white tracking-widest">
                Candidate Identifier
              </label>
              <input
                id="candidate-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: J. DOE"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-800 transition-colors rounded-none placeholder-zinc-400 dark:placeholder-zinc-600 uppercase"
                required
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label htmlFor="candidate-role" className="block text-xs uppercase font-bold text-zinc-900 dark:text-white tracking-widest">
                Target Position
              </label>
              <input
                id="candidate-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ex: SENIOR SYSTEM ARCHITECT"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-800 transition-colors rounded-none placeholder-zinc-400 dark:placeholder-zinc-600 uppercase"
                required
              />
            </div>
          </div>

          {/* Resume upload */}
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-zinc-900 dark:text-white tracking-widest">
              Data Ingestion (Resume)
            </label>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".txt,.pdf"
              aria-hidden="true"
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={isParsing}
                className={cn(
                  "min-w-0 flex-1 border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-500 dark:text-zinc-400 py-6 px-4 flex flex-col items-center justify-center gap-2 transition-all group",
                  isParsing && "opacity-50 cursor-wait"
                )}
              >
                <UploadIcon className="w-6 h-6 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors shrink-0" />
                <span className="text-xs uppercase tracking-wider text-center truncate max-w-full">
                  {isParsing ? "PARSING_FILE_STREAM..." : fileName ? fileName : "DRAG_FILE_OR_CLICK_TO_UPLOAD"}
                </span>
                {!fileName && <span className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase">Supported Formats: .TXT, .PDF</span>}
              </button>

              <button
                type="button"
                onClick={clearResume}
                disabled={!resumeText && !fileName}
                className="flex shrink-0 items-center justify-center min-h-[48px] w-full sm:w-24 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed uppercase text-xs font-bold transition-all"
              >
                Clear
              </button>
            </div>
            
            <AnimatePresence>
              {parseError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-red-600 dark:text-red-500 font-bold uppercase mt-2 bg-red-500/5 dark:bg-red-500/10 p-2 border border-red-500/20"
                >
                  ERROR: {parseError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Resume textarea */}
          <div className="space-y-2">
             <div className="flex justify-between items-end">
                <label htmlFor="resume-text" className="block text-xs uppercase font-bold text-zinc-900 dark:text-white tracking-widest">
                  Manual Data Entry / Preview
                </label>
                <div className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase font-mono">
                   CHARS: {resumeText.length} | WORDS: {resumeText.split(/\s+/).filter(Boolean).length}
                </div>
             </div>
            <textarea
              id="resume-text"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="// Paste raw text data here..."
              className="w-full min-h-[120px] bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 px-4 py-3 text-xs font-mono focus:outline-none focus:border-zinc-900 dark:focus:border-white focus:bg-white dark:focus:bg-black transition-colors rounded-none placeholder-zinc-300 dark:placeholder-zinc-700 resize-y"
            />
          </div>

          {/* Mode Switch */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
             <div className="flex items-center justify-between">
                <div>
                   <span className="block text-xs uppercase font-bold text-zinc-900 dark:text-white tracking-widest mb-1">Response Protocol</span>
                   <span className="text-[10px] text-zinc-500 uppercase">Select simulation intensity</span>
                </div>
                
                <div className="flex border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-1">
                  <button
                    type="button"
                    onClick={() => setMode(InterviewMode.CASUAL)}
                    className={cn(
                      "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all",
                      mode === InterviewMode.CASUAL 
                        ? "bg-zinc-950 dark:bg-white text-white dark:text-black shadow-lg" 
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    )}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode(InterviewMode.STRICT)}
                    className={cn(
                      "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all",
                      mode === InterviewMode.STRICT
                        ? "bg-red-600 text-white shadow-lg"
                        : "text-zinc-500 hover:text-red-600 dark:hover:text-white"
                    )}
                  >
                    Hardcore
                  </button>
                </div>
             </div>
          </div>

          {/* Start button */}
          <button
            type="submit"
            disabled={!name || !role}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest py-4 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 relative group overflow-hidden shadow-xl"
          >
            <span className="relative z-10 group-hover:tracking-[0.2em] transition-all duration-300">
               {(!name || !role) ? "Awaiting Input Parameters" : "Initiate Simulation Sequence"}
            </span>
            {name && role && (
               <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupScreen;