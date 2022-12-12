import { ethers } from "ethers";
import { betsStateProps } from "./App";

const BET_INFO_COLOR_INDEX = 1;
const BET_INFO_NUMBER_INDEX = 0;
const BET_INFO_NAME_INDEX = 2;

export const initialBetInfoState: betsStateProps = {
  red: { names: [], values: [] },
  black: { names: [], values: [] },
  green: { names: [], values: [] },
};

export const getColor = (roll: number) => {
  if (roll === 0) return 'green';
  else if (roll % 2 === 0) return 'black';
  else return 'red';
}

export const betInfoAddToState = (state: betsStateProps, bet: [number, string, string]) => {
  if (bet[BET_INFO_COLOR_INDEX] === "red") {
    return {
      ...state,
      red: {
        names: [...state.red.names, bet[BET_INFO_NAME_INDEX]],
        values: [...state.red.values, ethers.utils.formatEther(bet[BET_INFO_NUMBER_INDEX].toString())],
      }
    }
  } else if (bet[BET_INFO_COLOR_INDEX] === "black") {
    return {
      ...state,
      black: {
        names: [...state.black.names, bet[BET_INFO_NAME_INDEX]],
        values: [...state.black.values, ethers.utils.formatEther(bet[BET_INFO_NUMBER_INDEX].toString())],
      }
    }
  } else {
    return {
      ...state,
      green: {
        names: [...state.green.names, bet[BET_INFO_NAME_INDEX]],
        values: [...state.green.values, ethers.utils.formatEther(bet[BET_INFO_NUMBER_INDEX].toString())],
      }
    }
  }
}