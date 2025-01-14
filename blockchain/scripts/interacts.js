import hre from "hardhat";

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed contract address
  const [sender, responder] = await hre.ethers.getSigners(); // Sender (initiator) and Responder

  const BarterBuy = await hre.ethers.getContractFactory("BarterBuy");
  const contract = await BarterBuy.attach(contractAddress);

  // Example items
  const item1Id = 1; // Item 1 (Offered by initiator)
  const item2Id = 2; // Item 2 (Offered by responder)
  const price = 100; // Final agreed price

  // Initiator (sender) finalizes the transaction with responder
  const tx = await contract.finalizeTransaction(item1Id, item2Id, price, responder.address);
  await tx.wait(); // Wait for the transaction to be mined
  console.log("Transaction finalized!");
  
  // After both parties agree, the responder can complete the transaction
  const completeTx = await contract.completeTransaction(1); // Transaction ID passed as example (update accordingly)
  await completeTx.wait();
  console.log("Transaction completed!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
