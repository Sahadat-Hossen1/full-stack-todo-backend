const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      default: "###",
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },
    metadata:{
      createdAt:{
        type:Date,
        default:Date.now
      },
      lastLogin:Date,
      lastLogout:Date,
      lastSignInTime:Date
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
