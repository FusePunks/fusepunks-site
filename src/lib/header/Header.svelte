<script lang="ts">
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
	let showMenu = false;

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function closeMenu() {
		showMenu = false;
	}

</script>

<header>
	<nav class="navbar is-transparent">

		<div class="navbar-brand is-flex is-flex-grow-1 is-justify-content-center">
			<a class="navbar-item" href="/">
				<!--<img src="/punks-nb/punk4154.png" alt="FusePunks" width="30" height="30">-->
				<h1 class='title'>FusePunks</h1>
			</a>
			<div class="navbar-burger {showMenu ? 'is-active' : ''}" data-target="navbarExampleTransparentExample" on:click={toggleMenu}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>

		<div id="navbarExampleTransparentExample" class="navbar-menu {showMenu ? 'is-active' : ''}">
			<div class="navbar-start">

			</div>

			<div class="navbar-end is-flex is-flex-grow-1 is-justify-content-center">
				<a class="navbar-item" href="/" on:click={closeMenu}>
					Home
				</a>
				<a class="navbar-item" href="/gallery" on:click={closeMenu}>
					Gallery
				</a>
				<a class="navbar-item" href="/profile" on:click={closeMenu}>
					Profile
				</a>
			</div>

		</div>
	</nav>
</header>

<style>
	.navbar-menu {
			box-shadow: none;
	}

	.navbar-brand {
			font-family: "Orbitron", sans-serif;
	}
</style>
