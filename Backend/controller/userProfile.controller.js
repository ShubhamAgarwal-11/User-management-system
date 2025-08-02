const UserProfile = require('../models/userProfile.model');

exports.createProfile = async (req, res) => {
  try {
    const { bio, avatar, website, socialLinks, dateOfBirth } = req.body;

    // Check if profile already exists for this user
    const existingProfile = await UserProfile.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    const profile = new UserProfile({
      user: req.user.id,
      bio,
      avatar,
      website,
      socialLinks,
      dateOfBirth
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (err) {
    console.error('Create Profile Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id }).populate('user', 'name email role');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error('Get Profile Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({ message: 'Profile updated successfully', profile });
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOneAndDelete({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Delete Profile Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
