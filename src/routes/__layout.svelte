<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../app.scss';
	import { mmAddress, mmConnect } from '$lib/stores';

	const ethEnabled = () => {
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
