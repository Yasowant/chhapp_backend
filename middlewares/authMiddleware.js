const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user data from DB excluding password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('User not found, authorization denied');
      }

      // Move to the next middleware
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Invalid token, authorization failed');
    }
  } else {
    res.status(401);
    throw new Error('No token provided, access denied');
  }
});

module.exports = { protect };
