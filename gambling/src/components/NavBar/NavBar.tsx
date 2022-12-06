import { Tooltip, Avatar, Container, Typography, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import { IoDiceOutline } from 'react-icons/io5';

export const NavBar = () => {
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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={() => {}} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}