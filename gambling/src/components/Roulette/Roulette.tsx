import { Box } from "@mui/material";
import { Square } from "../index";

const ROULETTE_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const getColor = (num: number) => {
  if (num == 0) return "green";
  else if (num % 2) return "black";
  else return "red";
};

interface RouletteProps {
  rolledNumber: number,
}

export const Roulette = ({ rolledNumber }: RouletteProps) => {
  return (
    <Box className="roulette-con">
      {ROULETTE_NUMBERS.map((number: number) => (
        <Square key={number} number={number} color={getColor(number)} />
      ))}
      <div className="marker" />
    </Box>
  )
}