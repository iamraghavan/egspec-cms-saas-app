// backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

/**
 * Logs in an existing user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check if email is verified (optional)
    if (user.email_verified_at === null) {
      return res.status(400).json({ msg: 'Please verify your email before logging in.' });
    }

    // Prepare JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // Sign the JWT
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5h' }, // Token expiration time
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Return the token to the client
      }
    );

  } catch (err) {
    console.error('Error in login:', err.message);
    res.status(500).send('Server error');
  }
};
