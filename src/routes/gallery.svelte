<script context="module" lang="ts">
	//export const prerender = true;
</script>

<script>
	import { slide } from 'svelte/transition';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { onMount } from "svelte";
	import Fuse from 'fuse.js';
	import { punks } from '$lib/data.ts';

	let genderTriggers = [];
	let raceTriggers = [];
	let attributeTriggers = [];
	beforeUpdate(() => {
		if(showGenders) {
			genderTriggers.forEach((checkbox, index) => {
				if(checkbox !== null) {
					checkbox.checked = genderFilters.includes(genders[index]);
				}
			});
		}

		if(showRaces) {
			raceTriggers.forEach((checkbox, index) => {
				if(checkbox !== null) {
					checkbox.checked = raceFilters.includes(races[index]);
				}
			});
		}

		if(showAttributes) {
			attributeTriggers.forEach((checkbox, index) => {
				if(checkbox !== null) {
					checkbox.checked = attributeFilters.includes(attributes[index]);
				}
			});
		}
	})

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
	let genderFilters = ["All"];
	let raceFilters = ["All"];
	let attributeFilters = ["All"];
	let filters = ["Male", "Female", "Human", "Zombie", "Ape", "Alien", "Mohawk", "Eye Mask", "Earring", "Silver Chain", "Do Rag", "Frown", "Fedora", "Pipe", "Hoodie", "Big Shades", "Purple Lipstick", "Beret", "Knitted Cap", "Laser Eyes", "Half Shaved", "Cap", "Vape", "Tyrolean", "Messy Hair", "Mustache", "Cigarette", "Peak Spike", "Purple Hair", "Shaved Head", "Normal Beard", "Mole", "Frumpy Hair", "Clown Nose", "Headband", "Green Eye Shadow", "Blonde Bob", "Horned Rim Glasses", "Mohawk Thin", "Wild Hair", "Rosy Cheeks", "Clown Eyes Green", "Clown Eyes Blue", "Smile", "Shadow Beard", "Stringy Hair", "Normal Beard Black", "Medical Mask", "Police Cap", "Front Beard Dark", "Frumpyhair", "Small Shades", "Cap Forward", "Choker", "Bandana", "Mohawk Dark", "Nerd Glasses", "Front Beard", "Turban", "Eye Patch", "Goat", "Laser Eyes Gold", "Spots", "Wild White Hair", "Royal Cocktail Hat", "Luxurious Beard", "Straight Hair Dark", "Classic Shades", "Straight Hair", "Crazy Hair", "Black Lipstick", "Gold Chain", "Boater", "Buck Teeth", "Welding Goggles", "Tuque", "Chinstrap", "Straight Hair Blonde", "Tassle Hat", "Muttonchops", "Handlebars", "VR", "3D Glasses", "Wild Blonde", "Fez", "Sombrero", "Hot Lipstick", "Clown Hair Green", "Orange Side", "Big Beard", "Vampire Hair", "Blue Eye Shadow", "Blonde Short", "Beanie", "Dark Hair", "Flamenco Hat", "Pilot Helmet", "Regular Shades", "Pigtails", "Cowboy Hat", "Pink With Hat", "Flower Crown", "Top Hat", "Panama Hat", "Red Mohawk", "Tiara"];
	let genders = [ "All", "Male", "Female" ];
	let races = [ "All", "Human", "Zombie", "Ape", "Alien" ];
	let attributes = [ "Mohawk", "Eye Mask", "Earring", "Silver Chain", "Do Rag", "Frown", "Fedora", "Pipe", "Hoodie", "Big Shades", "Purple Lipstick", "Beret", "Knitted Cap", "Laser Eyes", "Half Shaved", "Cap", "Vape", "Tyrolean", "Messy Hair", "Mustache", "Cigarette", "Peak Spike", "Purple Hair", "Shaved Head", "Normal Beard", "Mole", "Frumpy Hair", "Clown Nose", "Headband", "Green Eye Shadow", "Blonde Bob", "Horned Rim Glasses", "Mohawk Thin", "Wild Hair", "Rosy Cheeks", "Clown Eyes Green", "Clown Eyes Blue", "Smile", "Shadow Beard", "Stringy Hair", "Normal Beard Black", "Medical Mask", "Police Cap", "Front Beard Dark", "Frumpyhair", "Small Shades", "Cap Forward", "Choker", "Bandana", "Mohawk Dark", "Nerd Glasses", "Front Beard", "Turban", "Eye Patch", "Goat", "Laser Eyes Gold", "Spots", "Wild White Hair", "Royal Cocktail Hat", "Luxurious Beard", "Straight Hair Dark", "Classic Shades", "Straight Hair", "Crazy Hair", "Black Lipstick", "Gold Chain", "Boater", "Buck Teeth", "Welding Goggles", "Tuque", "Chinstrap", "Straight Hair Blonde", "Tassle Hat", "Muttonchops", "Handlebars", "VR", "3D Glasses", "Wild Blonde", "Fez", "Sombrero", "Hot Lipstick", "Clown Hair Green", "Orange Side", "Big Beard", "Vampire Hair", "Blue Eye Shadow", "Blonde Short", "Beanie", "Dark Hair", "Flamenco Hat", "Pilot Helmet", "Regular Shades", "Pigtails", "Cowboy Hat", "Pink With Hat", "Flower Crown", "Top Hat", "Panama Hat", "Red Mohawk", "Tiara" ];

	attributes.sort();
	attributes.splice(0, 0, "All");

	let page = 1;
	let showGenders = true;
	let showRaces = true;
	let showAttributes = true;

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
		if(!genderFilters.includes('All')) {
			currentSearch = currentSearch.filter(b => genderFilters.includes(b.gender));
		}

		//Race filtering
		if(!raceFilters.includes('All')) {
			currentSearch = currentSearch.filter(b => raceFilters.includes(b.race));
		}

		console.log(currentSearch.length);

		//Attribute filtering
		if(!attributeFilters.includes('All')) {
			currentSearch = currentSearch.filter(punkContainsAnAttribute);
			/*attributes.forEach(att => {
				if(!attributeFilters.includes(att)) {
					currentSearch = currentSearch.filter(b => !b.attributes.includes(att))
				}
			});*/
		}

		console.log(currentSearch.length);

		if (currentSearch.length > 50) {
			return currentSearch.slice(0, 50);
		} else if (currentSearch.length < 1) {
			//no results
			console.log("No results");
			return [];
		} else {
			return currentSearch;
		}
	}

	let displayedPunks = search();

	$: searchText, getPunks();

	function punkContainsAnAttribute(punk) {
		let javascriptSucks = false;
		punk.attributes.forEach(att => {
			if(attributeFilters.includes(att)) {
				console.log("Punk contains attribute "+att);
				javascriptSucks = true;
			}
		});

		return javascriptSucks;
	}

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

	function editGenderFilters(filter) {
		if(filter == 'All') {
			console.log("Filter is all");
			if(genderFilters.includes(filter)) {
				genderFilters = genderFilters;
				return;
			} else {
				genderFilters = ["All"];
			}
		} else {
			if(genderFilters.includes('All')) {
				genderFilters = []
				genderFilters.push(filter);
				genderFilters = genderFilters;
			} else {
				if(genderFilters.includes(filter)) {
					let index = genderFilters.indexOf(filter);
					genderFilters.splice(index, 1);
					if(genderFilters.length < 1) {
						genderFilters = ['All'];
					}
				} else {
					genderFilters.push(filter);
				}
			}
		}

		displayedPunks = search();
	}

	function editRaceFilters(filter) {
		if(filter === 'All') {
			if(raceFilters.includes(filter)) {
				return;
			} else {
				raceFilters = ["All"];
			}
		} else {
			if(raceFilters.includes('All')) {
				raceFilters = []
				raceFilters.push(filter);
				raceFilters = raceFilters;
			} else {
				if(raceFilters.includes(filter)) {
					let index = raceFilters.indexOf(filter);
					raceFilters.splice(index, 1);
					if(raceFilters.length < 1) {
						raceFilters = ['All'];
					}
				} else {
					raceFilters.push(filter);
				}
			}
		}

		displayedPunks = search();
	}

	function editAttributeFilters(filter) {
		if(filter === 'All') {
			if(attributeFilters.includes(filter)) {
				return;
			} else {
				attributeFilters = ["All"];
			}
		} else {
			if(attributeFilters.includes('All')) {
				attributeFilters = []
				attributeFilters.push(filter);
				attributeFilters = attributeFilters;
			} else {
				if(attributeFilters.includes(filter)) {
					let index = attributeFilters.indexOf(filter);
					attributeFilters.splice(index, 1);
					if(attributeFilters.length < 1) {
						attributeFilters = ['All'];
					}
				} else {
					attributeFilters.push(filter);
				}
			}
		}
		console.log(attributeFilters);
		displayedPunks = search();
	}

	function resetFilters() {
		genderFilters = ["All"];
		raceFilters = ["All"];
		attributeFilters = ["All"];
	}

	onMount(async () => {
		if(window.innerWidth <= 768) {
			showGenders = false;
			showRaces = false;
			showAttributes = false;
		}
	});


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
			<div class='column is-3'>
				<div class='block'>
					<h2 class='title is-2'>Filters</h2>
					<hr/>
				</div>

				<div class='container'>
						<div class='block'>
							<!-- Main container -->
							<nav class="level filters-level" on:click={() => showGenders = !showGenders}>
								<!-- Left side -->
								<div class="level-left">
									<h6 class='title is-6'>Gender</h6>
								</div>

								<!-- Right side -->
								<div class="level-right">
									<span class="icon">
										{#if showGenders}
											<i class="fas fa-minus"></i>
										{:else}
											<i class="fas fa-plus"></i>
										{/if}
									</span>
								</div>
							</nav>

							{#if showGenders}
								<div class='block' transition:slide|local>
									{#each genders as gender, i}
										<label class="checkbox">
											<input type="checkbox" bind:this={genderTriggers[i]} on:click={() => editGenderFilters(gender)} checked={genderFilters.includes(gender)}>
											{gender}
										</label>
										<br />
									{/each}
								</div>
							{/if}
						</div>

						<hr/>

						<div class='block'>
							<nav class="level filters-level" on:click={() => showRaces = !showRaces}>
								<!-- Left side -->
								<div class="level-left">
									<h6 class='title is-6'>Race</h6>
								</div>

								<!-- Right side -->
								<div class="level-right">
									<span class="icon">
										{#if showRaces}
											<i class="fas fa-minus"></i>
										{:else}
											<i class="fas fa-plus"></i>
										{/if}
									</span>
								</div>
							</nav>

							{#if showRaces}
								<div class='block' transition:slide|local>
									{#each races as race, i}
										<label class="checkbox">
											<input type="checkbox" bind:this={raceTriggers[i]} on:click={() => editRaceFilters(race)} checked={raceFilters.includes(race)}>
											{race}
										</label>
										<br />
									{/each}
								</div>
							{/if}
						</div>

						<hr/>

						<div class='block'>
							<nav class="level filters-level" on:click={() => showAttributes = !showAttributes}>
								<!-- Left side -->
								<div class="level-left">
									<h6 class='title is-6'>Attributes</h6>
								</div>

								<!-- Right side -->
								<div class="level-right">
									<span class="icon">
										{#if showAttributes}
											<i class="fas fa-minus"></i>
										{:else}
											<i class="fas fa-plus"></i>
										{/if}
									</span>
								</div>
							</nav>

							{#if showAttributes}
								<div class='block' transition:slide|local>
									{#each attributes as att, i}
										<label class="checkbox">
											<input type="checkbox" bind:this={attributeTriggers[i]} on:click={() => editAttributeFilters(att)} checked={attributeFilters.includes(att)}>
											{att}
										</label>
										<br />
									{/each}
								</div>
							{/if}
						</div>
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

	hr {
			background-color: #000000;
			height: 1px;
	}

	.filters-level {
			cursor: pointer;
			margin-bottom: 5px;
	}


</style>