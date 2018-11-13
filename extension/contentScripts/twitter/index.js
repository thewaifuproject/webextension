const createMetaMaskProvider = require('metamask-extension-provider')

const provider = createMetaMaskProvider()

provider.on('error', (error) => {
  // Failed to connect to MetaMask, fallback logic.
})

var web3 = new Web3(provider);

var WaifuChain = web3.eth.contract(ABI).at(contractAddress);

if(document.querySelector(".ProfileHeaderCard")){
	WaifuChain.getWaifusInProfile("twitter", "user",  {from: web3.eth.accounts[0], gas: 3000000},
		(waifus)=>{
			console.log(waifus);
		}
	);
	/*web3.eth.sendTransaction({
		from: '0x3fa1e84280163fde90fb65977f0e48cd5c337b9b',
		to: '0x0406735fC1a657398941A50A0602eddf9723A6C8',
		value: "1000000000000000000"
	}, (err, res)=>{});*/
}


