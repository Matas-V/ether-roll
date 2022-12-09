import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Box, Container, Avatar, Typography } from '@mui/material';
import { FaEthereum } from "react-icons/fa";
import { Roulette, NavBar, TimeLine, PlaceBetColumn, BetInput, AddFundsModal } from './components';
import { Roulette as RouletteWeb, web3 } from "./web3Provider.js";
import './App.css';

// async function getAccount() {
//   const accounts = await ethereum.enable();
//   const account = accounts[0];
//   // do something with new account here
// }

// ethereum.on('accountsChanged', function (accounts) {
//   getAccount();
// })

function App() {
  const [balance, setBalance] = useState("0");
  const [addFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [betAmount, setBetAmount] = useState(0);

  // web3.on('accountsChanged', () => {
  //   console.log("HELLO")
  // });
  console.log(web3)
  const placeBet = async (color: string, amount: number) => {
    try {
      await RouletteWeb.methods.placeBet(color, web3.utils.toWei(amount.toString())).call();
      getBalance();
    } catch (error) {
      console.log("PLACE BET ERROR: ", error);
    }
  }

  const increaseFunds = async (amount: string) => {
    try {
      const accounts = await web3.eth.getAccounts();
      await RouletteWeb.methods.increaseFunds().send({
        from: accounts[0],
        value: ethers.utils.parseEther(amount),
      });
      getBalance();
    } catch (error) {
      console.log("INCREASE FUNDS ERROR", error);
    }
  }

  const getBalance = async () => {
    try {
      const response = await RouletteWeb.methods.getAvailableFunds().call();
      setBalance(ethers.utils.formatEther(response));
    } catch (error) {
      console.log("GET AVAILABLE FUNDS ERROR: ", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className='main'>
      <NavBar setOpenModal={setAddFundsModalOpen} />
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
            {balance}
          </Box>
        </Box>
        <Roulette rolledNumber={10} />
        <TimeLine />
        <BetInput balance={balance} betAmount={betAmount} setBetAmount={setBetAmount} />
        <Box display="flex" gap={5}>
          {['red', 'green', 'black'].map((color: string) => (
            <PlaceBetColumn key={color} color={color} betters={[]} handleBet={placeBet} betAmount={betAmount} />
          ))}
        </Box>
      </Container>
      <AddFundsModal isOpen={addFundsModalOpen} handleClose={setAddFundsModalOpen} handleAddFunds={increaseFunds} />
    </div>
  )
}

export default App
