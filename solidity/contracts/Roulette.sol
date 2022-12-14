// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Roulette {
    address public bankAddress;
    uint256 immutable ROULETTE_NUMBER_COUNT = 14;
    uint256[] spinsHistory;
    address[] players;
    bool[15] isNumberRed = [false, true, true, true, true, true, true, true, false, false, false, false, false, false, false];
    
    constructor() {
        bankAddress = msg.sender;
    }

    struct GameRound {
        uint256 betAmount;
        string betColor;
        address player;
    }

    mapping(address => GameRound) gameRounds;
    mapping(address => uint256) registeredFunds;
    mapping(address => bool) approvedPlayer;

    function increaseFunds() public payable {
        require(msg.value > 0, "Must send ETH");
        registeredFunds[msg.sender] += msg.value;
    }

    function withdrawMoney() public {
        require(registeredFunds[msg.sender] > 0, "You must enter an amount");
        require(registeredFunds[bankAddress] >= registeredFunds[msg.sender], "Not enough funds in the bank");

        uint256 funds = registeredFunds[msg.sender];
        registeredFunds[bankAddress] -= funds;
        registeredFunds[msg.sender] = 0;

        (bool wasSuccessful, ) = msg.sender.call{value: funds}("");
        require(wasSuccessful, "ETH transfer failed");
    }

    function placeBet(string memory color, uint256 amount) public {
        require(approvedPlayer[msg.sender], "Player needs to be approved");
        require(registeredFunds[msg.sender] >= amount, "Not enough user funds");

        gameRounds[msg.sender].betAmount = amount;
        gameRounds[msg.sender].betColor = color;
        gameRounds[msg.sender].player = msg.sender;
        registeredFunds[msg.sender] -= amount;
    }

    function getPlayers() public view returns(address [] memory) {
        return players;
    }

    function resetGameRound(address userAddress) private {
        gameRounds[userAddress] = GameRound(0, "", userAddress);
    }

    function start() public {
        if (approvedPlayer[msg.sender] != true) {
            approvedPlayer[msg.sender] = true;
            players.push(msg.sender);
        }
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function getAvailableFunds() public view returns (uint256) {
        return registeredFunds[msg.sender];
    }

    function getSpinsHistory() public view returns (uint256[] memory) {
        return spinsHistory;
    }

    function getPlayerLastGameRound() public view returns (GameRound memory) {
        return gameRounds[msg.sender];
    }

    function spinWheel() public {
        require(msg.sender == bankAddress, "Only contract owner can spin roulette");
        uint256 number = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % ROULETTE_NUMBER_COUNT;
        spinsHistory.push(number);
        string memory color;

        if (number == 0) color = "green";
        else if (isNumberRed[number]) color = "red";
        else color = "black";

        for (uint256 i=0; i<players.length; i++) {
            address player = players[i];
            if (gameRounds[player].betAmount != 0) {
                if (compareStrings(gameRounds[player].betColor, color) && compareStrings(color, "green")) registeredFunds[player] += gameRounds[player].betAmount*14;
                else if (compareStrings(gameRounds[player].betColor, color)) registeredFunds[player] += gameRounds[player].betAmount*2;
                resetGameRound(player);
            }
        }
    }
}