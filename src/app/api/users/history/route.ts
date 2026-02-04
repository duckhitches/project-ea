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
    
    // Get the current user - Supabase reads auth from cookies automatically
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get login history from Supabase
    const { data: history, error } = await supabase
      .from('login_history')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false })
      .limit(10)

    if (error) {
      throw error
    }

    // Transform the data to match our interface
    const formattedHistory = (history || []).map(entry => ({
      timestamp: entry.timestamp,
      ipAddress: entry.ip_address,
      userAgent: entry.user_agent,
      device: entry.device_type,
      location: entry.location
    }))

    return NextResponse.json(formattedHistory)
  } catch (error) {
    console.error('Error fetching login history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch login history' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
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

    const { ipAddress, userAgent } = await request.json()
    
    // Detect device type
    const deviceType = userAgent?.includes('Mobile') ? 'Mobile' : 'Desktop'

    // Create a new login history record
    const { data: historyEntry, error } = await supabase
      .from('login_history')
      .insert({
        user_id: user.id,
        timestamp: new Date().toISOString(),
        ip_address: ipAddress,
        user_agent: userAgent,
        device_type: deviceType
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, data: historyEntry })
  } catch (error) {
    console.error('Error recording login history:', error)
    return NextResponse.json(
      { error: 'Failed to record login history' },
      { status: 500 }
    )
  }
} 