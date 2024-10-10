const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const { preventLoginIfAuthenticated } = require('../middleware/authMiddleware'); 
const router = express.Router();

// Login Route
router.post('/login',preventLoginIfAuthenticated, async (req, res) => {
    const { email, password } = req.body;

    try {
        // Step 1: Find user by email
        const user = await User.findOne({ where: { email } });

        // Step 2: Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Step 3: Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        // Step 4: Send response based on password match
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Step 5: Respond with user data (or token)
        res.status(200).json({ message: 'Login successful', user });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
