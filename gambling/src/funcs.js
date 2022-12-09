import RouletteJSON from '../../solidity/build/contracts/Roulette.json';
import Web3 from 'web3';
// var contract = require("@truffle/contract");
// import contract from '@truffle/contract';

export const load = async () => {
    await loadWeb3();
    const addressAccount = await loadAccount();
    console.log(addressAccount);
    // const { rouletteContract, tasks } = await loadContract(addressAccount);

    //return { addressAccount, rouletteContract, tasks }
}

// const loadTasks = async (rouletteContract, addressAccount) => {
//     const tasksCount = await rouletteContract.tasksCount(addressAccount);
//     const tasks = [];
//     for (var i = 0; i < tasksCount; i++) {
//         const task = await rouletteContract.tasks(addressAccount, i);
//         tasks.push(task);
//     }
//     return tasks;
// };

// const loadContract = async (addressAccount) => {
//     const theContract = contract(RouletteJSON);
//     theContract.setProvider(web3.eth.currentProvider);
//     const rouletteContract = await theContract.deployed();
//     const tasks = await loadTasks(rouletteContract, addressAccount);

//     return { rouletteContract, tasks };
// };

const loadAccount = async () => {
    const addressAccount = await web3.eth.getCoinbase();
    return addressAccount;
};

export const testing = () => {
    console.log("asdasd")
}

const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            console.error(error);
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        web3.eth.sendTransaction({/* ... */});
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};