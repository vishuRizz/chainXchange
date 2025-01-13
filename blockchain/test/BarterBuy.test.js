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

    // Assign initial ownership of items using the new public function
    await barterBuy.setItemOwnership(1, owner.address); // Item 1 belongs to owner
    await barterBuy.setItemOwnership(2, addr1.address); // Item 2 belongs to addr1
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

  it("should transfer ownership after completing the transaction", async function () {
    await barterBuy.finalizeTransaction(1, 2, 100, addr1.address);
    await barterBuy.connect(addr1).completeTransaction(1);

    // Verify ownership is transferred
    expect(await barterBuy.itemOwners(1)).to.equal(addr1.address);
    expect(await barterBuy.itemOwners(2)).to.equal(owner.address);
  });
});
