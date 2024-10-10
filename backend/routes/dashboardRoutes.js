const express = require('express');
const { auth } = require('../middleware/authMiddleware'); // Adjust the path as needed
const router = express.Router();

// Define the dashboard route with the auth middleware
router.get('/dashboard', auth, (req, res) => {
    res.json({
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
    });
});

module.exports = router;
