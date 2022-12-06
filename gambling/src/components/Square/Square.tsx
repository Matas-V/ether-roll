import { Box, Typography } from "@mui/material";

interface SquareProps {
  color: string,
  number: number,
};

export const Square = ({ color, number }: SquareProps) => {
  return (
    <Box sx={{ backgroundColor: `${color}` }} className="square">
      <Typography variant="h6" color="white">
        {number}
      </Typography>
    </Box>
  )
}