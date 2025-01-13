import hardhat from "hardhat";
import { expect } from "chai";

const { ethers } = hardhat;

describe("BarterBuy Contract", function () {
  let BarterBuy, barterBuy, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    BarterBuy = await ethers.getContractFactory("BarterBuy");
    barterBuy = await BarterBuy.deploy();
    await barterBuy.deployed();
  });

  it("should finalize a transaction", async function () {
    await barterBuy.finalizeTransaction(1, 2, 100, addr1.address);

    const txn = await barterBuy.transactions(1);
    expect(txn.initiator).to.equal(owner.address);
    expect(txn.responder).to.equal(addr1.address);
    expect(txn.status).to.equal("pending");
  });

  it("should complete the transaction", async function () {
    await barterBuy.finalizeTransaction(1, 2, 100, addr1.address);
    await barterBuy.connect(addr1).completeTransaction(1);

    const txn = await barterBuy.transactions(1);
    expect(txn.status).to.equal("completed");
  });

  it("should correctly track transaction details", async function () {
    await barterBuy.finalizeTransaction(123, 456, 200, addr1.address);
  
    const txn = await barterBuy.transactions(1);
    expect(txn.item1Id.toString()).to.equal("123"); 
    expect(txn.item2Id.toString()).to.equal("456"); 
    expect(txn.price.toString()).to.equal("200");  
  });
  
});
