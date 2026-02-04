/**
 * Copyright (c) 2025 Eshan Vijay Shettennavar
 * 
 * This file is licensed under the Business Source License 1.1.
 * See LICENSE-BUSL-1.1.txt in the root directory for details.
 * 
 * Use of this software is governed by the Business Source License.
 * Change Date: February 4, 2029
 * Change License: Apache License 2.0
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }
  return { supabaseUrl, supabaseAnonKey }
}

/** Use in API routes to avoid throwing during build when env vars are missing */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

let _supabase: SupabaseClient | null = null

// Client-side Supabase client (for browser) - created lazily so build can run without env
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_supabase) {
      const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
      _supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
    }
    return (_supabase as any)[prop]
  },
})

// Server-side Supabase client (for API routes and Server Components)
export const createServerClient = () => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Admin client (for server-side operations with service role key)
// Only use this in secure server-side contexts
export const createAdminClient = () => {
  const { supabaseUrl } = getSupabaseConfig()
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Type definitions for our database schema
export interface UserProfile {
  id: string
  name?: string
  bio?: string
  location?: string
  website?: string
  profile_picture?: string
  created_at?: string
  updated_at?: string
}

export interface LoginHistory {
  id: string
  user_id: string
  timestamp: string
  ip_address?: string
  user_agent?: string
  device_type?: string
  location?: string
  logout_time?: string
  session_duration?: number
  created_at?: string
}

export interface InterviewSession {
  id: string
  user_id: string
  session_name?: string
  job_description?: string
  resume_data?: any
  questions?: any[]
  answers?: any[]
  feedback?: any
  score?: number
  duration_minutes?: number
  status?: 'in_progress' | 'completed' | 'cancelled'
  started_at?: string
  completed_at?: string
  created_at?: string
  updated_at?: string
}

export interface UserPreferences {
  id: string
  theme?: 'light' | 'dark' | 'system'
  notifications_enabled?: boolean
  email_notifications?: boolean
  language?: string
  timezone?: string
  preferences?: any
  created_at?: string
  updated_at?: string
}

// Helper functions for common operations

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

/**
 * Get user profile
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data as UserProfile | null
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data as UserProfile
}

/**
 * Get login history for a user
 */
export async function getLoginHistory(userId: string, limit: number = 10) {
  const { data, error } = await supabase
    .from('login_history')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data as LoginHistory[]
}

/**
 * Create login history entry
 */
export async function createLoginHistory(entry: Omit<LoginHistory, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('login_history')
    .insert(entry)
    .select()
    .single()
  
  if (error) throw error
  return data as LoginHistory
}

/**
 * Update login history entry (for logout)
 */
export async function updateLoginHistory(
  id: string,
  updates: Partial<LoginHistory>
) {
  const { data, error } = await supabase
    .from('login_history')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as LoginHistory
}

/**
 * Get interview sessions for a user
 */
export async function getInterviewSessions(userId: string) {
  const { data, error } = await supabase
    .from('interview_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as InterviewSession[]
}

/**
 * Create interview session
 */
export async function createInterviewSession(
  session: Omit<InterviewSession, 'id' | 'created_at' | 'updated_at'>
) {
  const { data, error } = await supabase
    .from('interview_sessions')
    .insert(session)
    .select()
    .single()
  
  if (error) throw error
  return data as InterviewSession
}

/**
 * Update interview session
 */
export async function updateInterviewSession(
  id: string,
  updates: Partial<InterviewSession>
) {
  const { data, error } = await supabase
    .from('interview_sessions')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as InterviewSession
}

/**
 * Get user preferences
 */
export async function getUserPreferences(userId: string) {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data as UserPreferences | null
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  userId: string,
  updates: Partial<UserPreferences>
) {
  const { data, error } = await supabase
    .from('user_preferences')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data as UserPreferences
}

