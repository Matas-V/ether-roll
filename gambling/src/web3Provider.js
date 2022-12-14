import Web3 from "web3";
import RouletteJSON from "../../solidity/build/contracts/Roulette.json";

// address from deployed contract in remix
const contract_address = "0xaF12de8C11a7808F1C26A2A6e683b038d813457A";
export const manager_address = "0xfF37988A4df052Bf652fd59334D0CfA98f3c3ff4";
export const web3 = new Web3(window.ethereum.currentProvider || "http://127.0.0.1:8545");
web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:8545"));

export const ganacheIndexes = [0,1,2,3,4,5,6,7,8,9];
export const Roulette = new web3.eth.Contract(RouletteJSON.abi, contract_address);