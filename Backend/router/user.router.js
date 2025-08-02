const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');


// Registration
router.post('/register', userController.register);

// Email OTP verification
router.post('/verify-otp', userController.verifyOTP);

// Login
router.post('/login', userController.login);

// Request password reset OTP
router.post('/request-reset-password', userController.requestResetPassword);

// Reset password using OTP
router.post('/reset-password', userController.resetPassword);

module.exports = router;