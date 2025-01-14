import React, { useState } from "react";
import { ethers } from "ethers";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");

  const connectWallet = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed. Please install it to connect your wallet.");
      return;
    }

    try {
      // Create a new Web3Provider instance
      const provider = new ethers.BrowserProvider(window.ethereum);
      // Request wallet connection
      await provider.send("eth_requestAccounts", []);
      // Get signer and wallet address
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setError("");
    } catch (err) {
      setError("Failed to connect wallet. Please try again.");
      console.error("Error connecting wallet:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Wallet</h1>
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          {walletAddress ? "Wallet Connected" : "Connect Wallet"}
        </button>
        {walletAddress && (
          <p className="mt-4 text-green-600">
            Wallet Address: <span className="font-mono">{walletAddress}</span>
          </p>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default WalletConnect;
