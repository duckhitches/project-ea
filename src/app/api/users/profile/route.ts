import { NextResponse } from 'next/server'
import { createServerClient, isSupabaseConfigured } from '@/lib/supabase'

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Service unavailable' },
      { status: 503 }
    )
  }
  try {
    const supabase = createServerClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      // PGRST116 is "not found" which is okay for new users
      console.error('Profile fetch error:', profileError)
    }

    // Get the most recent login history entry for lastLogin
    const { data: lastLoginData } = await supabase
      .from('login_history')
      .select('timestamp')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()

    // Return user profile data
    return NextResponse.json({
      email: user.email,
      name: profile?.name || user.user_metadata?.name || '',
      lastLogin: lastLoginData?.timestamp || user.last_sign_in_at || new Date().toISOString(),
      profile: profile
    })
  } catch (error) {
    console.error('Profile API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
} 