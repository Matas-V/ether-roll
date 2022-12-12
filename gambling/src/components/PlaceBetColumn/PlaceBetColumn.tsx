import { Box, Button, Typography, Avatar, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaEthereum } from "react-icons/fa";
import { BetByColorState } from '../../App';

interface StyledButtonProps extends ButtonProps {
  bgcolor?: string;
};

const StyledButton = styled(Button)<StyledButtonProps>((props) => ({
  backgroundColor: props.bgcolor,
  border: `solid 2px ${props.bgcolor}`,
  fontWeight: 800,
  '&:hover': {
    backgroundColor: '#313740',
    color: props.bgcolor,
  }
}));

interface PlaceBetColumnProps {
  color: string,
  betters: BetByColorState,
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
      <StyledButton bgcolor={color} onClick={() => handleBet(color, betAmount)} variant="contained">Place Bet</StyledButton>
      <Box my={1}>
        {betters?.names.map((name: string, index: number) => (
          <Box key={name} display="flex" alignItems="center" justifyContent="space-between" sx={{ bgcolor: "#1a1e239f", borderRadius: "10px", my: 1, py: 1 }}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: '30px', height: '30px', mx: 2, border: 'solid 1px white' }} src={`https://avatars.dicebear.com/api/personas/:${name}.svg`}> </Avatar>
              <Typography color="white" variant="body1">{name.substring(0, 5)}...{name.substring(39)}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mx={1} sx={{ color: 'white' }}>
              <FaEthereum />
              {betters.values[index]}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
