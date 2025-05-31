const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

// Check if MONGODB_URI exists
if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

const uri = process.env.MONGODB_URI;

async function testConnection() {
    console.log('Testing MongoDB connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI?.replace(/\/\/[^:]+:[^@]+@/, '//****:****@'));
    
    const client = new MongoClient(process.env.MONGODB_URI, {
        ssl: true,
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
        retryWrites: true,
        w: 'majority'
    });
    
    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Successfully connected to MongoDB');
        
        const db = client.db('ea-project');
        const users = db.collection('users');
        
        // Test query
        const count = await users.countDocuments();
        console.log('Number of users in database:', count);
        
        // List all users (without sensitive data)
        const allUsers = await users.find({}, { projection: { email: 1, lastLogin: 1 } }).toArray();
        console.log('Users in database:', allUsers);
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

testConnection(); 