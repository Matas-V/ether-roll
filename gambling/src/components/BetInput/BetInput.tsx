import { OutlinedInput, Button, InputAdornment, ButtonProps, OutlinedInputProps } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FaEthereum } from "react-icons/fa";

interface BetInputProps {
  betAmount: number,
  setBetAmount: React.Dispatch<React.SetStateAction<number>>,
  balance: string,
}

interface CustomEndAdornmentProps {
  setBetAmount: React.Dispatch<React.SetStateAction<number>>,
  balance: string,
};

const StyledOutlinedInput = styled(OutlinedInput)<OutlinedInputProps>(() => ({
  backgroundColor: "inherit",
  marginBottom: '1.3rem',
  maxWidth: '960px',
  width: '100%',
  color: 'white',
  border: 'solid 1px #313740',
}));

const StyledEndAdornment = styled(Button)<ButtonProps>(() => ({
  backgroundColor: '#1a1e239f',
  color: 'white',
  margin: '0 3px',
  border: 'solid 1px #1a1e239f',
  "&:hover": {
    backgroundColor: "#1a1e239f",
    border: 'solid 1px white',
  }
}));

const StyledClearButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "inherit",
  color: 'white',
  fontWeight: 800,
  border: 'solid 1px #313740',
  marginRight: 2,
  "&:hover": {
    backgroundColor: "inherit",
    border: 'solid 1px white',
  }
}));

const CustomEndAdornment = ({ setBetAmount, balance }: CustomEndAdornmentProps) => (
  <>
    <StyledClearButton onClick={() => setBetAmount(0)} variant="text">Clear</StyledClearButton>
    <StyledEndAdornment onClick={() => setBetAmount((prev) => prev ? prev + 0.5 : 0.5)}>+0.5</StyledEndAdornment>
    <StyledEndAdornment onClick={() => setBetAmount((prev) => prev ? prev + 1 : 1)}>+1</StyledEndAdornment>
    <StyledEndAdornment onClick={() => setBetAmount((prev) => prev ? prev + 10 : 10)}>+10</StyledEndAdornment>
    <StyledEndAdornment onClick={() => setBetAmount(parseFloat(balance))}>Max</StyledEndAdornment>
  </>
);

export const BetInput = ({ betAmount, setBetAmount, balance }: BetInputProps) => {
  return (
    <StyledOutlinedInput
      id="outlined-adornment"
      className="test"
      startAdornment={<FaEthereum style={{ marginRight: '5px', fontSize: '1.5rem' }} />}
      type="number"
      value={betAmount.toString()}
      onChange={(e) => setBetAmount(parseFloat(e.target.value))}
      endAdornment={
        <InputAdornment position="end">
          <CustomEndAdornment balance={balance} setBetAmount={setBetAmount} />
        </InputAdornment>
      }
    />
  )
}