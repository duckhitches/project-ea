const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        const sessionId = req.headers['x-session-id'];
        
        if (!sessionId) {
            return res.status(401).json({ message: 'Not authorized, no session ID' });
        }

        const user = await User.findOne({ sessionId });
        
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, invalid session' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { protect }; 