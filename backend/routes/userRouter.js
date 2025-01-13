const express = require("express");
const { User } = require("../models/db");

const router = express.Router();

// Create a user
router.post("/register", async (req, res) => {
  // console.log("Request received:", req.body); // Debug log

  const { clerkUserId, name, email, credits, cryptoWalletAddress } = req.body;

  if (!clerkUserId || !email) {
    return res.status(400).json({ error: "clerkUserId and email are required" });
  }

  try {
    let user = await User.findOne({ clerkUserId });
    if (!user) {
      user = new User({ clerkUserId, name, email, credits, cryptoWalletAddress });
      await user.save();
    }
    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error in /register:", error); // Debug log
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
