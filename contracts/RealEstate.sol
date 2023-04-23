//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// ERC721URIStorage is a contract that inherits from ERC721 and adds the ability to store a tokenURI for each token.
//This is useful if you want to store the metadata off-chain,
//or if you want to store it on-chain but in a way that is not as expensive as storing it directly in the token itself.
contract RealEstate is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Real Estate", "REAL") {}

    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        

        //In blockchain, minting means validating information,
        //creating a new block, and recording that information into the blockchain1.
        //It is a process of creating or producing something2.
        //Minting supports validating transactions in Proof-of-Stake (PoS) blockchain networks3.

        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current() ;
    }
}
