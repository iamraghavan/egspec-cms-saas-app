// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return next(); // No token, proceed to the next middleware
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(); // Token invalid, proceed to the next middleware
        }

        req.user = decoded.user; // Attach user info to the request
        next();
    });
};

const preventLoginIfAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        return res.redirect('/egspec/portal/dashboard'); // Redirect to dashboard if already logged in
    }

    next();
};

module.exports = { auth, preventLoginIfAuthenticated };
