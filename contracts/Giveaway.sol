//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Giveaway is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _totalGiveaways;

     struct GiveawayData {
        uint256 id;
        string title;
        string description;
        string image;
        uint256 prize;
        uint256 fee;
        uint256 participants;
        bool drawn;
        address owner;
        uint256 createdAt;
        uint256 expiresAt;
    }

     mapping(uint256 => GiveawayData) giveaways;

     function createGiveaway(
        string memory title,
        string memory description,
        string memory image,
        uint256 prize,
        uint256 fee,
        uint256 expiresAt
    ) public {
        require(bytes(title).length > 0, "title cannot be empty");
        require(bytes(description).length > 0, "description cannot be empty");
        require(bytes(image).length > 0, "image cannot be empty");
        require(prize > 0 ether, "prize cannot be zero");
        require(fee > 0 ether, "fee cannot be zero");
        require(
            expiresAt > currentTime(),
            "expireAt cannot be less than the future"
        );

        _totalGiveaways.increment();
        GiveawayData memory giveaway;

        giveaway.id = _totalGiveaways.current();
        giveaway.title = title;
        giveaway.description = description;
        giveaway.image = image;
        giveaway.prize = prize;
        giveaway.fee = fee;
        giveaway.owner = msg.sender;
        giveaway.createdAt = block.timestamp;
        giveaway.expiresAt = expiresAt;

        giveaways[giveaway.id] = giveaway;
    }

    function currentTime() internal view returns (uint256){
        uint256 newNum = (block.timestamp * 1000) + 1000;
        return newNum;
    }

}