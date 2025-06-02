import { NextResponse } from 'next/server'
import { account, databases, ID } from '@/lib/appwrite'
import { Query } from 'appwrite'

export async function GET() {
  try {
    // Get the current user's session
    const session = await account.getSession('current')
    const user = await account.get()
    
    // Query login history from Appwrite database
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_LOGIN_HISTORY_COLLECTION_ID!,
      [
        Query.equal('userId', user.$id),
        Query.orderDesc('timestamp'),
        Query.limit(10)
      ]
    )

    // Transform the data to match our interface
    const history = response.documents.map(doc => ({
      timestamp: doc.timestamp,
      ipAddress: doc.ipAddress,
      userAgent: doc.userAgent
    }))

    return NextResponse.json(history)
  } catch (error) {
    console.error('Error fetching login history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch login history' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await account.get()
    const { ipAddress, userAgent } = await request.json()

    // Create a new login history record
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_LOGIN_HISTORY_COLLECTION_ID!,
      ID.unique(),
      {
        userId: user.$id,
        timestamp: new Date().toISOString(),
        ipAddress,
        userAgent
      }
    )

    return NextResponse.json({ success: true, data: response })
  } catch (error) {
    console.error('Error recording login history:', error)
    return NextResponse.json(
      { error: 'Failed to record login history' },
      { status: 500 }
    )
  }
} 