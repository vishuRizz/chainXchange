require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const { JsonRpcProvider } = require("ethers");
const router = express.Router();


const ABI = [
 
    {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "initiator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "responder",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "item1Id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "item2Id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "status",
            "type": "string"
          }
        ],
        "name": "TransactionFinalized",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_transactionId",
            "type": "uint256"
          }
        ],
        "name": "completeTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_item1Id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_item2Id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "_responder",
            "type": "address"
          }
        ],
        "name": "finalizeTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "transactionCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "transactions",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "initiator",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "responder",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "item1Id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "item2Id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "status",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    
];

const provider = new JsonRpcProvider("http://127.0.0.1:8545"); // Local Hardhat node
const privateKey = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const wallet = new ethers.Wallet(privateKey, provider);

// Contract details
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

// const wallet = new ethers.Wallet("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", provider);
// const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI, wallet);

// Finalize Transaction API
router.post("/finalizeTransaction", async (req, res) => {
  try {
    const { item1Id, item2Id, price, responder } = req.body;

    if (!item1Id || !item2Id || !price || !responder) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Parse price to BigNumber
    const parsedPrice = ethers.parseUnits(price, "wei");


    // Call the smart contract function
    const tx = await contract.finalizeTransaction(
      item1Id,
      item2Id,
      parsedPrice,
      responder,
      { value: parsedPrice } // Send the Ether value
    );

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    res.status(200).json({
      message: "Transaction finalized successfully!",
      txHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
});



// Complete Transaction API
router.post("/completeTransaction", async (req, res) => {
  try {
    const { transactionId } = req.body;

    const tx = await contract.completeTransaction(transactionId);
    await tx.wait();

    res.status(200).json({ message: "Transaction completed successfully!", txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;