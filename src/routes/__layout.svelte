<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../app.scss';
	import { mmWeb3, mmAddress, mmConnect } from '$lib/stores';

	if($mmWeb3 === null) {
		mmConnect();
	}
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
