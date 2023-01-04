const { expect } = require("chai");
const { ethers } = require("hardhat");
const toWeit=(num)=> ethers.utils.parseEther(num.toString());
describe("NFT", async function () {
  let deployer, addr1, addr2, market, nft;
  const token = "Sample";
  beforeEach(async function () {
    const NFT = await ethers.getContractFactory("NFT");
    const Market = await ethers.getContractFactory("Market");
    [deployer, addr1, addr2] = await ethers.getSigners();
    nft = await NFT.deploy();
    market = await Market.deploy(2);
  });
  describe("Deployment", function () {
    it("NFT:", async function () {
      expect(await nft.name()).to.equal("DAM");
      expect(await nft.symbol()).to.equal("DM");
    });
    it("Market:", async function () {
      expect(await market.feeAccount()).to.equal(deployer.address);
      expect(await market.feePercent()).to.equal(2);
    });
  });
  describe("Mint NFT", function () {
    it("Mint the NFT", async function () {
      await nft.connect(addr1).mint(token);
      expect(await nft.tokenID()).to.equal(1);
      expect(await nft.balanceOf(addr1.address)).to.equal(1);
      expect(await nft.tokenURI(1)).to.equal(token);
    });
  });

  describe("Publish NFT", function () {
    beforeEach(async function () {
      await nft.connect(addr1).mint(token);
      await nft.connect(addr1).setApprovalForAll(market.address, true);
    });
    it("Publish the NFT", async function () {
      await expect(market.connect(addr1).makeItem(nft.address, 1, toWeit(1)))
        .to.emit(market, "Offered")
        .withArgs(1,nft.address,1,toWeit(1),addr1.address,false);
        expect(await nft.ownerOf(1)).to.equal(market.address);
        expect(await market.itemCount()).to.equal(1);
    });
  });
});
