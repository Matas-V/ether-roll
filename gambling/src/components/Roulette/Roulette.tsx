import { Box } from "@mui/material";
import { getColor } from "../../utils";
import { Square } from "../index";

const ROULETTE_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

interface RouletteProps {
  rolledNumber: number,
}

export const Roulette = ({ rolledNumber }: RouletteProps) => {

  const position = ROULETTE_NUMBERS.indexOf(rolledNumber);

  return (
    <Box className="roulette-con">
      {ROULETTE_NUMBERS.map((number: number) => (
        <Square key={number} number={number} color={getColor(number)} />
      ))}
      <div className="marker" />
    </Box>
  )
}