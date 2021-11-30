<script context="module" lang="ts">
	//export const prerender = true;
</script>

<script>
	import { mmWeb3, mmAddress, mmNFTs, mmConnect, contractAddress } from "$lib/stores";
	import { onMount } from "svelte";

	let allTokens = [];

	const nfts = async () => {
		console.log($mmAddress);
		await mmConnect();
		if($mmAddress !== null) {
			allTokens = []
			getNFTs();
		} else {
			window.location.replace("/");
		}
	}

	const getNFTs = async () => {
		const punkABI = await fetch('./data/punks_abi.json').then(res => res.json());
		let contract = new $mmWeb3.eth.Contract(await punkABI, $contractAddress, { from: $mmAddress });

		let balance = contract.methods.balanceOf($mmAddress).call().then(function(res) {
			return res;
		});

		console.log(await balance);

		for(let i = 0; i < await balance; i++) {
			let tokenByIndex = contract.methods.tokenOfOwnerByIndex($mmAddress, i).call().then(function(res) {
				return res;
			});

			let tokenURI = contract.methods.tokenURI(await tokenByIndex).call().then(function(res) {
				return res;
			});

			let uri = await tokenURI;
			uri = uri.split(",")[1];
			let json = JSON.parse(window.atob(decodeURIComponent(uri)));

			allTokens.push(json);
			mmNFTs.set(allTokens);
		}

		console.log(allTokens);
	}

	const transferPunk = async (id, toAddress) => {

	}

	const transferModal = async (nft) => {
		let id = nft.name.split("#")[1];
		console.log(id);
	}

	onMount(async () => {
		nfts();
	});
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<section class='section'>
	<div class='container'>

		{#if $mmWeb3 !== null}
			{#await $mmNFTs}
				<div class='block is-flex is-justify-content-center'>
					<h1 class='title'>Loading FusePunks...</h1>
				</div>
			{:then nfts}
				{#if nfts.length > 0}
					<div class='block is-flex is-justify-content-center'>
						<h2 class='title is-2'>Your Punks</h2>
					</div>
					<div class='block is-flex is-justify-content-center'>
						<h4 class='title is-4'>Account: {$mmAddress.match(/.{1,6}/g)[0]}...{$mmAddress.match(/.{1,6}/g)[$mmAddress.match(/.{1,6}/g).length - 1]}</h4>
					</div>

					<div class='columns is-multiline'>
						{#each nfts as nft}
							<div class='column is-one-fifth'>
								<figure class='image is-square'>
									<img loading="lazy" decoding="async" src='{nft.image}'>
								</figure>

								<div class='block'>
									<h4 class='title is-4 has-text-centered'>{nft.name}</h4>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class='block is-flex is-justify-content-center'>
						<h2 class='title is-2'>Your Punks</h2>
					</div>
					<div class='block is-flex is-justify-content-center'>
						<h4 class='title is-4'>Account: {$mmAddress.match(/.{1,6}/g)[0]}...{$mmAddress.match(/.{1,6}/g)[$mmAddress.match(/.{1,6}/g).length - 1]}</h4>
					</div>
					<div class='block is-flex is-justify-content-center'>
						<h5 class='title is-5'>You don't own any punks. Mint one now!</h5>
					</div>
				{/if}
			{/await}
		{:else}
			<div class='block is-flex is-justify-content-center'>
				<h1 class='title'>MetaMask is not connected.</h1>
			</div>
		{/if}
	</div>
</section>

<style>

</style>