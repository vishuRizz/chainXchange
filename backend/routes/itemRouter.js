const express = require("express");
const { Item, User } = require("../models/db");

const router = express.Router();

// Create an item
router.post("/", async (req, res) => {
  const { itemId, name, description, price, currency, clerkUserId } = req.body;
  // Validate required fields
  if ( !name || !price || !clerkUserId) {
    return res.status(400).json({ error: " name, price, and clerkUserId are required" });
  }

  try {
    // Find the owner by clerkUserId
    const owner = await User.findOne({ clerkUserId: clerkUserId });
    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    // Create the new item
    const item = new Item({
      itemId, // Ensure itemId is unique or auto-generated
      name,
      description,
      price,
      currency,
      owner: owner._id, // Use the _id of the owner
    });

    await item.save();
    res.status(201).json({ message: "Item created successfully", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create item" });
  }
});


// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().populate("owner");
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});
router.get("/:clerkId", async (req, res) => {
  const { clerkId } = req.params;
  const user = await User.findOne({ clerkId: clerkId });
  const id = user._id;
  try {
    const user = await User.findById(id).populate("owner");
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch item" });
  }
})

// Update an item
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const item = await Item.findByIdAndUpdate(id, updates, { new: true });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// Delete an item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
