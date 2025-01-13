// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    initiatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    responderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    item1Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    item2Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    price: { type: Number },
    status: { type: String, enum: ['pending', 'completed', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
