const express = require("express");
const userRouter = require("./userRouter");
const itemRouter = require("./itemRouter");

const router = express.Router();

// Forward routes
router.use("/users", userRouter);
router.use("/items", itemRouter);

module.exports = router;
