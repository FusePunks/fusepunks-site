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
						<h2><strong>0/10000 Minted</strong></h2>
					</div>

					<div class='block'>
						<button class='button is-primary is-large is-fullwidth'>Mint One!</button>
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
					The data for each TomoPunk is stored entirely on the TomoChain Blockchain. This includes the image of the TomoPunk and its metadata.
				</div>
				<div class='block'>
					Other NFT projects commonly use IPFS, Arweave or even Google Drive to store NFT data off-chain, as fees would be too high to store the data on-chain. Thanks to the super-low fees on TomoChain we stored all 10,000 NFTs directly on chain for under $6.
				</div>
			</div>

			<div class='column' style='padding-bottom: 0px'>
				<div class='block has-text-centered'>
					<h2 class='title'>Unique</h2>
				</div>
				<div class='block'>
					Every TomoPunk has been randomly generated, each with its own unique features. Attributes of TomoPunks have a variety of rarities, will you mint the rarest combination?
				</div>
				<div class='block has-text-centered'>
					<h2 class='title'>Fast</h2>
				</div>
				<div class='block'>
					TomoChain is fast, with an average confirmation time of just 2 seconds and a gas cost of 0.00003 TOMO, buying and transferring TomoPunks is extremely fast and extremely cheap!
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
