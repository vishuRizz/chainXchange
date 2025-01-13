import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const BarterBuy = await hre.ethers.getContractFactory("BarterBuy");
  const barterBuy = await BarterBuy.deploy();

  await barterBuy.deployed();

  console.log("BarterBuy deployed to:", barterBuy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
