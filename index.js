const axios = require('axios');

const ALCHEMY_URL = "https://eth-sepolia.g.alchemy.com/v2/<key>";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBalance",
  params: [
    "0x898DF2e0ECa3b2b171Ee3AC02831E3163c1560bE2",
    "0x5836E2",
  ]
}).then((response) => {
  console.log(response.data.result);
});