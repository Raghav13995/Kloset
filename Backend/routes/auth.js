const express = require('express');
const router = express.Router();
const authController = require('../controllers/Auth');
const { auth } = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', authController.login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getCurrentUser);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, authController.updateProfile);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', auth, authController.changePassword);

// @route   POST /api/auth/generate-otp
// @desc    Generate OTP for registration
// @access  Public
router.post('/generate-otp', authController.generateOTP);

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP
// @access  Public
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;