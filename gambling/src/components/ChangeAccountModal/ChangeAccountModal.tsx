import { Modal, Typography, Button, Box, Avatar } from "@mui/material";

interface ChangeAccountModalProps {
  accounts: string[];
  isOpen: boolean;
  handleClose: () => void,
  setAccount: (num: number) => void,
  handleLogin: (num: number) => void,
}

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

export const ChangeAccountModal = ({ accounts, isOpen, handleClose, setAccount, handleLogin }: ChangeAccountModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography variant="h5" align="center" gutterBottom>Chooce account:</Typography>
        {accounts.map((addr: string, index: number) => (
          <Box key={addr} display="flex" justifyContent="space-between" alignItems="center">
            <Avatar alt="Remy Sharp" sx={{ border: 'solid 1px white' }} src={`https://avatars.dicebear.com/api/personas/:${addr}.svg`} />
            <Typography variant="body1" color="white">{addr.substring(0, 5)}...{addr.substring(39)}</Typography>
            <Button variant="contained" onClick={() => {
              handleLogin(index);
              setAccount(index);
              handleClose();
            }}>Login</Button>
          </Box>
        ))}
      </Box>
    </Modal>
  )
}