const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
// Express validator
const { check, validationResult } = require('express-validator');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please eneter a password min 6 characters').isLength({ min: 6 })
],
  // Validation
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // findOne is a mongoose method
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      user = new User({
        name,
        email,
        password
      });
      // password encryption
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // Create payload for the webtoken
      const payload = {
        user: {
          id: user.id
        }
      }
      // Json webtoken
      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 3600
      }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      })
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;