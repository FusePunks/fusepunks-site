<script context="module" lang="ts">
	//export const prerender = true;
</script>

<script>
	import Fuse from 'fuse.js';
	import { punks } from '$lib/data.ts';

	const options = {
		threshold: 0.4,
		keys: [
			{
				name: 'id',
				weight: 0.9
			},
			{
				name: 'race',
				weight: 0.8
			},
			{
				name: 'gender',
				weight: 0.7
			},
			{
				name: 'attributes',
				weight: 0.3
			}
		]
	}

	const fuseIndex = Fuse.createIndex(options.keys, punks)
	const fuse = new Fuse(punks, options, fuseIndex);

	let defaultPunks = [];
	let currentSearch = [];
	let searchText = '';
	let filters = ["Male", "Female", "Human", "Zombie", "Ape", "Alien", "Mohawk", "Eye Mask", "Earring", "Silver Chain", "Do Rag", "Frown", "Fedora", "Pipe", "Hoodie", "Big Shades", "Purple Lipstick", "Beret", "Knitted Cap", "Laser Eyes", "Half Shaved", "Cap", "Vape", "Tyrolean", "Messy Hair", "Mustache", "Cigarette", "Peak Spike", "Purple Hair", "Shaved Head", "Normal Beard", "Mole", "Frumpy Hair", "Clown Nose", "Headband", "Green Eye Shadow", "Blonde Bob", "Horned Rim Glasses", "Mohawk Thin", "Wild Hair", "Rosy Cheeks", "Clown Eyes Green", "Clown Eyes Blue", "Smile", "Shadow Beard", "Stringy Hair", "Normal Beard Black", "Medical Mask", "Police Cap", "Front Beard Dark", "Frumpyhair", "Small Shades", "Cap Forward", "Choker", "Bandana", "Mohawk Dark", "Nerd Glasses", "Front Beard", "Turban", "Eye Patch", "Goat", "Laser Eyes Gold", "Spots", "Wild White Hair", "Royal Cocktail Hat", "Luxurious Beard", "Straight Hair Dark", "Classic Shades", "Straight Hair", "Crazy Hair", "Black Lipstick", "Gold Chain", "Boater", "Buck Teeth", "Welding Goggles", "Tuque", "Chinstrap", "Straight Hair Blonde", "Tassle Hat", "Muttonchops", "Handlebars", "VR", "3D Glasses", "Wild Blonde", "Fez", "Sombrero", "Hot Lipstick", "Clown Hair Green", "Orange Side", "Big Beard", "Vampire Hair", "Blue Eye Shadow", "Blonde Short", "Beanie", "Dark Hair", "Flamenco Hat", "Pilot Helmet", "Regular Shades", "Pigtails", "Cowboy Hat", "Pink With Hat", "Flower Crown", "Top Hat", "Panama Hat", "Red Mohawk", "Tiara"];
	let defaultAttributes = ["Male", "Female", "Human", "Zombie", "Ape", "Alien", "Mohawk", "Eye Mask", "Earring", "Silver Chain", "Do Rag", "Frown", "Fedora", "Pipe", "Hoodie", "Big Shades", "Purple Lipstick", "Beret", "Knitted Cap", "Laser Eyes", "Half Shaved", "Cap", "Vape", "Tyrolean", "Messy Hair", "Mustache", "Cigarette", "Peak Spike", "Purple Hair", "Shaved Head", "Normal Beard", "Mole", "Frumpy Hair", "Clown Nose", "Headband", "Green Eye Shadow", "Blonde Bob", "Horned Rim Glasses", "Mohawk Thin", "Wild Hair", "Rosy Cheeks", "Clown Eyes Green", "Clown Eyes Blue", "Smile", "Shadow Beard", "Stringy Hair", "Normal Beard Black", "Medical Mask", "Police Cap", "Front Beard Dark", "Frumpyhair", "Small Shades", "Cap Forward", "Choker", "Bandana", "Mohawk Dark", "Nerd Glasses", "Front Beard", "Turban", "Eye Patch", "Goat", "Laser Eyes Gold", "Spots", "Wild White Hair", "Royal Cocktail Hat", "Luxurious Beard", "Straight Hair Dark", "Classic Shades", "Straight Hair", "Crazy Hair", "Black Lipstick", "Gold Chain", "Boater", "Buck Teeth", "Welding Goggles", "Tuque", "Chinstrap", "Straight Hair Blonde", "Tassle Hat", "Muttonchops", "Handlebars", "VR", "3D Glasses", "Wild Blonde", "Fez", "Sombrero", "Hot Lipstick", "Clown Hair Green", "Orange Side", "Big Beard", "Vampire Hair", "Blue Eye Shadow", "Blonde Short", "Beanie", "Dark Hair", "Flamenco Hat", "Pilot Helmet", "Regular Shades", "Pigtails", "Cowboy Hat", "Pink With Hat", "Flower Crown", "Top Hat", "Panama Hat", "Red Mohawk", "Tiara"];
	let attributes = [ "Mohawk", "Eye Mask", "Earring", "Silver Chain", "Do Rag", "Frown", "Fedora", "Pipe", "Hoodie", "Big Shades", "Purple Lipstick", "Beret", "Knitted Cap", "Laser Eyes", "Half Shaved", "Cap", "Vape", "Tyrolean", "Messy Hair", "Mustache", "Cigarette", "Peak Spike", "Purple Hair", "Shaved Head", "Normal Beard", "Mole", "Frumpy Hair", "Clown Nose", "Headband", "Green Eye Shadow", "Blonde Bob", "Horned Rim Glasses", "Mohawk Thin", "Wild Hair", "Rosy Cheeks", "Clown Eyes Green", "Clown Eyes Blue", "Smile", "Shadow Beard", "Stringy Hair", "Normal Beard Black", "Medical Mask", "Police Cap", "Front Beard Dark", "Frumpyhair", "Small Shades", "Cap Forward", "Choker", "Bandana", "Mohawk Dark", "Nerd Glasses", "Front Beard", "Turban", "Eye Patch", "Goat", "Laser Eyes Gold", "Spots", "Wild White Hair", "Royal Cocktail Hat", "Luxurious Beard", "Straight Hair Dark", "Classic Shades", "Straight Hair", "Crazy Hair", "Black Lipstick", "Gold Chain", "Boater", "Buck Teeth", "Welding Goggles", "Tuque", "Chinstrap", "Straight Hair Blonde", "Tassle Hat", "Muttonchops", "Handlebars", "VR", "3D Glasses", "Wild Blonde", "Fez", "Sombrero", "Hot Lipstick", "Clown Hair Green", "Orange Side", "Big Beard", "Vampire Hair", "Blue Eye Shadow", "Blonde Short", "Beanie", "Dark Hair", "Flamenco Hat", "Pilot Helmet", "Regular Shades", "Pigtails", "Cowboy Hat", "Pink With Hat", "Flower Crown", "Top Hat", "Panama Hat", "Red Mohawk", "Tiara" ];
	let page = 1;
	let showFilters = true;

	for(let i = 0; i < 50; i++) {
		defaultPunks.push(punks[i]);
	}

	async function getPunks() {
		if(searchText.length > 0) {
			displayedPunks = search();
			console.log(displayedPunks);
		} else {
			displayedPunks = defaultPunks;
			currentSearch = punks;
			page = 1;
		}
	}

	async function search() {
		//currentSearch = [];
		page = 1;

		//this is a hack for filters
		if(searchText.length > 0) {
			currentSearch = fuse.search(searchText).map(item => item.item);
		} else {
			let copiedPunks = JSON.parse(JSON.stringify(punks));
			currentSearch = copiedPunks;
		}

		//Gender filtering
		currentSearch = currentSearch.filter(b => filters.includes(b.gender));

		//Race filtering
		currentSearch = currentSearch.filter(b => filters.includes(b.race));

		//Attribute filtering
		attributes.forEach(att => {
			if(!filters.includes(att)) {
				currentSearch = currentSearch.filter(b => !b.attributes.includes(att))
			}
		})

		if (currentSearch.length > 50) {
			return currentSearch.slice(0, 50);
		} else if (currentSearch.length < 1) {
			//no results
			return [];
		} else {
			return currentSearch;
		}
	}

	let displayedPunks = search();

	$: searchText, getPunks();

	function loadMore() {
		let startIndex = page * 50;
		let endIndex = currentSearch.length < (startIndex + 50) ? currentSearch.length : startIndex + 50;
		let newArray = currentSearch.slice(0, startIndex);

		console.log("currentSearch.length: "+currentSearch.length);
		console.log("last index of currentSearch: "+currentSearch.length - 1);

		console.log("startIndex: "+startIndex);

		console.log("starting array: ");
		console.log(newArray);

		/*for(let a = startIndex - 50; a < startIndex; a++) {
			newArray.push([a])
		}*/

		for(let i = startIndex; i < endIndex; i++) {
			//console.log("Pushing item "+i);
			//console.log(currentSearch[i]);
			newArray.push(currentSearch[i]);
		}

		console.log("ending array: ");
		console.log(newArray)

		console.log("newArray.length: "+newArray.length);
		console.log("currentSearch.length: "+currentSearch.length);
		displayedPunks = newArray;
		page++;
	}

	function editFilters(filter) {
		if(filters.includes(filter)) {
			console.log("Removing "+filter);
			let index = filters.indexOf(filter);
			filters.splice(index, 1);
		} else {
			console.log("Adding "+filter);
			filters.push(filter);
		}

		console.log(filters);

		displayedPunks = search();
	}

	function resetFilters() {
		filters = ["Male", "Female", "Human", "Zombie", "Ape", "Alien"];
	}

	function checkAll() {
		if(filters.length > 0) {
			filters = []
		} else {
			filters = defaultAttributes;
		}

		displayedPunks = search();
	}

	function showOrHideFilters() {
		showFilters = !showFilters;
	}


</script>

<svelte:head>
	<title>Gallery</title>
</svelte:head>

<section class='section'>
	<div class='container'>
		<!-- Main container -->
		<nav class="level">
			<!-- Left side -->
			<div class="level-left">

			</div>

			<!-- Right side -->
			<div class="level-right">
				<div class="level-item">
					<p class="subtitle is-5">
						<strong>{currentSearch.length}</strong> Punks
					</p>
				</div>
				<div class="level-item">
					<div class="field has-addons">
						<p class="control">
							<input bind:value={searchText} class="input" type="text" placeholder="Find a punk">
						</p>
						<p class="control">
							<button class="button">
								Search
							</button>
						</p>
					</div>
				</div>

			</div>
		</nav>

		<div class='columns'>
			<div class='column is-narrow'>
				<div class='block'>
					<h2 class='title is-2'>Filters</h2>
				</div>

				<div class='container'>
					<div class='block'>
						<!--<button class='button is-primary' on:click={checkAll}>Check All</button>
						<button class='button is-primary' on:click={checkAll}>Uncheck All</button>-->
						<button class='button is-primary' on:click={showOrHideFilters}>{showFilters ? 'Hide Filters' : 'Show Filters'}</button>
					</div>
					{#if showFilters}
					<div class='block'>
						<h6 class='title is-6'>Gender</h6>
						<label class="checkbox">
							<input type="checkbox" on:click={() => editFilters("Male")} checked={filters.includes("Male")}>
							Male
						</label>
						<br />
						<label class="checkbox">
							<input type="checkbox" on:click={() => editFilters("Female")} checked={filters.includes("Female")}>
							Female
						</label>
					</div>


					<div class='block'>
						<h6 class='title is-6'>Race</h6>
						<label class="checkbox">
							<input type="checkbox" on:click={() => editFilters("Human")} checked={filters.includes("Human")}>
							Human
						</label>
						<br />
						<label class="checkbox">
							<input type="checkbox" on:click={() => editFilters("Zombie")} checked={filters.includes("Zombie")}>
							Zombie
						</label>
						<br />
						<label class="checkbox">
							<input type="checkbox" on:click={() => editFilters("Ape")} checked={filters.includes("Ape")}>
							Ape
						</label>
						<br />
						<label class="checkbox">
							<input type="checkbox" on:click={() => editFilters("Alien")} checked={filters.includes("Alien")}>
							Alien
						</label>
					</div>

					<div class='block'>
						<h6 class='title is-6'>Attributes</h6>
						{#each attributes as att}
							<label class="checkbox">
								<input type="checkbox" on:click={() => editFilters(att)} checked={filters.includes(att)}>
								{att}
							</label>
							<br />
						{/each}
					</div>
					{/if}
				</div>

			</div>

			<div class='column'>
				<div class='columns is-multiline'>
					{#await displayedPunks}
						<div class='block has-text-centered'>
							Searching...
						</div>
					{:then searchResults}
						{#if searchResults.length > 0}
							{#each searchResults as p (p.id)}
								<div class='column is-one-fifth'>
									<figure class='image is-square'>
										<img loading="lazy" decoding="async" src='/punks/punk{p.id}.png'>
									</figure>

									<div class='block'>
										<h4 class='title is-4 has-text-centered'>Punk #{p.id}</h4>
									</div>
								</div>
							{/each}
						{:else}
							<div class='container'>
								<div class='block has-text-centered'>
									No results.
								</div>
							</div>
						{/if}
					{:catch error}
						<div class='block has-text-centered'>
							Error occurred.
						</div>
					{/await}

				</div>

				<div class='container is-flex is-justify-content-center'>
					<button on:click={loadMore} class='button is-fullwidth'>Load More</button>
				</div>
			</div>
		</div>


	</div>
</section>

<style>
	.is-6 {
			margin-bottom: 0px;
	}
</style>