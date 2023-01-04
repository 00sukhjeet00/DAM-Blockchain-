// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract NFT is ERC721URIStorage{
    uint public tokenID;
    constructor() ERC721("DAM","DM"){}
    function  mint(string memory _token) external returns(uint){
        tokenID++;
        _safeMint(msg.sender,tokenID);
        _setTokenURI(tokenID,_token);
        return tokenID;
    }
}