// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MeOnchain is ERC721, Ownable {

    struct NFTMetadata {
        string tokenURI;
        bool isPublic;
    }

    bool public _transferPaused;
    IERC20 public _feeToken;
    uint256 public _mintFee;
    uint256 public _limitFreeMint;
    uint256 public _totalSupply;

    mapping(uint256 => NFTMetadata) public _tokenMetadata;

    constructor(address feeToken, uint256 limitFreeMint) ERC721("MeOnchain", "MOC") Ownable(msg.sender){
        _feeToken = IERC20(feeToken);
        _limitFreeMint = limitFreeMint;
        _totalSupply = 0;
        _mintFee = 0; // Default minting fee
    }

    function mint(string memory tokenURI, bool isPublic) public returns (uint256 tokenId) {
        if (balanceOf(msg.sender) >= _limitFreeMint) {
            _feeToken.transferFrom(msg.sender, owner(), _mintFee);
        }
        tokenId = _totalSupply + 1;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI, isPublic);
        _totalSupply++;
    }

    // function isPublicToken(uint256 tokenId) public view returns (bool) {
    //     require(_exists(tokenId), "Token does not exist");
    //     return _tokenMetadata[tokenId].isPublic;
    // }

    function _setTokenURI(uint256 tokenId, string memory tokenURI, bool isPublic) internal {
        _tokenMetadata[tokenId].tokenURI = tokenURI;
        _tokenMetadata[tokenId].isPublic = isPublic;
    }

    function updateStatus(uint256 tokenId, bool isPublic) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Unauthorized");
        _tokenMetadata[tokenId].isPublic = isPublic;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        if (!_tokenMetadata[tokenId].isPublic) {
            require(ownerOf(tokenId) == msg.sender || msg.sender == owner(), "Unauthorized");
        }
        return _tokenMetadata[tokenId].tokenURI;
    }

    function setPauseTransfer(bool isPause) external onlyOwner {
        _transferPaused = isPause;
    }

    function setLimitFree(uint256 limitToken) external onlyOwner {
        _limitFreeMint = limitToken;
    }

    function setAllowedToken(address tokenAddress) external onlyOwner {
        require(tokenAddress != address(0), "Invalid token address");
        _feeToken = IERC20(tokenAddress);
    }

    function setFeePerMint(uint256 mintFeeAmount) external onlyOwner {
        _mintFee = mintFeeAmount;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual {
        require(!_transferPaused || from == owner() || to == owner(), "Token transfer paused");
    }

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}