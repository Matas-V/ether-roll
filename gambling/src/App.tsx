import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Box, Container, Avatar, Typography, MenuItem, Button, Snackbar, Alert  } from '@mui/material';
import { FaEthereum } from "react-icons/fa";
import { Roulette, NavBar, PlaceBetColumn, BetInput, AddFundsModal, LoginModal, ChangeAccountModal } from './components';
import { Roulette as RouletteWeb, web3, ganacheIndexes, manager_address } from "./web3Provider.js";
import { getColor, betInfoAddToState, initialBetInfoState, handleRoll } from "./utils";
import './App.css';

export interface betsStateProps {
  red: BetByColorState,
  black: BetByColorState,
  green: BetByColorState,
}

export interface BetByColorState {
  names: string[],
  values: number[],
}

function App() {
  const [balance, setBalance] = useState("0");
  const [addFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [changeProfileModalOpen, setChangeProfileModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(true);
  const [betAmount, setBetAmount] = useState(0);
  const [index, setIndex] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [bettersColumns, setBettersColumns] = useState<betsStateProps>({} as betsStateProps);
  const [historyOfRolls, setHistoryOfRolls] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleIndex = (i: number) => setIndex(i);

  const getPlayers = async () => {
    try {
      const response = await RouletteWeb.methods.getPlayers().call();
      setActivePlayers(response);
    } catch (error) {
      console.log("ERROR GETTING PLAYERS")
    }
  }

  const formatBettersByBets = async () => {
    let betsState = initialBetInfoState;
    for (const addr of activePlayers) {
      const betInfo = await RouletteWeb.methods.getPlayerLastGameRound().call({
        from: addr,
        value: '0'
      });
      if (betInfo[0] > 0) {
        betsState = betInfoAddToState(betsState, betInfo);
      }
    }
    setBettersColumns(betsState);
  }

  const spinRoulette = async () => {
    try {
      await RouletteWeb.methods.spinWheel().send({
        from: accounts[0],
        value: '0',
        gas: 3000000,
      });
      const response = await RouletteWeb.methods.getSpinsHistory().call();
      setBettersColumns(initialBetInfoState);
      setHistoryOfRolls(response);
      handleRoll(parseInt(response[response.length-1]));
    } catch (error) {
      console.log("SPIN ERROR", error);
    }
  }

  const getAccounts = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    } catch (error) {
      console.log("ACCOUNTS ERROR", error);
    }
  }

  const login = async (i: number) => {
    try {
      await RouletteWeb.methods.start().send({
        from: accounts[i],
        value: '0',
      });
      getPlayers();
    } catch (error) {
      console.log("LOGIN ERROR", error);
    }
  }

  const getRollsHistory = async () => {
    try {
      const response = await RouletteWeb.methods.getSpinsHistory().call();
      setHistoryOfRolls(response);
    } catch (error) {
      console.log("ROLLS HISTORY ERROR", error);
    }
  }
  
  const placeBet = async (color: string, amount: number) => {
    try {
      await RouletteWeb.methods.placeBet(color, web3.utils.toWei(amount.toString())).send({
        from: accounts[index],
        value: '0',
        gas: 3000000,
      });
      formatBettersByBets();
      getBalance();
    } catch (error) {
      console.log("PLACE BET ERROR: ", error);
    }
  }

  const increaseFunds = async (amount: string) => {
    try {
      const accounts = await web3.eth.getAccounts();
      await RouletteWeb.methods.increaseFunds().send({
        from: accounts[index],
        value: ethers.utils.parseEther(amount),
      });
      getBalance();
    } catch (error) {
      console.log("INCREASE FUNDS ERROR", error);
    }
  }
  const withdrawEther = async () => {
    try {
      await RouletteWeb.methods.withdrawMoney().send({
        from: accounts[index],
        value: '0',
      });
      setOpenSnackbar(true);
      getBalance();
    } catch (error) {
      console.log("WITHDRAW ETHER ERROR", error);
    }
  }

  const getBalance = async () => {
    try {
      const response = await RouletteWeb.methods.getAvailableFunds().call({
        from: accounts[index],
        value: '0',
      });
      setBalance(ethers.utils.formatEther(response));
    } catch (error) {
      console.log("GET AVAILABLE FUNDS ERROR: ", error);
    }
  };

  useEffect(() => {
    getAccounts();
    getRollsHistory();
    getPlayers();
    formatBettersByBets();
  }, []);

  useEffect(() => {
    getPlayers();
    if (activePlayers.includes(accounts[index])) {
      setLoginModalOpen(false);
    }
    getBalance();
  }, [index]);

  // useEffect(() => {
  //   if (window.ethereum) {
  //     console.log("THE WINNER");
  //     window.ethereum.request({method: "eth_requestAccounts"})
  //       .then(result => console.log("DATA: ", result));
  //   } else {
  //     console.info("LOOOOOSER");
  //   }
  // }, []);

  // useEffect(() => {
  //   if(window.ethereum) {
  //     window.ethereum.on('chainChanged', () => {
  //       window.location.reload();
  //     })
  //     window.ethereum.on('accountsChanged', () => {
  //       window.location.reload();
  //     })
  // })

  return (
    <div className='main'>
      <NavBar setOpenModal={setAddFundsModalOpen} userAddress={accounts[index]} handleWithdraw={withdrawEther} setChangeProfileModalOpen={setChangeProfileModalOpen} />
      <Container sx={{ display: 'flex', alignItems: "center", my: 5, flexDirection: 'column' }}>
        <Box maxWidth={960} width={'100%'} display="flex" justifyContent="space-between" px={2}>
          <Box display="flex" flexDirection="column">
            <Typography align="left" color="white" variant="subtitle2">Last 5:</Typography>
            <Box display="flex" flexDirection="row-reverse" gap={1} my={1}>
              {historyOfRolls.length < 5 ? [4,3,2,1,0].map((i: number) => historyOfRolls[i] ? 
                (<Avatar key={i} sx={{ bgcolor: getColor(parseInt(historyOfRolls[i])), width: '30px', height: '30px' }}>{historyOfRolls[i]}</Avatar>) :
                (<Avatar key={i} sx={{ bgcolor: 'green', width: '30px', height: '30px' }}>0</Avatar>)
              ) : (
                historyOfRolls.slice(historyOfRolls.length - 5, historyOfRolls.length).map((num: string, index: number) => (
                  <Avatar key={index} sx={{ bgcolor: getColor(parseInt(num)), width: '30px', height: '30px' }}>{num}</Avatar>
                ))
              )}
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1} sx={{ color: 'white', fontSize: '1.5rem' }}>
            Balance
            <FaEthereum />
            {balance}
          </Box>
        </Box>
        <Roulette />
        <Box sx={{ maxWidth: "960px", width: "100%", my: 5 }}>
          <Button sx={{ visibility: `${accounts[index] !== manager_address && 'hidden'}`, width: '200px' }} color="warning" variant='contained' onClick={() => {
            spinRoulette();
          }}>SPIN</Button>
        </Box>
        <BetInput balance={balance} betAmount={betAmount} setBetAmount={setBetAmount} />
        <Box display="flex" gap={5}>
          {['red', 'green', 'black'].map((color: string) => (
            <PlaceBetColumn key={color} color={color} betters={bettersColumns[color as keyof typeof bettersColumns]} handleBet={placeBet} betAmount={betAmount} />
          ))}
        </Box>
      </Container>
      <AddFundsModal isOpen={addFundsModalOpen} handleClose={setAddFundsModalOpen} handleAddFunds={increaseFunds} />
      {/* <LoginModal isOpen={loginModalOpen} handleClose={setLoginModalOpen} handleLogin={login} /> */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity='success'>Succesfull withdraw. Congratulations on your winnings!</Alert>
      </Snackbar>
      <ChangeAccountModal handleLogin={login} accounts={accounts} isOpen={changeProfileModalOpen} handleClose={() => setChangeProfileModalOpen(false)} setAccount={handleIndex} />
    </div>
  )
}

export default App
