const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    registerUser,
    loginUser,
    getUserProfile,
    updatePassword,
    getLoginHistory
} = require('../controllers/userController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/password', protect, updatePassword);
router.get('/history', protect, getLoginHistory);

module.exports = router; 