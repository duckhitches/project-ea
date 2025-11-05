import { GoogleGenerativeAI } from "@google/generative-ai";
import { InterviewMode, Message, Feedback } from '@/app/components/ai-coach/types';

const PUBLIC_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const SERVER_KEY = process.env.API_KEY;
const ACTIVE_KEY = PUBLIC_KEY || SERVER_KEY;
if (!ACTIVE_KEY) {
  throw new Error("Set NEXT_PUBLIC_GEMINI_API_KEY (preferred) or API_KEY in env");
}

const genAI = new GoogleGenerativeAI(ACTIVE_KEY);

export async function generateInitialQuestions(resumeText: string | null, role: string, mode: InterviewMode): Promise<string[]> {
    const systemInstruction = `You are a highly-discerning AI hiring manager for a senior ${role} position. Your interview style is ${mode}. Your task is to perform a multi-pass, in-depth analysis of the candidate's resume to generate 5 hyper-specific and challenging questions.

**Analysis Phase (Internal Monologue - Do not output this):**
1.  **Identify Projects:** Scan for sections labeled 'Projects' or descriptions of specific deliverables. Note the technologies used and the stated outcome.
2.  **Extract Quantifiable Achievements:** Find any metric-driven results. Look for numbers, percentages, and dollar amounts (e.g., "reduced latency by 30%", "increased user engagement by 15%", "managed a $50k budget"). These are high-value targets.
3.  **Infer Soft Skills:** Analyze the language used in descriptions. Phrases like "led a team of 5," "collaborated with cross-functional teams," or "mentored junior developers" indicate leadership, teamwork, and communication skills.

**Question Generation Phase (Your Output):**
Based on your analysis, generate exactly 5 interview questions. Each question must:
- Directly quote or paraphrase a specific detail from the resume.
- Challenge the candidate to provide depth, context, and evidence for their claims.
- Probe for trade-offs, challenges, and learnings.

**Example Question Generation:**
- If resume says: "Optimized a key API, resulting in a 40% performance improvement."
- Your question should be: "Your resume mentions you achieved a 40% performance improvement on a key API. Could you detail the specific profiling tools you used to identify the bottleneck, and what were the primary architectural or code changes you implemented to reach that metric?"
- If resume lists: "Project X: A real-time data processing pipeline using Kafka and Flink."
- Your question should be: "On Project X, you built a pipeline with Kafka and Flink. What was the most significant challenge you faced regarding data consistency or fault tolerance in that distributed system, and how did you resolve it?"

Now, analyze the provided resume and generate the JSON array of 5 questions. Output ONLY the JSON array. Do not include any other text or markdown formatting.`;
    
    const prompt = `
        ${resumeText ? `Candidate's Resume:\n---\n${resumeText}\n---\n` : 'No resume was provided.'}
        Please generate the interview questions now.
    `;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro', systemInstruction });
    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }]}],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        responseMimeType: 'application/json'
      }
    });

    const text = response.response.text().trim();
    return JSON.parse(text);
}


export async function generateFollowUp(
    messages: Message[],
    lastAnswer: string,
    mode: InterviewMode,
    nextPlannedQuestion: string | null
): Promise<string> {
    const history = messages.map(m => `${m.sender}: ${m.text}`).join('\n');
    
    const systemInstruction = `You are an AI interview coach in a ${mode} style. Your goal is to keep the conversation flowing naturally.
    Based on the candidate's last answer, you have two choices:
    1. If the answer is vague, incomplete, or could be expanded upon, ask a concise, targeted follow-up question.
    2. If the answer is sufficient, transition smoothly to the next question.
    
    Be direct and do not use excessive filler.`;

    const prompt = `
      Conversation History:
      ${history}
      ---
      Candidate's Last Answer: "${lastAnswer}"
      ---
      ${nextPlannedQuestion 
        ? `If the answer is sufficient, your response should be: "Understood. My next question is: ${nextPlannedQuestion}"`
        : `This is the last question. If the answer is sufficient, you can say something like: "Thank you for that response. That concludes the question portion of our interview."`
      }
      
      Now, provide your response based on the candidate's last answer.
    `;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash', systemInstruction });
    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }]}],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 64
      }
    });

    return response.response.text().trim();
}


export async function generateFeedback(messages: Message[], mode: InterviewMode): Promise<Feedback> {
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

    const model2 = genAI.getGenerativeModel({ model: 'gemini-2.5-pro', systemInstruction });
    const response2 = await model2.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }]}],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        responseMimeType: 'application/json'
      }
    });

    const text = response2.response.text().trim();
    return JSON.parse(text) as Feedback;
}

export async function textToSpeech(text: string): Promise<string> {
    if (!text || text.trim() === '') {
        throw new Error("Cannot convert empty text to speech.");
    }

    // Prefer ElevenLabs TTS via our API route
    const resp = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    if (!resp.ok) {
      // Fallback to Web Speech if server TTS fails
      return `WEB_SPEECH:${text}`
    }
    const data = await resp.json()
    if (!data?.audioBase64) {
      return `WEB_SPEECH:${text}`
    }
    return data.audioBase64 as string
}


