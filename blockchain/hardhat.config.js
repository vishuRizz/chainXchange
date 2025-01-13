import { config as dotenvConfig } from "dotenv";
import "@nomiclabs/hardhat-ethers";

// Load environment variables from `.env` file
dotenvConfig();

export default {
  solidity: "0.8.0",
  networks: {
    hardhat: {},
    // Uncomment and configure the Goerli network if needed
    // goerli: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
};
