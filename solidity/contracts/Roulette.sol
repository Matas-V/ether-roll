// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Roulette {
    address public bankAddress;
    uint256 immutable ROULETTE_NUMBER_COUNT = 37;
    uint256[] spinsHistory;
    address[] players;
    bool[37] isNumberRed = [false, true, false, true, false, true, false, true, false, true, false, false, true, false, true, false, true, false, true, true, false, true, false, true, false, true, false, true, false, false, true, false, true, false, true, false, true];
    
    constructor() {
        bankAddress = msg.sender;
    }

    struct GameRound {
        uint256 betAmount;
        string betColor;
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

        gameRounds[msg.sender].betAmount = amount * 1000000000000000000;
        gameRounds[msg.sender].betColor = color;
        registeredFunds[msg.sender] -= amount;
    }

    function resetGameRound(address userAddress) private {
        gameRounds[userAddress] = GameRound(0, "");
    }

    function start() public {
        require(msg.sender != bankAddress);
        require(!approvedPlayer[msg.sender], "Player is already approved");
        approvedPlayer[msg.sender] = true;
        players.push(msg.sender);
    }

    function test() public view returns(address[] memory){
        return players;
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
                else registeredFunds[player] -= gameRounds[player].betAmount;
                resetGameRound(player);
            }
        }
    }
}
// pragma solidity ^0.8.7;

// import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/VRFConsumerBaseV2.sol";

// /**
//  * Request testnet LINK and ETH here: https://faucets.chain.link/
//  * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
//  */

// contract Roulette is VRFConsumerBase {
//     bytes32 internal keyHash;
//     uint256 internal fee;
//     address payable public owner;
//     uint256 public randomResult;
//     uint public gameId;
//     uint256 public lastGameId;

//     struct Spin {
//         uint requestId;
//         string bet;
//         uint256 amount;
//         address payable player;
//         string spin_result;
//         uint spin_result_number;
//     }

//     event RequestFulfilled(bytes32 requestId, uint256 randomness);
//     event Result (uint256 id, string bet, uint amount, address player, string winColor, uint256 randomResult);
//     event Received (address indexed sender, uint256 amount);
//     event Withdraw (address admin, uint256 amount);

//     mapping(uint => Spin) public Spins;

//     /**
//      * Constructor inherits VRFConsumerBase
//      *
//      * Network: Goerli
//      * Chainlink VRF Coordinator address: 0x2bce784e69d2Ff36c71edcB9F88358dB0DfB55b4
//      * LINK token address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
//      * Key Hash: 0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a
//      */
//     constructor()
//         VRFConsumerBase(
//             0x3d2341ADb2D31f1c5530cDC622016af293177AE0, // VRF Coordinator
//             0xb0897686c545045aFc77CF20eC7A532E3120E0F1 // LINK Token
//         )
//     {
//         keyHash = 0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da;
//         fee = 0.0001 * 10 ** 18; // 0.0001 LINK
//         owner = payable(msg.sender);
//     }

//     function spin(string memory bet) public payable {
//         require(LINK.balanceOf(address(this)) >= fee, "Not enough Link in the contract");
//         require(compareStrings(bet, "red") || compareStrings(bet, "black") || compareStrings(bet, "green"), "Bet can only be blakc, red or green");
//         require(address(this).balance >= msg.value*2 && !compareStrings(bet, "green"), "Insufficent funds in contract");
//         require(address(this).balance >= msg.value*14 && compareStrings(bet, "green"), "Insufficent funds in contract");
//         require(msg.value >= 0, "Please enter a bet");

//         Spins[gameId] = Spin(gameId, bet, msg.value, payable(msg.sender), '', 0);
//         gameId++;
//         getRandomNumber();
//     }

//     function compareStrings(string memory a, string memory b) public pure returns(bool) {
//         return (keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b))); 
//     }

//     function getRandomNumber() public returns (bytes32 requestId) {
//         require(
//             LINK.balanceOf(address(this)) >= fee,
//             "Not enough LINK - fill contract with faucet"
//         );
//         return requestRandomness(keyHash, fee);
//     }

//     function fulfillRandomness(
//         bytes32 requestId,
//         uint256 randomness
//     ) internal override {
//         randomResult = (randomness % 37);
//         payOut();
//         emit RequestFulfilled(requestId, randomness);
//     }

//     function payOut() public returns(uint256) {
//         for(uint i=lastGameId; i < gameId; i++) {
//             uint winAmount = 0;
//             string memory winColor = "";

//             if (
//                 (randomResult <= 18 && compareStrings(Spins[i].bet, "red")) ||
//                 (randomResult > 18 && compareStrings(Spins[i].bet, "black"))
//             ) {
//                 winAmount = Spins[i].amount*2;
//                 Spins[i].player.transfer(winAmount);
//             } else if (randomResult == 0 && compareStrings(Spins[i].bet, "green")) {
//                 winAmount = Spins[i].amount*14;
//                 Spins[i].player.transfer(winAmount);
//             }

//             if (randomResult <= 18) {
//                 winColor = "red";
//             } else if (randomResult >= 19) {
//                 winColor = "black";
//             } else if (randomResult == 0) {
//                 winColor = "green";
//             }

//             Spins[i] = Spin(i, Spins[i].bet, Spins[i].amount, Spins[i].player, winColor, randomResult);
//             emit Result(i, Spins[i].bet, Spins[i].amount, Spins[i].player, winColor, randomResult);
//         }
//         lastGameId=gameId;
//         return lastGameId;
//     }

//     receive() external payable {
//         emit Received(msg.sender, msg.value);
//     }

//     function WithDrawEther(uint256 amount) public {
//         require(address(this).balance >= amount, "Funds not there");
//         owner.transfer(amount);

//         emit Withdraw(owner, amount);
//     }
// }
