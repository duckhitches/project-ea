import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { InterviewPhase, InterviewMode, InterviewState, Message, Feedback } from '../types';
import { generateFeedback } from '../services/geminiService';
import { createAudioBlob, decode, decodeAudioData } from '../services/audioService';

export const useInterview = () => {
  const [phase, setPhase] = useState<InterviewPhase>(InterviewPhase.SETUP);
  const [mode, setMode] = useState<InterviewMode>(InterviewMode.CASUAL);
  const [interviewState, setInterviewState] = useState<InterviewState>(InterviewState.IDLE);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const nameRef = useRef<string>('');
  const timerRef = useRef<number | null>(null);
  const sessionPromise = useRef<Promise<any> | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioResources = useRef<{
    inputAudioContext: AudioContext;
    outputAudioContext: AudioContext;
    scriptProcessor: ScriptProcessorNode;
    mediaStreamSource: MediaStreamAudioSourceNode;
  } | null>(null);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);
  
  const handleFeedback = (messageIndex: number, feedback: 'good' | 'bad') => {
    setMessages(prevMessages => {
      const newMessages = [...prevMessages];
      const message = newMessages[messageIndex];
      if (message && message.sender === 'AI') {
        if (message.feedback === feedback) {
          message.feedback = undefined;
        } else {
          message.feedback = feedback;
        }
      }
      return newMessages;
    });
  };

  const cleanupAudio = useCallback(() => {
    if (audioResources.current) {
      try {
        audioResources.current.scriptProcessor?.disconnect();
      } catch (error) {
        console.warn('Error disconnecting scriptProcessor:', error);
      }
      try {
        audioResources.current.mediaStreamSource?.disconnect();
      } catch (error) {
        console.warn('Error disconnecting mediaStreamSource:', error);
      }
      audioResources.current.inputAudioContext?.close().catch(() => {});
      audioResources.current.outputAudioContext?.close().catch(() => {});
      audioResources.current = null;
    }
    if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
    }
  }, []);

  const endInterview = useCallback(async () => {
    setInterviewState(InterviewState.ENDING);
    if (sessionPromise.current) {
      const session = await sessionPromise.current;
      session.close();
    }
    cleanupAudio();

    if (phase === InterviewPhase.FEEDBACK) return; // Prevent multiple feedback generations

    setPhase(InterviewPhase.FEEDBACK);
    setInterviewState(InterviewState.PROCESSING);
    try {
      // Add the final partial transcript to the history before generating feedback.
      const finalMessages = liveTranscript ? [...messages, { sender: 'USER' as const, text: liveTranscript }] : messages;
      const finalFeedback = await generateFeedback(finalMessages, mode);
      setFeedback(finalFeedback);
    } catch(error) {
      console.error("Error generating feedback:", error);
      setFeedback({
        strengths: ["Error generating feedback."],
        improvements: ["Please try another session."],
        plan: "N/A",
        score: 0,
        toneAnalysis: [],
        pronunciationTips: [],
      });
    } finally {
      setInterviewState(InterviewState.IDLE);
    }
  }, [messages, mode, liveTranscript, cleanupAudio, phase]);

  useEffect(() => {
    if (phase === InterviewPhase.INTERVIEW) {
      const startTime = Date.now();
      timerRef.current = window.setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const startInterview = async (name: string, role: string, resumeText: string | null) => {
    setElapsedTime(0);
    setMessages([]);
    setLiveTranscript('');
    setInterviewState(InterviewState.CONNECTING);
    setPhase(InterviewPhase.INTERVIEW);
    nameRef.current = name;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      alert("API Key is not available. Please ensure it has been selected or configured correctly.");
      setPhase(InterviewPhase.SETUP);
      setInterviewState(InterviewState.IDLE);
      return;
    }
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are a world-class AI interview coach. Your persona is professional, direct, and focused on improvement, with a male voice.
Your interview style is: ${mode}.

The candidate's name is ${name}.
They are applying for the role of: ${role}.
${resumeText ? `Here is their resume for your analysis:\n<resume>\n${resumeText}\n</resume>` : 'The candidate did not provide a resume.'}

Your task is to conduct a full interview.
1. Start with a warm but efficient greeting and a short intro question ("Tell me briefly about yourself"). Do not mention the resume in your greeting.
2. After their response, ask a mix of behavioral, technical, and domain-specific questions.
3. If a resume was provided, you MUST ask questions that are specifically tailored to the content of their resume. Refer to specific projects or achievements mentioned.
4. Always ask probing follow-up questions for vague or non-specific answers.
5. Maintain a conversational flow. Do not just list questions.
6. Keep your spoken responses concise and professional.

Begin the interview now. Greet the candidate by name and ask your first question.`;

      // Request microphone permissions before connecting to avoid race conditions and improve error handling.
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      let nextStartTime = 0;
      let currentInputTranscription = '';
      let currentOutputTranscription = '';

      sessionPromise.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            if (!mediaStreamRef.current) {
                console.error("Microphone stream not available after connection.");
                addMessage({ sender: 'AI', text: "A microphone error occurred. Please refresh and try again." });
                endInterview();
                return;
            }
            setInterviewState(InterviewState.IN_CONVERSATION);
            const stream = mediaStreamRef.current;
            const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            const mediaStreamSource = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createAudioBlob(inputData);
              sessionPromise.current?.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            mediaStreamSource.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
            audioResources.current = { inputAudioContext, outputAudioContext, mediaStreamSource, scriptProcessor };
          },
          onmessage: async (message: LiveServerMessage) => {
             if (message.serverContent?.inputTranscription) {
                const text = message.serverContent.inputTranscription.text ?? '';
                currentInputTranscription = text;
             }
             if (message.serverContent?.outputTranscription) {
                const text = message.serverContent.outputTranscription.text ?? '';
                currentOutputTranscription += text;
             }
             if (message.serverContent?.turnComplete) {
                if (currentInputTranscription) addMessage({ sender: 'USER', text: currentInputTranscription });
                if (currentOutputTranscription) addMessage({ sender: 'AI', text: currentOutputTranscription });
                currentInputTranscription = '';
                currentOutputTranscription = '';
                setLiveTranscript('');
             }

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioResources.current) {
              const { outputAudioContext } = audioResources.current;
              nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
              const source = outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContext.destination);
              source.start(nextStartTime);
              nextStartTime += audioBuffer.duration;
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Session error:', e);
            addMessage({sender: 'AI', text: "Sorry, a connection error occurred. This could be due to network issues or an invalid API key. Please check your connection and refresh."});
            endInterview();
          },
          onclose: () => {
            console.log('Session closed.');
            cleanupAudio();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: systemInstruction,
        },
      });

    } catch (error) {
      console.error("Failed to start interview:", error);
      if (error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "NotFoundError")) {
         alert("Microphone access was denied. Please allow microphone access in your browser settings to continue.");
      } else {
        alert("Sorry, there was an error setting up the interview. Please check your console for details.");
      }
      setPhase(InterviewPhase.SETUP);
      setInterviewState(InterviewState.IDLE);
    }
  };

  const resetInterview = () => {
    setPhase(InterviewPhase.SETUP);
    setMessages([]);
    setFeedback(null);
    setInterviewState(InterviewState.IDLE);
    setElapsedTime(0);
    setLiveTranscript('');
    if (sessionPromise.current) {
        sessionPromise.current.then(session => session?.close());
        sessionPromise.current = null;
    }
    cleanupAudio();
  };

  return {
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
  };
};