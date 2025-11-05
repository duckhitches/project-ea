
// --- Main Playback Service ---

let audioContext: AudioContext | null = null;
const SAMPLE_RATE = 24000; // Gemini TTS sample rate

const getAudioContext = (): AudioContext => {
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: SAMPLE_RATE,
    });
  }
  return audioContext;
};

// Expects base64 WAV (we request audio/wav from Gemini)
export const playAudio = (base64Audio: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Fallback path: use Web Speech API when we get a WEB_SPEECH: prefix
      if (base64Audio.startsWith('WEB_SPEECH:')) {
        const text = base64Audio.replace('WEB_SPEECH:', '');
        const synth = window.speechSynthesis;
        const utter = new SpeechSynthesisUtterance(text);
        utter.onend = () => resolve();
        utter.onerror = (e) => {
          console.error('Web Speech synthesis error', e);
          resolve();
        };
        synth.speak(utter);
        return;
      }

      const ctx = getAudioContext();
      // Resume context if it's suspended (e.g., due to browser policy)
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      // Convert base64 to ArrayBuffer
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
      const arrayBuffer = bytes.buffer as ArrayBuffer;
      // Let WebAudio decode WAV container
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        resolve();
      };
      
      source.start();
    } catch (error) {
      console.error("Failed to play audio:", error);
      reject(error);
    }
  });
};


