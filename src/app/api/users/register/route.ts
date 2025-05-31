import { NextResponse } from 'next/server'
import { MongoClient, ServerApiVersion } from 'mongodb'
import bcrypt from 'bcryptjs'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// Create a MongoClient with a MongoClientOptions object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

export async function POST(request: Request) {
  try {
    console.log('Starting registration process...')
    const { email, password } = await request.json()
    console.log('Received registration request for email:', email)

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    console.log('Connecting to MongoDB...')
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db('ea-project')
    const users = db.collection('users')

    // Check if user already exists
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const result = await users.insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
      lastLogin: new Date(),
      loginHistory: [{
        timestamp: new Date(),
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }]
    })

    console.log('User registered successfully')
    // Generate session ID
    const sessionId = result.insertedId.toString()

    return NextResponse.json({
      message: 'User registered successfully',
      sessionId
    })

  } catch (error) {
    console.error('Registration error:', error)
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json(
      { message: 'Error registering user', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    try {
      await client.close()
      console.log('MongoDB connection closed')
    } catch (closeError) {
      console.error('Error closing MongoDB connection:', closeError)
    }
  }
} 