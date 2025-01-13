// controllers/transactionController.js
const Transaction = require('../models/Transaction');

exports.proposeBarter = async (req, res) => {
    try {
        const { item1Id, item2Id } = req.body;

        const newTransaction = new Transaction({
            initiatorId: req.auth.userId,
            item1Id,
            item2Id,
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(500).json({ error: 'Failed to propose barter.' });
    }
};

exports.updateProposal = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { status } = req.body;

        const transaction = await Transaction.findByIdAndUpdate(transactionId, { status }, { new: true });
        if (!transaction) return res.status(404).json({ error: 'Transaction not found.' });

        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update proposal.' });
    }
};
