import { useState, useRef, useCallback, useEffect } from 'react';
import { InterviewPhase, InterviewMode, InterviewState, Message, Feedback } from '@/app/components/ai-coach/types';
import { generateInitialQuestions, generateFollowUp, generateFeedback, textToSpeech } from '@/app/components/ai-coach/services/geminiService';
import { useSpeechRecognition } from '@/app/components/ai-coach/hooks/useSpeechRecognition';
import { playAudio } from '@/app/components/ai-coach/services/audioService';

export const useInterview = () => {
  const [phase, setPhase] = useState<InterviewPhase>(InterviewPhase.SETUP);
  const [mode, setMode] = useState<InterviewMode>(InterviewMode.CASUAL);
  const [interviewState, setInterviewState] = useState<InterviewState>(InterviewState.IDLE);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const questions = useRef<string[]>([]);
  const currentQuestionIndex = useRef<number>(0);
  const nameRef = useRef<string>('');
  const timerRef = useRef<number | null>(null);

  const { transcript, isListening, startListening, stopListening, clearTranscript } = useSpeechRecognition();

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

  const speak = useCallback(async (text: string) => {
    setInterviewState(InterviewState.AI_SPEAKING);
    addMessage({ sender: 'AI', text: '...' });

    try {
      const audioBase64 = await textToSpeech(text);
      
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].sender === 'AI') {
          newMessages[newMessages.length - 1].text = text;
        }
        return newMessages;
      });

      await playAudio(audioBase64);
    } catch (error) {
      console.error("Error during text-to-speech or audio playback:", error);
       setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].sender === 'AI') {
          newMessages[newMessages.length - 1].text = text + " (Audio failed to play)";
        }
        return newMessages;
      });
    } finally {
      setInterviewState(InterviewState.IDLE);
    }
  }, [addMessage]);

  const endInterview = useCallback(async () => {
    stopListening();
    setPhase(InterviewPhase.FEEDBACK);
    setInterviewState(InterviewState.PROCESSING);
    try {
      const finalFeedback = await generateFeedback(messages, mode);
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
  }, [messages, mode, stopListening]);

  const askNextQuestion = useCallback(async () => {
    if (currentQuestionIndex.current < questions.current.length) {
      const nextQuestion = questions.current[currentQuestionIndex.current];
      currentQuestionIndex.current++;
      await speak(nextQuestion);
    } else {
      await endInterview();
    }
  }, [speak, endInterview]);

  const processUserAnswer = useCallback(async (answer: string) => {
    setInterviewState(InterviewState.PROCESSING);
    addMessage({ sender: 'USER', text: answer });
    
    const isLastQuestion = currentQuestionIndex.current >= questions.current.length;
    const nextPlannedQuestion = isLastQuestion ? null : questions.current[currentQuestionIndex.current];

    try {
      const responseText = await generateFollowUp(messages, answer, mode, nextPlannedQuestion);
      
      if (responseText.includes(nextPlannedQuestion || 'some_unlikely_string')) {
          currentQuestionIndex.current++;
      }
      
      await speak(responseText);

      if (isLastQuestion && !nextPlannedQuestion) {
          const finalResponse = await generateFollowUp(messages, answer, mode, null);
          if (!finalResponse.toLowerCase().includes("next question")) {
              await speak(finalResponse);
          }
          await endInterview();
      }

    } catch(error) {
      console.error("Error generating follow up:", error);
      await speak("I'm sorry, I encountered an error. Let's move to the next question.");
      await askNextQuestion();
    }
  }, [messages, mode, askNextQuestion, speak, addMessage, endInterview]);

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
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase]);


  useEffect(() => {
    if (transcript.final) {
      processUserAnswer(transcript.final);
      clearTranscript();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript.final, processUserAnswer]);

  const startInterview = async (name: string, role: string, resumeText: string | null) => {
    setElapsedTime(0);
    setInterviewState(InterviewState.GENERATING_QUESTIONS);
    setPhase(InterviewPhase.INTERVIEW);
    nameRef.current = name;
    
    try {
      const generatedQuestions = await generateInitialQuestions(resumeText, role, mode);
      questions.current = generatedQuestions;
      currentQuestionIndex.current = 0;
      
      const greeting = `Hello, ${name}. Welcome to your interview preparation for the ${role} role. I'm your AI coach. Let's begin with your first question.`;
      await speak(greeting);
      await askNextQuestion();
    } catch (error) {
      console.error("Failed to generate questions:", error);
      setPhase(InterviewPhase.SETUP);
      setInterviewState(InterviewState.IDLE);
      alert("Sorry, there was an error setting up the interview. Please try again.");
    }
  };

  const startRecording = () => {
    if (interviewState === InterviewState.IDLE) {
      startListening();
      setInterviewState(InterviewState.LISTENING);
    }
  };
  
  const stopRecording = () => {
    if (isListening) {
      stopListening();
      setInterviewState(InterviewState.PROCESSING);
    }
  };

  const resetInterview = () => {
    setPhase(InterviewPhase.SETUP);
    setMessages([]);
    setFeedback(null);
    questions.current = [];
    currentQuestionIndex.current = 0;
    setInterviewState(InterviewState.IDLE);
    setElapsedTime(0);
  };

  return {
    phase,
    mode,
    setMode,
    startInterview,
    interviewState,
    transcript,
    messages,
    endInterview,
    startRecording,
    stopRecording,
    feedback,
    resetInterview,
    elapsedTime,
    handleFeedback,
  };
};



