// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract XPromptMarketplace is ERC1155Holder {
    using SafeMath for uint256;

    struct Listing {
        address seller;
        uint256 tokenId;
        uint256 price; // Added price to the struct
        uint256 quantity;
        bool active;
    }

    mapping(uint256 => Listing) public listings;
    mapping(address => uint256[]) public userNFTs;
    mapping(uint256 => uint256) public tokenToListingId;

    address public tokenContract; // Address of the ERC1155 token contract
    uint256 public tokenIdCounter;

    event ListingCreated(
        address indexed seller,
        uint256 indexed tokenId,
        uint256 price,
        uint256 quantity
    );
    event ListingCancelled(uint256 indexed tokenId);
    event SaleCompleted(
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 price,
        uint256 quantity
    );

    constructor(address _tokenContract) {
        tokenContract = _tokenContract;
        tokenIdCounter = 0;
    }

    function createListing(
        uint256 tokenId,
        uint256 price,
        uint256 quantity
    ) external {
        IERC1155(tokenContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId,
            quantity,
            ""
        );

        listings[tokenIdCounter] = Listing({
            seller: msg.sender,
            tokenId: tokenId,
            price: price,
            quantity: quantity,
            active: true
        });

        tokenToListingId[tokenId] = tokenIdCounter;

        userNFTs[msg.sender].push(tokenIdCounter);

        emit ListingCreated(msg.sender, tokenId, price, quantity);

        tokenIdCounter++;
    }

    function cancelListing(uint256 tokenId) external {
        require(listings[tokenId].active, "Listing is not active");
        require(
            listings[tokenId].seller == msg.sender,
            "Only the seller can cancel the listing"
        );

        IERC1155(tokenContract).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            listings[tokenId].quantity,
            ""
        );

        delete listings[tokenId];

        emit ListingCancelled(tokenId);
    }

    function buyToken(uint256 tokenId, uint256 quantity) external payable {
        require(listings[tokenId].active, "Listing is not active");
        require(
            msg.value >= listings[tokenId].price.mul(quantity),
            "Insufficient funds"
        );
        require(
            listings[tokenId].quantity >= quantity,
            "Insufficient quantity available"
        );

        address seller = listings[tokenId].seller;
        uint256 price = listings[tokenId].price;

        IERC1155(tokenContract).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            quantity,
            ""
        );

        payable(seller).transfer(price.mul(quantity));

        listings[tokenId].quantity = listings[tokenId].quantity.sub(quantity);
        if (listings[tokenId].quantity == 0) {
            delete listings[tokenId];
        }

        emit SaleCompleted(msg.sender, tokenId, price, quantity);
    }

    function getListedTokens() external view returns (Listing[] memory) {
        Listing[] memory listedTokens = new Listing[](
            getNumberOfListedTokens()
        );
        uint256 index = 0;

        for (uint256 i = 0; i < tokenIdCounter; i++) {
            if (listings[i].active) {
                listedTokens[index] = listings[i];
                index++;
            }
        }

        return listedTokens;
    }

    function getUserListedTokens(
        address user
    ) external view returns (Listing[] memory) {
        uint256[] memory userTokens = userNFTs[user];
        Listing[] memory listedTokens = new Listing[](userTokens.length);

        for (uint256 i = 0; i < userTokens.length; i++) {
            uint256 tokenId = userTokens[i];
            listedTokens[i] = listings[tokenId];
        }

        return listedTokens;
    }

    function getListingIdForToken(
        uint256 tokenId
    ) external view returns (uint256) {
        return tokenToListingId[tokenId];
    }

    function getNumberOfUserListedTokens(
        address user
    ) external view returns (uint256) {
        return userNFTs[user].length;
    }

    function getNumberOfListedTokens() public view returns (uint256) {
        uint256 count = 0;

        for (uint256 i = 0; i < tokenIdCounter; i++) {
            if (listings[i].active) {
                count++;
            }
        }

        return count;
    }
}
