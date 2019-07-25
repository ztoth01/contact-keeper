const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
//const multer = require('multer');

// Express validator
const { check, validationResult } = require('express-validator');

// // Image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/');
//   },
//   filename: (req, file, cb) => {
//     console.log(file, 'filename@@@@@@@@@@')
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 3
//   }
// });

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
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file was uploaded' });
    }
    const profileImage = {};
    const file = req.files.profileImage;
    file.mv(`./uploads/${file.name}`, err => {
      if (err) {
        return res.status(500).send(err);
      }
      profileImage.path = `./uploads/${file.name}`;
      profileImage.filename = file.name;
    });
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
        password,
        profileImage
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