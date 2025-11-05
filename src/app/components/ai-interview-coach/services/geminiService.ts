import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { InterviewMode, Message, Feedback } from '../types';

export async function generateFeedback(messages: Message[], mode: InterviewMode): Promise<Feedback> {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key not found. Cannot generate feedback.");
    }
    
    const transcript = messages.map(m => `${m.sender}: ${m.text}`).join('\n\n');

    const systemInstruction = `You are an expert AI interview and speech coach with a specialization in vocal delivery and linguistic analysis. Your task is to perform a deep analysis of the provided interview transcript, which was conducted in a ${mode} style.

Your feedback must be exceptionally detailed, actionable, and encouraging. Generate a JSON object with the specified structure, paying close attention to the following sections:

1.  **Tone Analysis**: Go beyond simple adjectives. Analyze the candidate's word choice, sentence structure, and use of filler words to infer their underlying tone. Is it consistently confident? Does it waver? Are they assertive when describing accomplishments? Provide specific examples from the transcript to back up each observation. For instance, instead of "sounded hesitant," say "The use of phrases like 'I think' and 'maybe' when describing project outcomes suggests some hesitancy. A more assertive phrasing would be 'I achieved X...'". Provide 2-3 distinct points.

2.  **Pronunciation Guidance**: Identify 2-3 key technical or industry-specific terms from the transcript that are either commonly mispronounced or crucial for this role. For each term, provide a simple, intuitive phonetic breakdown. For example, for "Kubernetes," you could provide "koo-ber-NET-ees." Also, briefly explain why correct pronunciation of this term matters in a professional context.`;
    
    const prompt = `
        Interview Transcript:
        ---
        ${transcript}
        ---
        Please generate the feedback report now.
    `;
    
    const ai = new GoogleGenAI({ apiKey });
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            temperature: 0.7,
            topP: 0.95,
            topK: 64,
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    strengths: {
                        type: Type.ARRAY,
                        description: "3 specific strengths observed in the candidate's responses and communication style.",
                        items: { type: Type.STRING }
                    },
                    improvements: {
                        type: Type.ARRAY,
                        description: "3 concrete areas for improvement, with examples from the transcript to illustrate the point.",
                        items: { type: Type.STRING }
                    },
                    plan: {
                        type: Type.STRING,
                        description: "A concise, 30-60 second actionable practice plan for the candidate."
                    },
                    score: {
                        type: Type.NUMBER,
                        description: "A confidence score from 0 to 100 for the candidate's overall performance."
                    },
                    toneAnalysis: {
                        type: Type.ARRAY,
                        description: "2-3 observations about the candidate's tone as inferred from their word choice (e.g., confident, hesitant, clear, verbose). Provide examples.",
                        items: { type: Type.STRING }
                    },
                    pronunciationTips: {
                        type: Type.ARRAY,
                        description: "Identify 2-3 key technical or industry-specific terms from the transcript or relevant to the job role and provide simple phonetic guidance for pronunciation.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                term: { type: Type.STRING },
                                guidance: { type: Type.STRING }
                            },
                            required: ["term", "guidance"]
                        }
                    }
                },
                required: ["strengths", "improvements", "plan", "score", "toneAnalysis", "pronunciationTips"]
            }
        },
    });

    const raw = typeof (response as any).text === 'function' ? (response as any).text() : (response as any).text;
    const text = (raw ?? '').toString().trim();
    if (!text) {
      throw new Error('Empty feedback response');
    }
    try {
      return JSON.parse(text) as Feedback;
    } catch (e) {
      throw new Error('Invalid JSON in feedback response');
    }
}