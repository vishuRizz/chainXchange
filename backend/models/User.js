// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    walletAddress: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
