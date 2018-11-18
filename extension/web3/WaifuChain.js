const Web3 = require('web3');
const createMetaMaskProvider = require('metamask-extension-provider')
const contract = require('./ABI.js')

const provider = createMetaMaskProvider()

provider.on('error', (error) => {
	// Failed to connect to MetaMask, fallback logic.
	console.error("Failed to connect to MetaMask");
})

var web3 = new Web3(provider);

module.exports = {
	WaifuChain: new web3.eth.Contract(contract.ABI, contract.contractAddress),
	web3: web3
}

