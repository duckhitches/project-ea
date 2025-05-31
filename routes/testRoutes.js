const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Test route to verify MongoDB connection and create a test user
router.get('/test-db', async (req, res) => {
    try {
        // Create a test user
        const testUser = await User.create({
            email: 'test@example.com',
            password: 'test123',
            loginHistory: [{
                timestamp: new Date(),
                ipAddress: '127.0.0.1',
                userAgent: 'Test Browser'
            }]
        });

        // Fetch the test user to verify
        const fetchedUser = await User.findById(testUser._id).select('-password');
        
        res.json({
            message: 'MongoDB connection successful!',
            testUser: fetchedUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'MongoDB connection test failed',
            error: error.message
        });
    }
});

module.exports = router; 