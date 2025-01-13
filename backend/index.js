const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const rootRouter = require("./routes/index");

const app = express();
app.use(cors({
  origin: "*", 
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],  
  credentials: false,
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://vishurizz01:HwCmM3l7rF7YZkvp@cluster0.7ozbuch.mongodb.net/chainX", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/v1", rootRouter);

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ChainXChange API" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
