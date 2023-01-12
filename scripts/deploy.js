const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const NFT=await ethers.getContractFactory("NFT");
  const nft=await NFT.deploy();
  console.log(nft.address);
  const Market=await ethers.getContractFactory("Market");
  const market=await Market.deploy(200);
  console.log('market: ', market.address);
  saveFrontendFiles(nft,"NFT");
  saveFrontendFiles(market,"Market");
}
function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
