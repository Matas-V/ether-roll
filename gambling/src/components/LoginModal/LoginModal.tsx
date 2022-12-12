import { Box, Button, Modal, Typography } from "@mui/material";

interface LoginModalProps {
  isOpen: boolean,
  handleClose: React.Dispatch<React.SetStateAction<boolean>>,
  handleLogin: () => void,
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

export const LoginModal = ({ isOpen, handleClose, handleLogin }: LoginModalProps) => {
  return (
    <Modal
      open={isOpen}
    >
      <Box sx={style}>
        <Typography variant="h6" align="center" gutterBottom>Please login to website</Typography>
        <Box display="flex" justifyContent="center">
          <Button variant="contained" onClick={() => {
            handleLogin();
            handleClose(false);
          }}>Login</Button>
        </Box>
      </Box>
    </Modal>
  )
}
