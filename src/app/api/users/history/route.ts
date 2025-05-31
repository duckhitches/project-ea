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

    // Return login history (for now, just return the current session)
    return NextResponse.json([
      {
        timestamp: new Date().toISOString(),
        ipAddress: '127.0.0.1', // You might want to get this from the request
        userAgent: request.headers.get('user-agent') || 'Unknown'
      }
    ])
  } catch (error) {
    console.error('History API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    )
  }
} 