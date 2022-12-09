import { web3, Roulette } from "./web3Provider.js";
import { ethers } from "ethers";

export const increaseFunds = async (value: string) => {
  try {
    const accounts = await web3.eth.getAccounts();
    await Roulette.methods.enter().send({
      from: accounts[0],
      value: ethers.utils.parseEther(value),
    });
    // dispatch(enterSuccess());
    // dispatch(updateState(accounts[0]));
  } catch (error) {
    console.log(error);
  }
}