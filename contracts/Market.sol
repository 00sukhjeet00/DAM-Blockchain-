// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Market is ReentrancyGuard {
    address payable public immutable feeAccount;
    using SafeMath for uint256;
    uint256 public immutable feePercent;
    uint256 public itemCount;
    struct NFTItem {
        uint256 id;
        IERC721 nft;
        uint256 tokenID;
        uint256 price;
        address payable seller;
        bool sold;
    }
    event Offered(
        uint256 id,
        IERC721 nft,
        uint256 tokenID,
        uint256 price,
        address payable seller,
        bool sold
    );
    event Bought(
        uint256 id,
        IERC721 nft,
        uint256 tokenID,
        uint256 price,
        address indexed seller,
        address indexed buyer
    );
    mapping(uint256 => NFTItem) public items;

    constructor(uint256 _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItem(
        ERC721 _nft,
        uint256 tokenID,
        uint256 price
    ) external nonReentrant {
        require(price > 0, "Price must bee more then 0");
        itemCount++;
        _nft.transferFrom(msg.sender, address(this), tokenID);
        items[itemCount] = NFTItem(
            itemCount,
            _nft,
            tokenID,
            price,
            payable(msg.sender),
            false
        );
        emit Offered(
            itemCount,
            _nft,
            tokenID,
            price,
            payable(msg.sender),
            false
        );
    }
    function purchaseItem(uint _id) external payable nonReentrant{
        uint256 totalPrice=getTotalPrice(_id);
        NFTItem storage item=items[_id];
        require(_id>0 && _id<=itemCount,"NFT does't exist");
        require(msg.value>=totalPrice,"Not enough ether");
        require(!item.sold,"NFT Already Sold");
        item.seller.transfer(item.price);
        feeAccount.transfer(totalPrice-item.price);
        item.sold=true;
        item.nft.transferFrom(address(this), msg.sender, item.tokenID);
        emit Bought(
         item.id,
         item.nft,
         item.tokenID,
         item.price,
         item.seller,
         msg.sender
    );
    }
    function getTotalPrice(uint _id) view public returns(uint256){
        return items[_id].price+(items[_id].price.mul(feePercent)).div(10000);
    }
}
