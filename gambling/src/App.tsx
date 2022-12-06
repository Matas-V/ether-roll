import { Roulette, NavBar, TimeLine, PlaceBetColumn, BetInput } from './components';
import { Box, Container, Avatar, Typography } from '@mui/material';
import { FaEthereum } from "react-icons/fa";
import './App.css';

function App() {
  return (
    <div className='main'>
      <NavBar />
      <Container sx={{ display: 'flex', alignItems: "center", my: 5, flexDirection: 'column' }}>
        <Box maxWidth={960} width={'100%'} display="flex" justifyContent="space-between" px={2}>
          <Box display="flex" flexDirection="column">
            <Typography align="left" color="white" variant="subtitle2">Last 5:</Typography>
            <Box display="flex" gap={1} my={1}>
              <Avatar sx={{ bgcolor: 'red', width: '30px', height: '30px' }}> </Avatar>
              <Avatar sx={{ bgcolor: 'black', width: '30px', height: '30px' }}> </Avatar>
              <Avatar sx={{ bgcolor: 'red', width: '30px', height: '30px' }}> </Avatar>
              <Avatar sx={{ bgcolor: 'green', width: '30px', height: '30px' }}> </Avatar>
              <Avatar sx={{ bgcolor: 'red', width: '30px', height: '30px' }}> </Avatar>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1} sx={{ color: 'white', fontSize: '1.5rem' }}>
            Balance
            <FaEthereum />
            69
          </Box>
        </Box>
        <Roulette rolledNumber={10} />
        <TimeLine />
        <BetInput />
        <Box display="flex" gap={5}>
          {['red', 'green', 'black'].map((color: string) => (
            <PlaceBetColumn key={color} color={color} betters={[]} />
          ))}
        </Box>
      </Container>
    </div>
  )
}

export default App
