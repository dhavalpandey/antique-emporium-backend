if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();

    if(await !user) {
      return res.status(401).json({ status: "error", error: 'Error! Credentials not found' });
    } 
    
    if(await bcrypt.compare(password, user.password)) {
      let userRole;
      if(user.role != 0) {
        userRole = "admin"
      } else {
        userRole = "visitor"
      }

      let defaultAccountDate = new Date(user.date);
      let accountCreationDate = defaultAccountDate.toLocaleDateString();
      const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: userRole,
        dateCreated: accountCreationDate
      }, JWT_SECRET)

      console.info("A new user has just signed in!");
      return res.status(200).json({ status: "OK", data: token });
    }

    res.status(401).json({ status: "error", error: 'Error! Credentials not found' });
  });

module.exports = router;