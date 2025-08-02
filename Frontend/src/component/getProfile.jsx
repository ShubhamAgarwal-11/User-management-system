import React, { useState } from "react";
import { motion } from "framer-motion";

export default function UserProfile({ profile }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <motion.img
            src={profile.avatar || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            whileHover={{ scale: 1.05 }}
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-800">{profile.userName || "John Doe"}</h2>
            <p className="text-gray-500">{profile.bio || "No bio available."}</p>
            <button
              onClick={() => setEditMode(!editMode)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t"></div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Website */}
          <div className="p-4 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
            <h4 className="text-sm font-semibold text-gray-600">Website</h4>
            <a
              href={profile.website || "#"}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.website || "Not Provided"}
            </a>
          </div>

          {/* DOB */}
          <div className="p-4 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
            <h4 className="text-sm font-semibold text-gray-600">Date of Birth</h4>
            <p className="text-gray-800">
              {profile.dateOfBirth
                ? new Date(profile.dateOfBirth).toLocaleDateString()
                : "Not Provided"}
            </p>
          </div>

          {/* Social Links */}
          <div className="sm:col-span-2 p-4 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Social Links</h4>
            <div className="flex flex-wrap gap-4">
              {Object.entries(profile.socialLinks || {}).map(([platform, link]) =>
                link ? (
                  <a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                ) : (
                  <span key={platform} className="text-gray-400">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}: N/A
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Edit Mode Placeholder */}
        {editMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 rounded-lg border border-blue-300 bg-blue-50 text-blue-800"
          >
            🔧 Edit Mode Activated – You can integrate your **UserProfileForm** here.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
