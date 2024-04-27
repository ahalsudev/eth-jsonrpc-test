// const axios = require('axios');

// const ALCHEMY_URL = "https://eth-sepolia.g.alchemy.com/v2/53jiWZjSmH5uTQZSuiCLbX2sneTOj0YP";

// axios.post(ALCHEMY_URL, {
//   jsonrpc: "2.0",
//   id: 1,
//   method: "eth_getBalance",
//   params: [
//     "0x898DF2e0ECa3b2b171Ee3AC02831E3163c1560bE2",
//     "0x5836E2",
//   ]
// }).then((response) => {
//   console.log(response.data.result);
// });

const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');
require('dotenv').config();

const { ALCHEMY_API_KEY, SEPOLIA_PRIVATE_KEY } = process.env;

const settings = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

let wallet = new Wallet(SEPOLIA_PRIVATE_KEY);

async function main() {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    'latest'
  );

  let transaction = {
    to: "0x57D1c93Fd469A30ee7A7c05efA7abFB52dc58f40", //choose any address!,
    value: Utils.parseEther('0.00001'), // 0.001 worth of ETH being sent
    gasLimit: '21000',
    maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
    maxFeePerGas: Utils.parseUnits('20', 'gwei'),
    nonce: nonce,
    type: 2,
    chainId: 11155111, // göerli transaction
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  console.log('Raw tx: ', rawTransaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
}

main();