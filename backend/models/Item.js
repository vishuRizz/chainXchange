// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    imageURL: { type: String },
    price: { type: Number },
    isBarterable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
