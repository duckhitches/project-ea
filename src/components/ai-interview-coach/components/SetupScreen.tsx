import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-full flex items-center justify-center p-4 md:p-8 text-black dark:text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[90%] md:max-w-md lg:max-w-lg border border-white/20 dark:border-white/10 rounded-2xl p-5 md:p-8 shadow-xl bg-white/5 dark:bg-black/5 backdrop-blur-xl"
      >
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 md:mb-5"
        >
          <p className="mt-2 text-xs md:text-sm text-black/70 dark:text-white/70 leading-relaxed">
            Enter your details and optionally upload or paste your resume. Choose a mode and start the
            interview.
          </p>
        </motion.header>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-3 md:space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name */}
          <motion.div variants={itemVariants}>
            <motion.label
              htmlFor="candidate-name"
              className="block text-[10px] md:text-xs font-medium mb-1.5 md:mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Your name
            </motion.label>
            <motion.input
              id="candidate-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Mike Oxwall"
              className="w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base border border-black/10 dark:border-white/10 rounded-lg bg-white/5 dark:bg-white/5 backdrop-blur-md text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/50 focus:border-transparent transition-all duration-200"
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          {/* Role */}
          <motion.div variants={itemVariants}>
            <motion.label
              htmlFor="candidate-role"
              className="block text-[10px] md:text-xs font-medium mb-1.5 md:mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Role / Position
            </motion.label>
            <motion.input
              id="candidate-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Technical Support Engineer"
              className="w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base border border-black/10 dark:border-white/10 rounded-lg bg-white/5 dark:bg-white/5 backdrop-blur-md text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/50 focus:border-transparent transition-all duration-200"
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          {/* Resume upload */}
          <motion.div variants={itemVariants}>
            <motion.label
              className="block text-[10px] md:text-xs font-medium mb-1.5 md:mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Resume
            </motion.label>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".txt,.pdf"
              aria-hidden="true"
            />

            <div className="flex gap-2 md:gap-3">
              <motion.button
                type="button"
                onClick={handleUploadClick}
                disabled={isParsing}
                className="flex-1 flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-2.5 border border-dashed border-black dark:border-white/30 rounded-lg bg-white dark:bg-black/50 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/50 disabled:opacity-50 disabled:cursor-wait transition-all duration-200"
                aria-label={isParsing ? "Processing resume" : "Upload resume"}
                whileHover={{ scale: isParsing ? 1 : 1.02 }}
                whileTap={{ scale: isParsing ? 1 : 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  animate={isParsing ? { rotate: 360 } : { rotate: 0 }}
                  transition={{
                    rotate: {
                      duration: 1,
                      repeat: isParsing ? Infinity : 0,
                      ease: "linear",
                    },
                  }}
                >
                  <UploadIcon className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
                <span className="text-xs md:text-sm">
                  {isParsing ? "Processing..." : fileName ? fileName : "Upload (.TXT only)"}
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={clearResume}
                disabled={!resumeText && !fileName}
                className="px-3 py-2 md:px-4 md:py-2.5 border border-black dark:border-white/30 rounded-lg bg-white dark:bg-black/50 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/50 disabled:opacity-40 transition-all duration-200 text-xs md:text-sm"
                aria-label="Clear resume"
                whileHover={{ scale: !resumeText && !fileName ? 1 : 1.05 }}
                whileTap={{ scale: !resumeText && !fileName ? 1 : 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Clear
              </motion.button>
            </div>
            <motion.div
              className="text-xs md:text-sm text-black/70 dark:text-white/70 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p>Need to convert a PDF resume to text?</p>
              <motion.a
                href="https://www.freeconvert.com/pdf-to-text"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try a PDF-to-text converter
              </motion.a>
            </motion.div>
            <AnimatePresence>
              {parseError && (
                <motion.p
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="mt-2 text-xs md:text-sm text-red-600 dark:text-red-400 font-medium"
                >
                  Error: {parseError}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Resume textarea / preview */}
          <motion.div variants={itemVariants}>
            <motion.label
              htmlFor="resume-text"
              className="block text-[10px] md:text-xs font-medium mb-1.5 md:mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Paste or edit resume text
            </motion.label>
            <motion.textarea
              id="resume-text"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here (optional). If you uploaded a file it'll appear here."
              className="w-full min-h-[100px] md:min-h-[120px] px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-base border border-black dark:border-white/30 rounded-lg bg-white dark:bg-black/50 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/50 focus:border-transparent font-mono resize-y transition-all duration-200"
              aria-label="Paste or review your resume text here"
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div
              className="mt-2 flex items-center justify-between text-[10px] md:text-xs text-black/60 dark:text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                key={resumeText.length}
                initial={{ scale: 1.2, color: "#3b82f6" }}
                animate={{ scale: 1, color: "inherit" }}
                transition={{ duration: 0.3 }}
              >
                {resumeText.length} characters
              </motion.span>
              <motion.span
                key={resumeText.split(/\s+/).filter(Boolean).length}
                initial={{ scale: 1.2, color: "#3b82f6" }}
                animate={{ scale: 1, color: "inherit" }}
                transition={{ duration: 0.3 }}
              >
                {resumeText.split(/\s+/).filter(Boolean).length} words
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Mode segmented control */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 md:gap-4 pt-2"
          >
            <span className="text-xs md:text-sm font-medium">Mode:</span>
            <div className="inline-flex rounded-lg border border-black dark:border-white/30 bg-white dark:bg-black/50 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 bg-black dark:bg-white rounded-lg"
                initial={false}
                animate={{
                  left: mode === InterviewMode.CASUAL ? "0%" : "50%",
                  width: "50%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
              <button
                type="button"
                onClick={() => setMode(InterviewMode.CASUAL)}
                aria-pressed={mode === InterviewMode.CASUAL}
                className={`relative px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-l-lg focus:outline-none transition-colors duration-200 ${
                  mode === InterviewMode.CASUAL
                    ? "text-white dark:text-black"
                    : "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                Casual
              </button>
              <button
                type="button"
                onClick={() => setMode(InterviewMode.STRICT)}
                aria-pressed={mode === InterviewMode.STRICT}
                className={`relative px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-r-lg focus:outline-none transition-colors duration-200 ${
                  mode === InterviewMode.STRICT
                    ? "text-white dark:text-black"
                    : "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                Strict
              </button>
            </div>
          </motion.div>

          {/* Start button */}
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              className="w-full px-4 py-2 md:px-5 md:py-2.5 bg-black text-white dark:text-black dark:bg-white rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden text-sm md:text-base"
              disabled={!name || !role}
              whileHover={!name || !role ? {} : { scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={!name || !role ? {} : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.span
                className="relative z-10"
                initial={false}
                animate={{
                  opacity: !name || !role ? 0.5 : 1,
                }}
              >
                Start Interview
              </motion.span>
              {(!name || !role) && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                />
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default SetupScreen;