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
  else if (roll > 7) return 'black';
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

export const handleRoll = (value: number) => goToValue(value);

function mod(a: number, b: number) {
  // I need the modulus operator, but in javascript, % is the remainder operator,
  // not modulus operator, so I'll have to create my own modulus operator.
  return ((a % b) + b) % b;
}

// -1788 is an arbitrary value that I chose to put the roulette in the beginning
var currentBackgroundPosition = mod(-1795, 2100);
var spinning = false;

var rouletteValues = [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8];

function getBackgroundPositionWhereValueIsCentered(value: number) {
  for (var i = 0; i < rouletteValues.length; i++) {
      if (rouletteValues[i] === value) {
          return -70 * i + 445;
      }
  }
  
  console.log("Invalid value given to this function: " + value);
  return null;
}

function animateSpinForBackgroundPosition(targetBackgroundPosition: number, time: number) {
  // This function makes the roulette spin until it reaches the given
  // background position (modulus 2100).
  
  if (spinning) return;
  
  var roulette: HTMLElement | null = document.getElementById("roulette");
  spinning = true;
  
  var timeBetweenSteps = 10; // move roulette every 10 milliseconds
  var amountOfSteps = Math.floor(time / timeBetweenSteps); // How many steps will it take
  
  function transitionFunction(startingValue: number, targetValue: number, currentTime: number, duration: number) {
    // How does the roulette spin? I will make it depend linearly on time
    return (1 - currentTime / duration) * startingValue + (currentTime / duration) * targetValue;
  }

  var intervalObject: any = null;
  var stepCount = 0;

  intervalObject = window.setInterval(function() {
      stepCount++;
      
      if (roulette) {
        roulette.style.backgroundPosition = transitionFunction(currentBackgroundPosition, targetBackgroundPosition, stepCount * timeBetweenSteps, time) + "px";
      }
      
      if (stepCount === amountOfSteps) {
          window.clearInterval(intervalObject);
          // by keeping the currentBackgroundPosition always between 0 and 2100,
          // since targetBackgroundPosition is always negative, we
          // automatically guarantee that the roulette will always spin in the same direction
          currentBackgroundPosition = mod(targetBackgroundPosition, 2100);
          spinning = false;
      }
  }, timeBetweenSteps);
}

function goToValue(value: number) {
  var bp: number | null = getBackgroundPositionWhereValueIsCentered(value);
  animateSpinForBackgroundPosition(-4200 + (bp ?? 0), 6000);
}