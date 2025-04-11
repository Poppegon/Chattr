<script>
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

	<a class="headerBox fancyText" id="cornerContainer" href="/">
		<img src="{speechBubbleImgSrc}" alt="SpeechBubbleImage" id="icon">
		Chattr
	</a>

	<nav class="headerBox fancyText">
		<a href="{base}/">Home</a>
		<a href="{base}/post-details">details</a>

		<button type="button" class="btn preset-filled-error-50-950">&#128078;</button>
	</nav>

	<aside id="categoriesBox"><h2>Taggar</h2>
		<ul>
			{#each tags as tag}
				<li class="tag cursor-pointer" style="color: {tag.color};">{tag.name}</li>
				<hr>
			{/each}
		</ul>
	</aside>
</main>
{@render children()}

<style>
	#mainLayout {
		display: grid;
		grid-template-columns: 1fr 5fr;
		grid-template-rows: 1fr 9fr;
	}

	#categoriesBox {
		width: auto;
		height: auto;

		overflow: scroll;
	}

	.headerBox {
		background-color: #90aab1;
		padding: 10px;
		border-left-width: 5px;
		border-bottom-width: 5px;
		border-color: white;
	}

	#cornerContainer {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;
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
</style>