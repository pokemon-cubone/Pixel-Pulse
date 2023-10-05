// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract Nft is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);

    struct nftData{
        uint tokenIds;
        string tokenIpfsUri;
    }

    
    mapping (address => nftData[]) TokenToUser;

    constructor() ERC721("PoO Certificate", "PoO") {}

    function safeMint(address to, string memory uri, uint256 _tokenId) public {
        
        _safeMint(to, _tokenId);
        _setTokenURI(_tokenId, uri);
    }

    function storeNft(address _to, string memory _uri,bool _mint) public{
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        if(_mint == true){
            safeMint(_to,_uri,tokenId);
        }
        TokenToUser[_to].push(nftData(tokenId,_uri));

    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner of the token can burn it");
        _burn(tokenId);
    }

    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256) pure  internal {
        require(from == address(0) || to == address(0), "Not allowed to transfer token");
    }

    function _afterTokenTransfer(address from, address to, uint256 tokenId)  internal {

        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function getTokenIds(address _user) public view returns(nftData[] memory)
    {
        return TokenToUser[_user];
    }
    
}