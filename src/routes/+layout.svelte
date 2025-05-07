<script>
	let { children } = $props();

	import { base } from '$app/paths';
	import "../app.css";

	import LightSwitch from '$lib/components/LightSwitch.svelte';

	const tag = "Avocado"

	let tags = [
		tag, tag, tag, tag, tag, tag, tag
	]

	const speechBubbleImgSrc = "SpeechBubble.png"
</script>

<main id="mainLayout">

	<a class="headerBox fancyText dark:bg-surface-900 bg-surface-50 border-secondary-300 text-primary-950" id="cornerContainer" href="/">
		<img src="../{speechBubbleImgSrc}" alt="SpeechBubbleImage" id="icon">
		Chattr
	</a>

	<nav class="headerBox fancyText dark:bg-surface-900 bg-surface-50 border-secondary-300 text-primary-950" id="navBar">

		<div id="navButtons">
			<a href="{base}/" class="flex flex-col underlined">HOME</a>

			<a href="{base}/createpost" class="underlined">Post something</a>

			<a href="{base}/devblog" class="underlined">Devblog</a>

			<a href="https://www.newbodyfamily.com/sv-se/shop/s/TGBINME/GBMHNT?ut=1_200" class="underlined">SHOP</a>
		</div>

		<LightSwitch/>
	</nav>

	<aside id="categoriesBox" class="dark:bg-surface-900 bg-surface-50 border-secondary-300">
		<h2 class="text-surface-950-50 text-xl">Taggar</h2>
		<ul>
			{#each tags as tag}
				<li class="tag cursor-pointer text-primary-950">{tag}</li>
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
		overflow-y: scroll;
		overflow-x: hidden;

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
		display: flex;
		flex-direction: column;
	}

	.tag {
		padding-left: 5px;
		transition: all 100ms;
	}

	.tag:hover {
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