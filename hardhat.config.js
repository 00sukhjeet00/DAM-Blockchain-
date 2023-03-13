require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0xe43875daee85a6023e8e33d937a31acfbb34cb4c5f52e36776f368e6e2b1b788",
      ],
    },
  },
};
