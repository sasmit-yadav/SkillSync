const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  googleId: { type: String },
  // Profile fields
  bio: { type: String, default: "", maxlength: 500 },
  profilePicture: { type: String, default: "" },
  github: { type: String, default: "", trim: true },
  linkedin: { type: String, default: "", trim: true },
  portfolio: { type: String, default: "", trim: true },
  // Skills and endorsements
  skills: [{ type: String, trim: true }],
  endorsements: [{ 
    skill: { type: String, required: true, trim: true }, 
    endorsedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
  }],
  // Activity tracking
  lastActive: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model("User", UserSchema);
