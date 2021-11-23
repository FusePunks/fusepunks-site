<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="hero is-fullheight-with-navbar">
	<div class="hero-body">
		<div class='container is-max-desktop'>
			<p class="title">
				Fullheight hero with navbar
			</p>
		</div>

	</div>
</section>

<section class='section'>
	<div class='container'>
		<div class='columns'>

			<div class='column' style='padding-bottom: 0px'>
				<div class='block'>
					<h1 class='title'>On-Chain</h1>
				</div>
				<div class='block'>
					The data for each TomoPunk is stored entirely on the TomoChain Blockchain. This includes the image of the TomoPunk and its metadata.
				</div>
				<div class='block'>
					Other NFT projects commonly use IPFS, Arweave or even Google Drive to store NFT data off-chain, as fees would be too high to store the data on-chain. Thanks to the super-low fees on TomoChain we stored all 10,000 NFTs directly on chain for under $6.
				</div>
			</div>

			<div class='column' style='padding-bottom: 0px'>
				<div class='block'>
					<h1 class='title'>Unique</h1>
				</div>
				<div class='block'>
					Every TomoPunk has been randomly generated, each with its own unique features. Attributes of TomoPunks have a variety of rarities, will you mint the rarest combination?
				</div>
				<div class='block'>
					<h1 class='title'>Fast</h1>
				</div>
				<div class='block'>
					TomoChain is fast, with an average confirmation time of just 2 seconds and a gas cost of 0.00003 TOMO, buying and transferring TomoPunks is extremely fast and extremely cheap!
				</div>
			</div>

		</div>
	</div>
</section>

<style>
    .hero {
        background: linear-gradient(
                180deg,
                var(--primary-color) 0%,
                var(--secondary-color) 10.45%,
								var(--secondary-color) 89%
                /*var(--primary-color) 100%*/
        );
    }

</style>
