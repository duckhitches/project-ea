-- ============================================
-- SUPABASE MIGRATION SCHEMA
-- Migration from Appwrite to Supabase
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- 1. USER PROFILES TABLE
-- Stores additional user profile information
-- Supabase Auth handles authentication, this extends it
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    bio TEXT,
    location TEXT,
    website TEXT,
    profile_picture TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ============================================
-- 2. LOGIN HISTORY TABLE
-- Tracks user login sessions and activity
-- ============================================
CREATE TABLE IF NOT EXISTS login_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT,
    device_type TEXT, -- 'Mobile' or 'Desktop'
    location TEXT,
    logout_time TIMESTAMPTZ,
    session_duration INTEGER, -- Duration in minutes
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_login_history_user_id ON login_history(user_id);
CREATE INDEX IF NOT EXISTS idx_login_history_timestamp ON login_history(timestamp DESC);

-- Enable Row Level Security
ALTER TABLE login_history ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own login history
CREATE POLICY "Users can view own login history"
    ON login_history FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own login history
CREATE POLICY "Users can insert own login history"
    ON login_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own login history
CREATE POLICY "Users can update own login history"
    ON login_history FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- 3. INTERVIEW SESSIONS TABLE
-- Stores AI interview sessions and results
-- ============================================
CREATE TABLE IF NOT EXISTS interview_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_name TEXT,
    job_description TEXT,
    resume_data JSONB,
    questions JSONB, -- Array of questions
    answers JSONB, -- Array of answers
    feedback JSONB, -- AI-generated feedback
    score NUMERIC(5, 2), -- Overall score
    duration_minutes INTEGER,
    status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed', 'cancelled'
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_interview_sessions_user_id ON interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_status ON interview_sessions(status);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_created_at ON interview_sessions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own interview sessions
CREATE POLICY "Users can view own interview sessions"
    ON interview_sessions FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own interview sessions
CREATE POLICY "Users can insert own interview sessions"
    ON interview_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own interview sessions
CREATE POLICY "Users can update own interview sessions"
    ON interview_sessions FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy: Users can delete their own interview sessions
CREATE POLICY "Users can delete own interview sessions"
    ON interview_sessions FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- 4. USER PREFERENCES TABLE
-- Stores user preferences and settings
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    theme TEXT DEFAULT 'system', -- 'light', 'dark', 'system'
    notifications_enabled BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    language TEXT DEFAULT 'en',
    timezone TEXT,
    preferences JSONB DEFAULT '{}'::jsonb, -- For additional flexible preferences
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own preferences
CREATE POLICY "Users can view own preferences"
    ON user_preferences FOR SELECT
    USING (auth.uid() = id);

-- Policy: Users can update their own preferences
CREATE POLICY "Users can update own preferences"
    ON user_preferences FOR UPDATE
    USING (auth.uid() = id);

-- Policy: Users can insert their own preferences
CREATE POLICY "Users can insert own preferences"
    ON user_preferences FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ============================================
-- 5. FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for interview_sessions
CREATE TRIGGER update_interview_sessions_updated_at
    BEFORE UPDATE ON interview_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_preferences
CREATE TRIGGER update_user_preferences_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', ''));
    
    INSERT INTO public.user_preferences (id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 6. VIEWS FOR EASY QUERYING
-- ============================================

-- View for user profile with auth data
CREATE OR REPLACE VIEW user_profile_view AS
SELECT 
    u.id,
    u.email,
    u.email_confirmed_at,
    u.created_at as account_created_at,
    up.name,
    up.bio,
    up.location,
    up.website,
    up.profile_picture,
    up.created_at as profile_created_at,
    up.updated_at as profile_updated_at
FROM auth.users u
LEFT JOIN user_profiles up ON u.id = up.id;

-- ============================================
-- 7. HELPER FUNCTIONS
-- ============================================

-- Function to get user login history
CREATE OR REPLACE FUNCTION get_user_login_history(
    p_user_id UUID,
    p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    timestamp TIMESTAMPTZ,
    ip_address TEXT,
    user_agent TEXT,
    device_type TEXT,
    location TEXT,
    logout_time TIMESTAMPTZ,
    session_duration INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        lh.id,
        lh.timestamp,
        lh.ip_address,
        lh.user_agent,
        lh.device_type,
        lh.location,
        lh.logout_time,
        lh.session_duration
    FROM login_history lh
    WHERE lh.user_id = p_user_id
    ORDER BY lh.timestamp DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- END OF SCHEMA
-- ============================================

-- Notes:
-- 1. Run this schema in your Supabase SQL Editor
-- 2. Make sure Row Level Security (RLS) is enabled on your Supabase project
-- 3. Update your environment variables:
--    - NEXT_PUBLIC_SUPABASE_URL
--    - NEXT_PUBLIC_SUPABASE_ANON_KEY
--    - SUPABASE_SERVICE_ROLE_KEY (for server-side operations)
-- 4. The auth.users table is managed by Supabase Auth
-- 5. All tables use UUID as primary keys for consistency
-- 6. RLS policies ensure users can only access their own data

