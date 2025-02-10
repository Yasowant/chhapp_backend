const express = require('express');
const {
  registerUser,
  authUser,
  allUsers,
} = require('../controllers/userControllers'); // Ensure correct file name
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Define the route for user registration
router.route('/').post(registerUser).get(protect, allUsers);
router.route('/login').post(authUser);

module.exports = router;
