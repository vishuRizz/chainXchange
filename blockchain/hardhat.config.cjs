const { config: dotenvConfig } = require("dotenv");
require("@nomicfoundation/hardhat-toolbox"); // Includes ethers, chai-matchers, etc.

// Load environment variables from `.env` file
dotenvConfig();

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {}, // Hardhat's built-in blockchain
    localhost: {
      url: "http://127.0.0.1:8545", // Local Hardhat node
    },
    // Uncomment for testnet like Sepolia
    // sepolia: {
    //   url: process.env.RPC_URL, // Replace with your Sepolia RPC URL
    //   accounts: [process.env.PRIVATE_KEY], // Replace with your wallet private key
    // },
  },
};
