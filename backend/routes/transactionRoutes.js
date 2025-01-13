
// routes/transactionRoutes.js
const express = require('express');
const { proposeBarter, updateProposal } = require('../controllers/transactionController');
const requireAuth = require('../middleware/clerkAuth');

const router = express.Router();

router.post('/transactions', requireAuth, proposeBarter);
router.patch('/transactions/:transactionId', requireAuth, updateProposal);

module.exports = router;
