'use client';

import { useEffect, useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import { motion } from 'framer-motion';
import { AuroraBackground } from './ui/aurora-background';

const AIInterview = () => {
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const startConversation = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: 'agent_01jwd2w406fab9xx2x9jn6xvpg', // Replace with your real agent ID
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const stopConversation = async () => {
    await conversation.endSession();
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setResumeText(text);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    setIsMounted(true);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AuroraBackground>
      <div className="flex flex-col items-center justify-center p-8 space-y-8">
        <motion.h1
          className="text-3xl font-bold font-cabin md:text-7xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          AI-Interview Experience
        </motion.h1>

        <motion.div
          className="flex flex-col items-center space-y-4 p-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm shadow-xl rounded-2xl w-full max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Our AI interviewer listens, responds, and even keeps a transcript.
          </p>

          <div className="rounded-full h-40 w-40 bg-gradient-to-tr from-green-300 via-white-400 via-yellow-500 to-silver-500 animate-pulse" />

          <div className="flex gap-4">
            <button
              onClick={startConversation}
              disabled={conversation.status === 'connected'}
              className="px-4 py-2 bg-black hover:bg-gradient-to-r from-gray-400 via-gray-800 to-black-500 text-white rounded-4xl disabled:bg-gray-400"
            >
              Start 
            </button>
            <button
              onClick={stopConversation}
              disabled={conversation.status !== 'connected'}
              className="px-4 py-2 bg-red-500 hover:bg-gradient-to-r from-red-500 via-red-600 to-red-400 text-white rounded-4xl"
            >
              End 
            </button>
          </div>

          <p className="text-sm">
            <strong>Status:</strong> {conversation.status} |{' '}
            {conversation.isSpeaking ? 'Speaking' : 'Listening'}
          </p>
        </motion.div>

        {/* Resume Upload */}
        {/* <motion.div
          className="w-full max-w-xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            📎 Upload Resume (TXT/PDF - Coming soon....)
          </label>
          <input
            type="file"
            accept=".txt,.pdf"
            onChange={handleResumeUpload}
            className="mt-2 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border-0 file:bg-gray-100 hover:file:bg-gray-200 file:text-blue-700 rounded"
          />
          {resumeText && (
            <div className="mt-4 p-2 text-xs bg-gray-100/80 dark:bg-neutral-800/80 backdrop-blur-sm border rounded max-h-40 overflow-y-auto">
              <pre>{resumeText.slice(0, 500)}{resumeText.length > 500 ? '... (truncated)' : ''}</pre>
            </div>
          )}
        </motion.div> */}

        {/* ElevenLabs "Need Help?" widget */}
        <div dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai agent-id="agent_01jwd2w406fab9xx2x9jn6xvpg"></elevenlabs-convai>`,
        }} />
      </div>
    </AuroraBackground>
  );
};

export default AIInterview;
