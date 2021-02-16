const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: 'https://antique-emporium.netlify.app/shop',
      failureRedirect: 'https://antique-emporium.netlify.app/',
      failureFlash: true
    })(req, res, next);
  });

  module.exports = router;