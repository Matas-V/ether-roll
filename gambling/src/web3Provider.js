import Web3 from "web3";
import RouletteJSON from "../../solidity/build/contracts/Roulette.json";

const contract_address = "0xf85852B6273080aA172C1cF4931bf6B0Ceb41E34";
export const web3 = new Web3(window.ethereum.currentProvider || "http://127.0.0.1:8545");
web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:8545"));

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts[0]);
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });
  // 0xfAd6DA8D9e4cB2346eEa1AD5e6274BA2dEc93001
  console.log("deployed to", result.options.address);
  console.log(abi, "interface");
};
// deploy();

export const Roulette = new web3.eth.Contract(RouletteJSON.abi, contract_address);