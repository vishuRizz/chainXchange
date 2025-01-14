import hardhat from "hardhat";
import { expect } from "chai";
import "@nomicfoundation/hardhat-chai-matchers";

const { ethers } = hardhat;

describe("BarterBuy Contract", function () {
  let BarterBuy, barterBuy, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    BarterBuy = await ethers.getContractFactory("BarterBuy");
    barterBuy = await BarterBuy.deploy();
    await barterBuy.waitForDeployment();
  });

  it("should finalize a transaction with payment", async function () {
    const price = ethers.parseEther("1"); // 1 Ether
    await barterBuy.finalizeTransaction(1, 2, price, addr1.address, { value: price });

    const txn = await barterBuy.transactions(1);
    expect(txn.initiator).to.equal(owner.address);
    expect(txn.responder).to.equal(addr1.address);
    expect(txn.status).to.equal("pending");
    expect(txn.price.toString()).to.equal(price.toString());
  });

  it("should complete the transaction and transfer funds", async function () {
    const price = ethers.parseEther("1"); // 1 Ether
    await barterBuy.finalizeTransaction(1, 2, price, addr1.address, { value: price });
  
    const initialBalance = await ethers.provider.getBalance(addr1.address);
  
    const tx = await barterBuy.connect(addr1).completeTransaction(1);
    const receipt = await tx.wait();
  
    // Calculate gas cost
    const gasUsed = receipt.gasUsed;
    const gasPrice = tx.gasPrice;
    const gasCost = gasUsed * gasPrice;
  
    const finalBalance = await ethers.provider.getBalance(addr1.address);
    const balanceDifference = finalBalance - initialBalance + gasCost;
  
    expect(balanceDifference.toString()).to.equal(price.toString());
  });
  

  it("should correctly track transaction details", async function () {
    const price = ethers.parseEther("0.5"); // 0.5 Ether
    await barterBuy.finalizeTransaction(123, 456, price, addr1.address, { value: price });
  
    const txn = await barterBuy.transactions(1);
    expect(txn.item1Id.toString()).to.equal("123");
    expect(txn.item2Id.toString()).to.equal("456");
    expect(txn.price.toString()).to.equal(price.toString());
  });

  it("should revert if payment is incorrect", async function () {
    const price = ethers.parseEther("1"); // 1 Ether
    await expect(
      barterBuy.finalizeTransaction(1, 2, price, addr1.address, { value: ethers.parseEther("0.5") })
    ).to.be.revertedWith("Incorrect payment amount");
  });
});
