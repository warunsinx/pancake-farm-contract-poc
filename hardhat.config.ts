import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import accountUtils from "./utils/accountUtils";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.6.12",
      },
    ],
  },
  networks: {
    bkc_test: {
      url: "https://rpc-testnet.bitkubchain.io",
      accounts: accountUtils.getAccounts(),
    },
    bsc_test: {
      url: "https://bsc-testnet.publicnode.com",
      accounts: accountUtils.getAccounts(),
    },
  },
};

export default config;
