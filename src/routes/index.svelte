<script context="module" lang="ts">
	//export const prerender = true;
</script>

<script>
	//import { ethStore, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3'
	import { mmWeb3, mmAddress, mmConnect, contractAddress } from "$lib/stores";

	const getBalance = async () => {
		if($mmWeb3 === null && $mmAddress === null) return 0;
		return $mmWeb3.eth.getBalance($mmAddress);
	}

	const getTotalSupply = async () => {
		let tempWeb3 = $mmWeb3;
		if($mmAddress === null) {
			tempWeb3 = new Web3("https://rpc.fuse.io");
		}

		const punkABI = await fetch('./data/punks_abi.json').then(res => res.json());
		let contract = new tempWeb3.eth.Contract(await punkABI, $contractAddress, { from: $mmAddress });

		let totalSupply = await contract.methods.totalSupply().call().then(function(res) {
			return res;
		});

		return totalSupply;
	}

	const mint = async () => {
		const punkABI = await fetch('./data/punks_abi.json').then(res => res.json());

		await mmConnect();

		if(!$mmWeb3.chainId === '0x7a') {
			console.log('Not on the Fuse Chain');
			return;
		}
		let contract = new $mmWeb3.eth.Contract(punkABI, $contractAddress, { from: $mmAddress });
		console.log(contract);
		let tx = await contract.methods.mint($mmAddress).send({ from: $mmAddress, to: $contractAddress, value: $mmWeb3.utils.toWei('20', 'ether') }).then(function(res) {
			return res;
		});

		console.log(tx);
		window.location.replace("/profile");
	}

</script>

<svelte:head>
	<title>FusePunks</title>
</svelte:head>

<section class="hero is-fullheight-with-navbar">
	<div class="hero-body">
		<div class='container'>
			<div class='columns is-vcentered'>

				<div class='column'>
					<figure class='image is-square'>
						<img src='/punks-nb/punk4154.png'>
					</figure>
				</div>

				<div class='column has-text-centered'>
					<div class='block'>
						<h1 class='title'>The First Punks Collection on the Fuse Network.</h1>
					</div>

					<div class='block'>
						{#await getTotalSupply()}
							<h2 class='title is-2'><strong>0/10000 Minted</strong></h2>
						{:then supply}
							<h2 class='title is-2'><strong>{supply}/10000 Minted</strong></h2>
						{/await}
					</div>

					<div class='block'>
						{#if $mmWeb3 === null}
							<button class='button is-primary is-large is-fullwidth' on:click={mmConnect}>Connect MetaMask</button>
						{:else}
							<button class='button is-primary is-large is-fullwidth' on:click={mint}>Mint One! (20 FUSE)</button>
							<p class='is-size-7'>Please ensure your MetaMask is connected to the Fuse Network.</p>
						{/if}

					</div>
				</div>

				<div class='column is-hidden-mobile'>
					<figure class='image is-square'>
						<img src='/punks-nb/punk1.png'>
					</figure>
				</div>

			</div>

		</div>

	</div>

	<div class='hero-foot'>
		<!--<section class='section'>-->
			<div class='container is-flex is-justify-content-center is-align-content-center'>
				<span class="icon">
					<i class="fas fa-chevron-down"></i>
				</span>
			</div>
		<!--</section>-->
	</div>
</section>

<section class='section'>
	<div class='container'>

		<div class='block'>
			<h1 class='title'>Why FusePunks?</h1>
		</div>

		<div class='columns'>

			<div class='column' style='padding-bottom: 0px'>
				<div class='block has-text-centered'>
					<h2 class='title'>On-Chain</h2>
				</div>
				<div class='block'>
					Inspired by the TomoPunks collection, FusePunks are stored entirely on the Fuse Network Blockchain. Both the image and attribute data will forever be retrievable directly from the Blockchain.
				</div>
				<div class='block'>
					It's common for NFT projects to use storage services such as, IPFS, Arweave or even just Google Cloud to store NFT data off-chain, this is done as most networks would require extortionate gas fees to be paid to store this much data on-chain. However, the Fuse Network has super-low gas fees which has allowed us to upload all the data for FusePunks for an extremely low cost.
				</div>
			</div>

			<div class='column' style='padding-bottom: 0px'>
				<div class='block has-text-centered'>
					<h2 class='title'>Rare</h2>
				</div>
				<div class='block'>
					FusePunks were all randomly generated using our own generation tool, the rarities for each attribute was pre-defined, which resulted in a highly unique collection of Punks sporting the Fuse Networks brand colors for their backgrounds. Certain attributes have a much higher rarity than others, while humans are relatively common, they may posses attributes such as the pipe which is considerably rare. However, there is none more rare than the elusive Alien, in which there are only 12 in the entire collection!
				</div>
			</div>

		</div>
	</div>
</section>

<style>
    /*.hero {
        background: linear-gradient(
                180deg,
                var(--primary-color) 0%,
                var(--secondary-color) 10.45%,
								var(--secondary-color) 89%
        );
    }*/

</style>
