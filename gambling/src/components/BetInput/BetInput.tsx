import { OutlinedInput, Button, InputAdornment, ButtonProps, OutlinedInputProps } from "@mui/material";
import { styled } from '@mui/material/styles';

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

const CustomEndAdornment = () => (
  <>
    <StyledClearButton onClick={() => {}} variant="text">Clear</StyledClearButton>
    <StyledEndAdornment onClick={() => {}}>+1</StyledEndAdornment>
    <StyledEndAdornment onClick={() => {}}>+10</StyledEndAdornment>
    <StyledEndAdornment onClick={() => {}}>+100</StyledEndAdornment>
    <StyledEndAdornment onClick={() => {}}>Max</StyledEndAdornment>
  </>
);

export const BetInput = () => {
  return (
    <StyledOutlinedInput
      id="outlined-adornment"
      className="test"
      type="number"
      defaultValue={1}
      onChange={() => {}}
      endAdornment={
        <InputAdornment position="end">
          <CustomEndAdornment />
        </InputAdornment>
      }
    />
  )
}