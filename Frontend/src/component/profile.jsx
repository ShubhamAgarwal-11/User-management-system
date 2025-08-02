import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function UserProfileManagerHorizontal({ initialProfile }) {
  const [profile, setProfile] = useState(
    initialProfile || {
      avatar: "",
      userName: "",
      bio: "",
      website: "",
      dateOfBirth: "",
      socialLinks: { facebook: "", twitter: "", instagram: "", linkedin: "" },
    }
  );
  const location = useLocation();
  const id = location.state?.userId;
  const [editMode, setEditMode] = useState(initialProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["facebook", "twitter", "instagram", "linkedin"].includes(name)) {
      setProfile((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Profile saved:", profile);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col lg:flex-row gap-10"
      >
        {/* LEFT PANEL */}
        <div className="lg:w-1/3 flex flex-col items-center text-center lg:text-left">
          <motion.img
            src={profile.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md mb-4"
            whileHover={{ scale: 1.05 }}
          />

          <h2 className="text-3xl font-bold text-gray-800">{profile.userName || "Unnamed User"}</h2>
          {!editMode && <p className="text-gray-500 mt-1">{profile.bio || "No bio available."}</p>}

          <div className="flex flex-col gap-3 w-full mt-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editMode ? "Cancel" : profile.userName ? "Edit Profile" : "Create Profile"}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:w-2/3">
          {/* VIEW MODE */}
          {!editMode && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-600">Website</h4>
                <a href={profile.website || "#"} className="text-blue-600 hover:underline">
                  {profile.website || "Not Provided"}
                </a>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-600">Date of Birth</h4>
                <p className="text-gray-800">
                  {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "Not Provided"}
                </p>
              </div>
              <div className="sm:col-span-2 p-4 rounded-xl bg-gray-50 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Social Links</h4>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(profile.socialLinks).map(([key, link]) =>
                    link ? (
                      <a key={key} href={link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </a>
                    ) : (
                      <span key={key} className="text-gray-400">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: N/A
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* EDIT MODE */}
          {editMode && (
            <motion.form initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} onSubmit={handleSave} className="space-y-5">
              {/* Avatar Upload */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Change Avatar</label>
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm" />
              </div>

              {/* Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="userName" value={profile.userName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>

              {/* Bio */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
                <textarea name="bio" value={profile.bio} maxLength="300" onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>

              {/* Website */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Website</label>
                <input type="url" name="website" value={profile.website} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>

              {/* DOB */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Date of Birth</label>
                <input type="date" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Social Links</h3>
                {Object.keys(profile.socialLinks).map((platform) => (
                  <input
                    key={platform}
                    type="url"
                    name={platform}
                    value={profile.socialLinks[platform]}
                    onChange={handleChange}
                    placeholder={`https://${platform}.com/username`}
                    className="w-full mb-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                ))}
              </div>

              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Save Profile
              </button>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
