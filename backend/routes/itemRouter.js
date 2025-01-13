const express = require("express");
const { Item } = require("../models/db");

const router = express.Router();

// Create an item
router.post("/", async (req, res) => {
  const { itemId, name, description, price, currency, owner } = req.body;

  if (!itemId || !name || !price || !owner) {
    return res.status(400).json({ error: "itemId, name, price, and owner are required" });
  }

  try {
    const item = new Item({ itemId, name, description, price, currency, owner });
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
