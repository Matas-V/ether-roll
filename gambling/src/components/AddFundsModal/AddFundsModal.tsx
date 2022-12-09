import { Box, Button, Modal, Typography, OutlinedInput } from "@mui/material";
import { useState } from "react";

interface AddFundsModalProps {
  isOpen: boolean,
  handleClose: React.Dispatch<React.SetStateAction<boolean>>,
  handleAddFunds: (amount: string) => void,
};

const style = {
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#313740',
  border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

export const AddFundsModal = ({ isOpen, handleClose, handleAddFunds }: AddFundsModalProps) => {
  const [amount, setAmount] = useState("0");

  return (
    <Modal
      open={isOpen}
      onClose={() => handleClose(false)}
    >
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>Enter amount of Ether to deposit:</Typography>
        <OutlinedInput sx={{ width: '100%', color: 'white' }} value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="error" onClick={() => handleClose(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={() => {
            handleAddFunds(amount);
            handleClose(false);
          }} disabled={isNaN(parseFloat(amount))}>Confirm</Button>
        </Box>
      </Box>
    </Modal>
  )
}
