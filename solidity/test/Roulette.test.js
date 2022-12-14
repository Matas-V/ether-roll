const { assert } = require('chai');

const Roulette = artifacts.require("./Roulette.sol");

const ADD_5_ETHERS = 5;
const ADD_3_ETHERS = 3;
const BET_AMOUNT_ONE = 1;
const BET_AMOUNT_HALF = 0.5;

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Roulette', (bettors) => {
  let betting;
  before(async() => {
    betting = await Roulette.deployed();
  });

  describe('deployment', async() => {
    it('deploys successfully', async() => {
        const address = await betting.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, undefined);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
    });
  });

  describe("Roulette Game", async () => {
    it("Player login", async () => {
      await betting.start({
        from: bettors[1],
        value: '0',
      });
      await betting.start({
        from: bettors[2],
        value: '0',
      });
      const response = await betting.getPlayers();
      assert.lengthOf(response, 2);
    });

    it("Increase funds", async () => {
      await betting.increaseFunds({
        from: bettors[0],
        value: web3.utils.toWei('10', 'Ether'),
      });
      await betting.increaseFunds({
        from: bettors[1],
        value: web3.utils.toWei(`${ADD_3_ETHERS}`, 'Ether'),
      });
      await betting.increaseFunds({
        from: bettors[2],
        value: web3.utils.toWei(`${ADD_5_ETHERS}`, 'Ether'),
      });
      const response0 = await betting.getAvailableFunds({
        from: bettors[0],
        value: '0',
      });
      const response1 = await betting.getAvailableFunds({
        from: bettors[1],
        value: '0',
      });
      const response2 = await betting.getAvailableFunds({
        from: bettors[2],
        value: '0',
      });

      assert.equal(response0.toString(), web3.utils.toWei(`10`, 'Ether'));
      assert.equal(response1.toString(), web3.utils.toWei(`${ADD_3_ETHERS}`, 'Ether'));
      assert.equal(response2.toString(), web3.utils.toWei(`${ADD_5_ETHERS}`, 'Ether'));
    })

    it("Place a bet", async () => {
      await betting.placeBet("red", web3.utils.toWei(`${BET_AMOUNT_ONE}`, 'Ether'), {
        from: bettors[1],
        value: '0',
      });
      await betting.placeBet("black", web3.utils.toWei(`${BET_AMOUNT_HALF}`, 'Ether'), {
        from: bettors[2],
        value: '0',
      });
      const response1 = (await betting.getPlayerLastGameRound({
        from: bettors[1],
        value: '0',
      })).toString();
      const response2 = (await betting.getPlayerLastGameRound({
        from: bettors[2],
        value: '0',
      })).toString();
      const response3 = (await betting.getAvailableFunds({
        from: bettors[1],
        value: '0',
      })).toString();
      const response4 = (await betting.getAvailableFunds({
        from: bettors[2],
        value: '0',
      })).toString();

      assert.equal(response1, [web3.utils.toWei(`${BET_AMOUNT_ONE}`, 'Ether'), "red", bettors[1]]);
      assert.equal(response2, [web3.utils.toWei(`${BET_AMOUNT_HALF}`, 'Ether'), "black", bettors[2]]);
      assert.equal(response3, web3.utils.toWei(`${ADD_3_ETHERS - BET_AMOUNT_ONE}`, 'Ether'));
      assert.equal(response4, web3.utils.toWei(`${ADD_5_ETHERS - BET_AMOUNT_HALF}`, 'Ether'));
    });

    it("Spin Roulette", async () => {
      await betting.spinWheel({
        from: bettors[0],
        value: '0',
      });
      const betHistory = (await betting.getSpinsHistory()).toString();
      const winColor = parseInt(betHistory) === 0 ? "green" : parseInt(betHistory) % 2 === 0 ? "black" : "red";
      const response1 = (await betting.getAvailableFunds({
        from: bettors[1],
        value: '0',
      })).toString();
      const response2 = (await betting.getAvailableFunds({
        from: bettors[2],
        value: '0',
      })).toString();

      const available1 = ADD_3_ETHERS - BET_AMOUNT_ONE;
      const available2 = ADD_5_ETHERS - BET_AMOUNT_HALF;

      assert.equal(response1, winColor === "red" ? web3.utils.toWei(`${available1 + 2*BET_AMOUNT_ONE}`) : web3.utils.toWei(`${available1}`));
      assert.equal(response2, winColor === "black" ? web3.utils.toWei(`${available2 + 2*BET_AMOUNT_HALF}`) : web3.utils.toWei(`${available2}`));
    });

    it("Withdraw Ether", async () => {
      await betting.withdrawMoney({
        from: bettors[1],
        value: '0',
      });
      await betting.withdrawMoney({
        from: bettors[2],
        value: '0',
      });
      const response1 = (await betting.getAvailableFunds({
        from: bettors[1],
        value: '0',
      })).toString();
      const response2 = (await betting.getAvailableFunds({
        from: bettors[2],
        value: '0',
      })).toString();

      assert.equal(response1, web3.utils.toWei('0'));
      assert.equal(response2, web3.utils.toWei('0'));
    });
  });
});