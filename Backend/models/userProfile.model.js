const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    unique: true
  },
  bio: {
    type: String,
    maxlength: 300,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    trim: true
  },
  socialLinks: {
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true },
    instagram: { type: String, trim: true },
    linkedin: { type: String, trim: true }
  },
  dateOfBirth: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
