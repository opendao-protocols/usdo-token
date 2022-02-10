import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const config: HardhatUserConfig = {
  networks: {
    bsc: {
      url: process.env["BSC_RPC"] || "https://bsc-dataseed.binance.org/",
      accounts: [process.env["PRIVATE_KEY"]],
    },
    metis: {
      url: process.env["METIS_RPC"] || "https://andromeda.metis.io/?owner=1088",
      accounts: [process.env["PRIVATE_KEY"]],
    },
    avalanche: {
      url: process.env["AVALANCHE_RPC"] || "https://api.avax.network/ext/bc/C/rpc",
      accounts: [process.env["PRIVATE_KEY"]],
    },
    aurora: {
      url: process.env["AURORA_RPC"] || "https://mainnet.aurora.dev/",
      accounts: [process.env["PRIVATE_KEY"]],
    },
  },
  etherscan: {
    apiKey: process.env["ETHERSCAN_API_KEY"],
  },
  solidity: {
    version: "0.5.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
};

export default config;
