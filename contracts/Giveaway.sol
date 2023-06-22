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
        string giveawayNumber;
        bool paid;
    }

    struct GiveawayResultStruct {
        uint256 id;
        bool completed;
        bool paidout;
        uint256 timestamp;
        uint256 sharePerWinner;
        ParticipantStruct[] winners;
    }

    uint256 public servicePercent;
    uint256 public serviceBalance;

    mapping(uint256 => GiveawayData) giveaways;
    mapping(uint256 => string[]) giveawayLuckyNumbers;
    mapping(uint256 => mapping(uint256 => bool)) luckyNumberUsed;
    mapping(uint256 => ParticipantStruct[]) giveawayParticipants;
    mapping(uint256 => GiveawayResultStruct) giveawayResult;

    constructor(uint256 _servicePercent){
        servicePercent = _servicePercent;
    }

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

    function randomlySelectWinners(
        uint256 id,
        uint256 numOfWinners
    ) public {
        require(
            giveaways[id].owner == msg.sender ||
            giveaways[id].owner == owner(),
            "Unauthorized entity"
        ); //any owner of the platform can randomly generate winners
        require(!giveawayResult[id].completed, "Giveaway has already been completed");
        require(
            numOfWinners <= giveawayParticipants[id].length,
            "Number of winners exceeds number of participants"
        );

        // Initialize an array to store the selected winners
        ParticipantStruct[] memory winners = new ParticipantStruct[](numOfWinners);
        ParticipantStruct[] memory participants = giveawayParticipants[id];

        // Initialize the list of indices with the values 0, 1, ..., n-1
        uint256[] memory indices = new uint256[](participants.length);
        for (uint256 i = 0; i < participants.length; i++) {
            indices[i] = i;
        }

        // Shuffle the list of indices using Fisher-Yates algorithm
        for (uint256 i = participants.length - 1; i >= 1; i--) {
            uint256 j = uint256(
                keccak256(abi.encodePacked(currentTime(), i))
            ) % (i + 1);
            uint256 temp = indices[j];
            indices[j] = indices[i];
            indices[i] = temp;
        }

         // Select the winners using the first numOfWinners indices
        for (uint256 i = 0; i < numOfWinners; i++) {
            winners[i] = participants[indices[i]];
            giveawayResult[id].winners.push(winners[i]);
        }

        giveawayResult[id].completed = true;
        giveawayResult[id].timestamp = currentTime();
        // giveaways[id].winners = giveawayResult[id].winners.length;
        giveaways[id].drawn = true;

        payGiveawayWinners(id);
    }

    function payGiveawayWinners(uint256 id) internal {
        ParticipantStruct[] memory winners = giveawayResult[id].winners;
        uint256 totalShares = giveaways[id].fee * giveawayParticipants[id].length;
        uint256 platformShare = (totalShares * servicePercent) / 100 ;
        uint256 netShare = totalShares - platformShare;
        uint256 sharesPerWinner = netShare / winners.length;

        for (uint256 i = 0; i < winners.length; i++) 
        payTo(winners[i].account, sharesPerWinner);

        payTo(owner(), platformShare);
        serviceBalance -= totalShares;
        giveawayResult[id].id = id;
        giveawayResult[id].paidout = true;
        giveawayResult[id].sharePerWinner = sharesPerWinner;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function getGiveaways() public view returns (GiveawayData[] memory Giveaways) {
        Giveaways = new GiveawayData[](_totalGiveaways.current());

        for (uint256 i = 1; i <= _totalGiveaways.current(); i++) {
            Giveaways[i - 1] = giveaways[i];
        }
    }

    function getGiveaway(uint256 id) public view returns (GiveawayData memory) {
        return giveaways[id];
    }

    function getGiveawayParticipants(uint256 id) public view returns (ParticipantStruct[] memory) {
        return giveawayParticipants[id];
    }

    function getGiveawayLuckyNumbers(uint256 id) public view returns (string[] memory) {
        return giveawayLuckyNumbers[id];
    }

    function getGiveawayResult(uint256 id) public view returns (GiveawayResultStruct memory) {
        return giveawayResult[id];
    }

}