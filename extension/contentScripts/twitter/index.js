const {WaifuChain, web3} = require("../../web3/WaifuChain.js");

if(document.querySelector(".ProfileHeaderCard")){
	let currentPage=new URL(window.location.href)
	WaifuChain.methods.getWaifusInProfile(currentPage.hostname, currentPage.pathname).call()
	.then((waifus)=>{
		if(waifus.length){
			document.querySelector(".ProfileHeaderCard-bio").innerHTML+=
				'<br><div id="waifuList"></div>';
		}
		let waifuList=document.querySelector("#waifuList");
		waifus.forEach((waifuId, waifuIndex)=>{
			WaifuChain.methods.tokenURI(waifuId).call()
			.then((waifuURL)=>
				fetch(waifuURL)
			)
			.then((res)=>
				res.json()
			)
			.then((waifu)=>{
				document.querySelector("#waifu-"+waifuIndex+" > img").src=waifu["image"];
				document.querySelector("#waifu-"+waifuIndex+" > p").innerText=waifu["name"].split(' ').slice(0,3).join(' ');
			});
			waifuList.innerHTML+=
				"<div id='waifu-"+waifuIndex+"' class='waifuCard'>"+
					"<img width='85' height='90'>"+
					"<p></p>"+
				"</div>";
		});
	});
}


