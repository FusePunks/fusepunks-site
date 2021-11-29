<script>
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../app.scss';
	import { mmWeb3, mmAddress, mmConnect } from '$lib/stores';
	//import { ethStore, web3, selectedAccount, connected, chainData, makeContractStore } from 'svelte-web3'

	import { onMount } from "svelte";

	onMount(async () => {

		/*if(!$connected) {
			await ethStore.setProvider('https://rpc.fuse.io');
			console.log("Connected now!");
			await
		}*/

		if ($mmWeb3 === null) {
			console.log("Connecting mmWeb3");
			console.log($mmWeb3);
			mmConnect();
		}
	});
</script>


<Header>
	<main>
		<slot />
	</main>



	<style>

	</style>
</Header>

<slot />

<Footer />
