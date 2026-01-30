# 🧠 NoQwit.ai (formerly EA.ai)

> An AI-powered mock interview platform that helps users practice real-world interviews through adaptive questioning, voice interaction, and intelligent feedback.

---

## 🏗️ System Design

The application follows a modern **Serverless / Edge-first architecture** primarily powered by Next.js and Supabase.

```mermaid
graph TD
    User["👤 User (Candidate)"]
    
    subgraph Client ["🖥️ Frontend (Next.js App Router)"]
        UI["UI Components (Framer Motion, Tailwind)"]
        Voice["Voice Input/Output (ElevenLabs / Web Speech API)"]
    end
    
    subgraph Server ["⚡ Next.js API Routes (Serverless Functions)"]
        APIGen["/api/generate-questions"]
        APIAnalyze["/api/analyze-resume"]
        APITTS["/api/tts"]
        APIAuth["/auth/*"]
    end
    
    subgraph Services ["☁️ Layout Services"]
        Supabase[("🗄️ Supabase (PostgreSQL + Auth)")]
        Gemini["🧠 Google Gemini AI (LLM)"]
        ElevenLabs["🔊 ElevenLabs (Text-to-Speech)"]
    end

    User -->|Interacts| UI
    UI -->|Voice Input| Voice
    UI -->|Requests| APIGen
    UI -->|Requests| APIAnalyze
    
    APIGen -->|Prompt| Gemini
    APIAnalyze -->|Context| Gemini
    APITTS -->|Text| ElevenLabs
    
    APIAuth -->|Auth/Session| Supabase
    APIGen -->|Store History| Supabase
```

### Data Flow
1. **User Auth**: All authentication is handled by Supabase Auth (migrated from Appwrite).
2. **Interview Session**:
   - User starts session -> specific resume/JD context is sent to **Gemini**.
   - Gemini generates questions based on context.
   - User speaks -> Browser Speech-to-Text converts to string.
   - Answer is sent to Gemini for feedback + Next Question.
   - AI Response text is sent to **ElevenLabs** (or browser TTS) for audio playback.

---

## ❓ Why's & What's

### **Why Next.js?**
- **Unified Stack**: React for UI and API Routes for backend logic in one repository.
- **Server Components**: We use RSC (React Server Components) for secure data fetching (like user profile) explicitly on the server.
- **Performance**: Static generation for marketing pages, dynamic rendering for the dashboard.

### **Why Supabase?**
- **Relational Data**: Unlike Appwrite (document-based), Supabase gives us a real PostgreSQL database, which is better for structured data like `interview_sessions` and `user_profiles`.
- **Auth**: Built-in rugged authentication with RLS (Row Level Security) ensures users can only access their own data.

### **Why Gemini?**
- **Multimodal**: Good at understanding context from resumes and job descriptions.
- **Cost/Speed**: currently offers a great balance of latency and cost for real-time chat interfaces compared to GPT-4.

---

## 📂 Folder Structure

The project is contained within the `ea` directory.

```text
/
├── MIGRATION_COMPLETE.md    # Docs on the Appwrite -> Supabase migration
├── ea/                      # MAIN APPLICATION CODE
│   ├── src/
│   │   ├── app/             # Next.js App Router (Pages & API)
│   │   │   ├── api/         # Backend endpoints (Gemini, TTS, etc.)
│   │   │   ├── components/  # Page-specific components
│   │   │   ├── dashboard/   # User Dashboard pages
│   │   │   └── interview/   # Active interview session pages
│   │   ├── components/      # Shared UI components (Buttons, Inputs)
│   │   ├── lib/             # Utilities (Supabase client, Helpers)
│   │   └── backend/         # [LEGACY] Potential old python backend
│   ├── controllers/         # [LEGACY] Unused Express controllers
│   ├── routes/              # [LEGACY] Unused Express routes
│   └── public/              # Static assets
└── package.json             # Root workspace config
```

---

## 🛠️ Maintenance & Known Issues (For Devs)

This project has evolved and contains some legacy artifacts that new developers can help clean up.

### 1. Legacy Express Backend
- **Location**: `ea/controllers/` and `ea/routes/`
- **Issue**: These files (`userController.js`, `userRoutes.js`) use Express logic (`module.exports`, `res.status`). However, there is no `server.js` actively running them. The app now uses Next.js API routes (`ea/src/app/api`).
- **Fix**: Verify no logic is missing from the Next.js API routes, then **delete** these folders.

### 2. Python Artifacts
- **Location**: `ea/backend/` and `ea/__pycache__/`
- **Issue**: Presence of `__pycache__` suggests a Python backend was once used or tested.
- **Fix**: If the Python backend is no longer part of the stack (which seems true as `package.json` scripts don't reference it), these should be removed to avoid confusion.

### 3. Root vs. `ea` Package.json
- **Issue**: There is a `package.json` in the root AND in `ea/`.
- **Fix**: The root `package.json` script `"start": "node ea/server.js"` will likely fail because `ea/server.js` does not exist. Development should focus on `ea/package.json`.
- **Recommendation**: Update root scripts to proxy into `ea` correctly (e.g., `"dev": "cd ea && npm run dev"`).

---

## 🚀 Getting Started

1. **Navigate to the core app**:
   ```bash
   cd ea
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create `.env.local` in `ea/` directory with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   GEMINI_API_KEY=...
   ELEVENLABS_API_KEY=...
   ```

4. **Run Dev Server**:
   ```bash
   npm run dev
   ```
