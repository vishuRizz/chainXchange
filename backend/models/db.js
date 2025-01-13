const mongoose = require("mongoose");
require("dotenv").config();
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

// User Schema
const userSchema = new Schema({
  clerkUserId: { type: String, required: true, unique: true }, // Clerk-generated user ID
  name: { type: String },
  email: { type: String, required: true },
  credits: { type: Number, default: 0 }, // In-app currency
  cryptoWalletAddress: { type: String }, // Optional, for users with crypto wallets
  createdAt: { type: Date, default: Date.now },
});

// Item Schema
const itemSchema = new Schema({
  itemId: { type: String, default: () => uuidv4(), unique: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  currency: { type: String, default: "crypto" }, // Can be 'crypto', 'USD', 'INR', etc.
  owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Transaction Schema
const transactionSchema = new Schema({
  transactionId: { type: String, required: true, unique: true }, // Unique transaction identifier
  initiator: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // User who starts the transaction
  responder: { type: mongoose.Types.ObjectId, ref: "User" }, // User responding to the transaction
  item1Id: { type: mongoose.Types.ObjectId, ref: "Item", required: true }, // Item offered
  item2Id: { type: mongoose.Types.ObjectId, ref: "Item" }, // Item requested in barter or null
  price: { type: Number }, // Agreed price if not barter
  currency: { type: String, default: "crypto" }, // Currency for the transaction
  status: { type: String, default: "pending", enum: ["pending", "completed", "rejected"] },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

const User = mongoose.model("User", userSchema);
const Item = mongoose.model("Item", itemSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { User, Item, Transaction };
