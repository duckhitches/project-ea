import { NextResponse } from 'next/server'
import { account } from '@/lib/appwrite'

export async function GET(request: Request) {
  try {
    const sessionId = request.headers.get('x-session-id')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 401 }
      )
    }

    // Get the current user
    const user = await account.get()

    // Return user profile data
    return NextResponse.json({
      email: user.email,
      lastLogin: new Date().toISOString(), // You might want to store this in a database
    })
  } catch (error) {
    console.error('Profile API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
} 