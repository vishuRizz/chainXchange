const express = require("express");
const userRouter = require("./userRouter");
const itemRouter = require("./itemRouter");
const transactionRouter = require("./transaction");

const router = express.Router();

// Forward routes
router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
