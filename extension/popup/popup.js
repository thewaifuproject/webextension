const {WaifuChain, web3} = require("../web3/WaifuChain.js");

web3.eth.getAccounts().
then((accounts)=>{
	accounts.forEach((acc, accIndex)=>{
		WaifuChain.methods.balanceOf(acc).call()
		.then((numWaifus)=>{
			let waifuList = document.querySelector("#waifuList")
			for(let i=0; i<numWaifus; i++){
				let waifuId;
				WaifuChain.methods.tokenOfOwnerByIndex(acc, i).call()
				.then((tokenId)=>{
					waifuId=tokenId
					return WaifuChain.methods.tokenURI(waifuId).call()
				})
				.then((waifuURL)=>
					fetch(waifuURL)
				)
				.then((res)=>
					res.json()
				)
				.then((waifu)=>{
					document.querySelector("#waifu-"+accIndex+"-"+i+" > img").src=waifu["image"];
					document.querySelector("#waifu-"+accIndex+"-"+i+" > p").innerText=waifu["name"].split(' ').slice(0,3).join(' ');
					document.querySelector("#waifu-"+accIndex+"-"+i).addEventListener(
						"click",
						()=>{
							chrome.tabs.query({ active: true, currentWindow: true }, (tabs)=>{
								let currentPage=new URL(tabs[0].url)
								if(currentPage.hostname!="twitter.com"){
									return alert("Social network not supported");
								}
								WaifuChain.methods.setWaifuProfile(waifuId, currentPage.hostname, currentPage.pathname).send({from: acc})
							});
						}
					);
					
				});
				waifuList.innerHTML+=
					"<div id='waifu-"+accIndex+"-"+i+"' class='waifuCard'>"+
						"<img width='94' height='100'>"+
						"<p></p>"+
					"</div>";
			}
		});
	});
});
