import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import { removeConsoleLog } from "hardhat-preprocessor";
import { HardhatRuntimeEnvironment } from "hardhat/types";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    mainnet: {
      url: process.env.MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY_MAINNET !== undefined
          ? [process.env.PRIVATE_KEY_MAINNET]
          : [],
      gasPrice: 120000000000,
      gasMultiplier: 1.3,
    },
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: 200,
      },
      forking: {
        url: process.env.MAINNET_URL || "",
        blockNumber: 14177424,
      },
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    gasPrice: 70,
    coinmarketcap: process.env.COINMARKETCAP,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  preprocess: {
    eachLine: removeConsoleLog(
      (hre: HardhatRuntimeEnvironment) =>
        (hre.network.name !== "hardhat" && hre.network.name !== "localhost") ||
        process.env.HIDE_CONTRACT_LOGS === "true"
    ),
  },

  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
};

export default config;
