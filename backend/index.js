// // server.js
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const itemRoutes = require('./routes/itemRoutes');
// // const transactionRoutes = require('./routes/transactionRoutes');
// import transactionRoutes from './routes/transactionRoutes'

// const app = express();
// app.use(express.json());

// // Routes
// app.use('/api', itemRoutes);
// app.use('/api', transactionRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Import necessary modules

const express = require("express");
const cors = require("cors");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Protected route
app.get("/profile", ClerkExpressRequireAuth(), (req, res) => {
    console.log(req.auth); // Debugging the auth object
    if (!req.auth.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const user = req.auth.user;
    res.json({ message: `Hello, ${user.firstName}!`, user });
  });
  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
