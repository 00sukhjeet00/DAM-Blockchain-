require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "c49ae049a48e66103acaa31b49328187fcbb3a7cef742b8e46be4f043931fc9f",
        "c7e533a961f775ac84d690510b2eff934f3bf67b33a1492946d388612a81ad0e",
      ],
    },
  },
};
