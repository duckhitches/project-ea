import { useState, useEffect, useRef } from 'react';

// FIX: Add type definitions for Web Speech API to fix compile errors
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
}

interface Transcript {
  partial: string;
  final: string;
}

// FIX: Cast window to any to access browser-specific speech recognition APIs
// and rename to avoid conflict with the SpeechRecognition type.
const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<Transcript>({ partial: '', final: '' });
  // FIX: Use the global SpeechRecognition type, which is now unshadowed.
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const stoppedManually = useRef(true);

  useEffect(() => {
    // FIX: Check for the renamed API variable.
    if (!SpeechRecognitionAPI) {
      console.error('Speech Recognition API not supported in this browser.');
      return;
    }

    // FIX: Instantiate from the renamed API variable.
    const recognition: SpeechRecognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
      // If recognition stops unexpectedly (e.g., network error/timeout), restart it.
      if (!stoppedManually.current) {
        setTimeout(() => {
          if (!stoppedManually.current && recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 100);
      }
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      // If permission is denied, don't try to restart.
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        stoppedManually.current = true;
      }
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      // Accumulate final transcript parts correctly
      setTranscript(prev => ({
        partial: interimTranscript,
        final: (prev.final + (finalTranscript ? (prev.final ? ' ' : '') + finalTranscript : '')).trim()
      }));
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onstart = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript({ partial: '', final: '' });
      stoppedManually.current = false;
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      stoppedManually.current = true;
      recognitionRef.current.stop();
    }
  };
  
  const clearTranscript = () => {
    setTranscript({ partial: '', final: '' });
  };

  return { isListening, transcript, startListening, stopListening, clearTranscript };
};