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

    struct ParticipantStruct {
        address account;
        string lotteryNumber;
        bool paid;
    }

    uint256 public servicePercent;
    uint256 public serviceBalance;

    mapping(uint256 => GiveawayData) giveaways;
    mapping(uint256 => string[]) giveawayLuckyNumbers;
    mapping(uint256 => mapping(uint256 => bool)) luckyNumberUsed;
    mapping(uint256 => ParticipantStruct[]) giveawayParticipants;

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
        giveaway.createdAt = currentTime();
        giveaway.expiresAt = expiresAt;

        giveaways[giveaway.id] = giveaway;
    }

    function currentTime() internal view returns (uint256){
        uint256 newNum = (block.timestamp * 1000) + 1000;
        return newNum;
    }

    function importLuckyNumbers(uint256 id, string[] memory luckyNumbers)
        public
    {
        require(luckyNumbers.length > 0, "Lucky numbers cannot be zero");
        require(giveaways[id].owner == msg.sender, "Unauthorized entity");
        require(giveawayLuckyNumbers[id].length < 1, "Already generated");
        require(giveaways[id].participants < 1, "Giveaway Fees have been paid");
        giveawayLuckyNumbers[id] = luckyNumbers;
    }

    function buyTicket(uint256 id, uint256 luckyNumberId) public payable {
        require(
            !luckyNumberUsed[id][luckyNumberId],
            "Lucky number already used"
        );
        require(
            msg.value >= giveaways[id].fee,
            "insufficient hBars to buy giveaway ticket"
        );

        giveaways[id].participants++;
        giveawayParticipants[id].push(
            ParticipantStruct(
                msg.sender,
                giveawayLuckyNumbers[id][luckyNumberId],
                false
            )
        );
        luckyNumberUsed[id][luckyNumberId] = true;
        serviceBalance += msg.value;
    }

    

}