import { Box, Button, Typography, Avatar, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaEthereum } from "react-icons/fa";

interface StyledButtonProps extends ButtonProps {
  bgColor?: string;
};

const StyledButton = styled(Button)<StyledButtonProps>((props) => ({
  backgroundColor: props.bgColor,
  border: `solid 2px ${props.bgColor}`,
  fontWeight: 800,
  '&:hover': {
    backgroundColor: '#313740',
    color: props.bgColor,
  }
}));

interface PlaceBetColumnProps {
  color: string,
  betters: [],
  handleBet: (color: string, amount: number) => void,
  betAmount: number,
};

export const PlaceBetColumn = ({ color, betters, handleBet, betAmount }: PlaceBetColumnProps) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" my={1} gap={5} sx={{ bgcolor: "#1a1e239f", px: 10, py: 2, borderRadius: "10px" }}>
        <Avatar sx={{ bgcolor: color }}> </Avatar>
        <Typography variant='body1' color="white">Win {color === "green" ? 14 : 2}x</Typography>
      </Box>
      <StyledButton bgColor={color} onClick={() => handleBet(color, betAmount)} variant="contained">Place Bet</StyledButton>
      <Box my={1}>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ bgcolor: "#1a1e239f", borderRadius: "10px", my: 1, py: 1 }}>
          <Box display="flex">
            <Avatar sx={{ width: '25px', height: '25px', mx: 2 }}>A</Avatar>
            <Typography color="white" variant="body1">Name</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mx={1} sx={{ color: 'white' }}>
            <FaEthereum />
            100
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ bgcolor: "#1a1e239f", borderRadius: "10px", my: 1, py: 1 }}>
          <Box display="flex">
            <Avatar sx={{ width: '25px', height: '25px', mx: 2 }}>A</Avatar>
            <Typography color="white" variant="body1">Name</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mx={1} sx={{ color: 'white' }}>
            <FaEthereum />
            100
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
