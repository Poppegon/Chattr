<script>
	import { currentTheme } from '$lib/user';
	import { browser } from "$app/environment";

	if (browser) {
		document.body.setAttribute('data-theme', $currentTheme)
		console.log(document.body.getAttribute('data-theme'))
	}

	// svelte-ignore non_reactive_update
	let currentThemeVar = $state($currentTheme);
/*
	$derived(updateTheme(currentThemeVar))

	function updateTheme(newTheme) {
		if (currentTheme) {
			$currentTheme = JSON.stringify(newTheme)
		}
	}
*/

	let { children } = $props();

	import { base } from '$app/paths';
	import "../app.css";

	const tag = {
		name: "Avocado",
		color: "#568203"
	}

	let tags = [
		tag, tag, tag, tag, tag, tag, tag
	]

	const speechBubbleImgSrc = "SpeechBubble.png"
</script>

<main id="mainLayout">

	<a class="headerBox fancyText bg-primary-300-700 border-secondary-300-700" id="cornerContainer" href="/">
		<img src="../{speechBubbleImgSrc}" alt="SpeechBubbleImage" id="icon">
		Chattr
	</a>

	<nav class="headerBox fancyText bg-primary-300-700 border-secondary-300-700" id="navBar">

		<div id="navButtons">
			<a href="{base}/" class="flex flex-col underlined">HOME</a>

			<a href="{base}/createpost" class="underlined">Post something</a>

			<a href="{base}/devblog" class="underlined">Devblog</a>

			<a href="https://www.newbodyfamily.com/sv-se/shop/s/TGBINME/GBMHNT?ut=1_200" class="underlined">SHOP</a>
		</div>

		<form>
			<select name="Färgtema" bind:value={currentThemeVar}>
				<option value="" selected disabled hidden>Välj här</option>
				<option value="crimson">crimson</option>
				<option value="this one">this one</option>
				<option value="that one">that one</option>
				<option value="the other one">the other one</option>
			</select>
		</form>
	</nav>

	<aside id="categoriesBox" class="bg-primary-300-700 border-secondary-300-700"><h2>Taggar</h2>
		<ul>
			{#each tags as tag}
				<li class="tag cursor-pointer" style="color: {tag.color};">{tag.name}</li>
				<hr>
			{/each}
		</ul>
	</aside>
	
	{@render children()}
</main>


<style>
	#mainLayout {
		display: grid;
		grid-template-columns: 1fr 5fr;
		grid-template-rows: 1fr 9fr;
		height: 100vh;
	}

	#categoriesBox {
		width: auto;
		height: auto;
		overflow: scroll;
		border-right-width: 5px;
	}

	.headerBox {
		padding: 10px;
		border-bottom-width: 5px;
	}

	#cornerContainer {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;
		border-right-width: 5px;
	}

	#icon {
		height: 50px;
		width: auto;
	}

	.fancyText {
		font-weight: bold;
		font-size: larger;
	}

	aside {
		padding-left: 10px;
		float: right;
		font-style: italic;
		background-color: lightgray;

		display: flex;
		flex-direction: column;
	}

	.tag {
		padding-left: 5px;
	}

	.tag:hover {
		background-color: var(--lightGrey);
		transform: scale(1.05);
		padding-left: 12px;

	}

	#navBar {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		padding-left: 20px;
		padding-right: 20px;
	}

	#navButtons {
		display: flex;
		gap: 20px;
	}

	.underlined {
		position: relative;
		display: inline-block;
		text-decoration: none;
	}

	.underlined::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 0;
		height: 3px;
		background: currentColor;
		transition: width 0.3s ease-in-out;
	}

	.underlined:hover::after {
		width: 100%;
	}
</style>