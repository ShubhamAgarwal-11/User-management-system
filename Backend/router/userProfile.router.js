const express = require('express');
const router = express.Router();
const userProfileController = require('../controller/userProfile.controller')
const authMiddleware = require('../middleware/authMiddleware');


// Create user profile
router.post('/create-profile', authMiddleware ,userProfileController.createProfile);

// Get user profile
router.get('/get-profile', authMiddleware ,userProfileController.getProfile);

// Update user profile
router.put('/update-profile', authMiddleware ,userProfileController.updateProfile);

// Delete user profile
router.delete('/delete-profile', authMiddleware ,userProfileController.deleteProfile);

module.exports = router;