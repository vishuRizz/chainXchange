// routes/itemRoutes.js
const express = require('express');
const { postItem, getItems } = require('../controllers/itemController');
const requireAuth = require('../middleware/clerkAuth');

const router = express.Router();

router.post('/items', requireAuth, postItem);
router.get('/items', getItems);

module.exports = router;
