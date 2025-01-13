const express = require("express");
const { User } = require("../models/db");

const router = express.Router();

// Create a user
router.post("/", async (req, res) => {
  const { clerkUserId, name, email, credits, cryptoWalletAddress } = req.body;

  if (!clerkUserId || !email) {
    return res.status(400).json({ error: "clerkUserId and email are required" });
  }

  try {
    const user = new User({ clerkUserId, name, email, credits, cryptoWalletAddress });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
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
