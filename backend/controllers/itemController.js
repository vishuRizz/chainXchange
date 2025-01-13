// controllers/itemController.js
const Item = require('../models/Item');
const Joi = require('joi');

// Validation Schema
const itemSchema = Joi.object({
    description: Joi.string().required(),
    imageURL: Joi.string().uri(),
    price: Joi.number().min(0),
    isBarterable: Joi.boolean(),
});

exports.postItem = async (req, res) => {
    try {
        const { error } = itemSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const newItem = new Item({ ...req.body, ownerId: req.auth.userId });
        await newItem.save();

        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: 'Failed to post item.' });
    }
};

exports.getItems = async (req, res) => {
    try {
        const { isBarterable } = req.query; // Optional filter
        const items = await Item.find(isBarterable ? { isBarterable } : {}).populate('ownerId');
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items.' });
    }
};
