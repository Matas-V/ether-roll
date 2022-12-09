import { Tooltip, Avatar, Container, Typography, IconButton, Toolbar, Box, AppBar, Button } from '@mui/material';
import { IoDiceOutline } from 'react-icons/io5';

interface NavBarProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
};

export const NavBar = ({ setOpenModal }: NavBarProps) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1d2126' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <IoDiceOutline className='title-coin' />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mx: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Ether Roll
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            <Button color="error" variant='contained' onClick={() => setOpenModal(true)}>Add funds</Button>
            <Button color="success" variant='contained' onClick={() => {}}>Withdraw</Button>
            <Tooltip title="Open profile">
              <IconButton onClick={() => {}} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}