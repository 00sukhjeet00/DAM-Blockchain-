require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "134f166af1a0fee3732af5ddd624676114f95f9492ef0a447b626e2037f84f3b",
      ],
    },
  },
};
