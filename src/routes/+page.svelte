<script>
	import { base } from '$app/paths';
	import { posts_store } from "$lib/user";
    import { onMount } from 'svelte';

	let parsedPostsStore = null
    onMount(() => {

        parsedPostsStore = JSON.parse($posts_store);
        
    });

	const exampleComment = {
		id: "456def",
		author: "Användare123",
		text: "Det här är en kommentar!",
		date: new Date().toISOString(),
		likes: 2,
		dislikes: 1,
		replies: [] // Möjlighet att svara på kommentarer
	};

	const exampleComment2 = {
		id: "457def",
		author: "Chet Cunningham",
		text: "Varför är Sonic så uppblåst?",
		date: new Date().toISOString(),
		likes: 122,
		dislikes: 21,
		replies: [] // Möjlighet att svara på kommentarer
	};

	const post = {
		id: "123abc", // Unikt ID för identifiering
		author: "Anonym", // Eller ett användarnamn om du har inloggningar
		header: "Header",
		text: "Detta är ett exempel på ett inlägg. Det innehåller lite text för att visa hur ett inlägg kan se ut. Du kan lägga till fler detaljer här om du vill.",
		date: new Date().toISOString(), // Datum i ISO-format
		likes: 0, // Antal likes
		dislikes: 0, // Antal dislikes
		attachedImages: ["GÅS.jpg", "tweakingskeleton.gif", "tweakingskeleton.gif", "SpeechBubble.png", "GÅS.jpg"], // Länk till en bild eller null om ingen finns
		comments: [exampleComment, exampleComment2], // En array av kommentarer
		tags: [] // En array av tags för sortering
	};

	/**
	 * @type {any[]}
	 */
	let posts = [post, post, post, post, post, post, post];

	// @ts-ignore
	function addLike(post)
	{
		post.likes += 1
	}

	// @ts-ignore
	function onlyDate(input)
	{
		return input.split("T")[0];
	}

	// TODO: kolla om man kan kalla från en mer central plats
	function upDatePostsStore()
	{
		$posts_store = JSON.stringify(posts)
		console.log(posts)
	}
</script>


<article>
	{#each posts as post}
		<a href="{base}/post/{post.id}" class="block card card-hover p-4"> <!-- Varje post ser ut så här -->

			<header class="card-header h1"><strong>{post.header}</strong></header>

			<section class="p-4" style="overflow: hidden; max-height: 80%;">{post.text}</section>

				<button type="button" class="btn preset-filled-success-950-50" on:click={()=>addLike(post)}>&#128077;<p>{post.likes}</p></button>
				<button type="button" class="btn preset-filled-error-950-50">&#128078; <p>{post.dislikes}</p></button>
			

			<hr>

			<footer class="flex items-center justify-between gap-4 p-4">
				<p><strong>By:</strong> <em>{post.author}</em></p>
				<p><strong>On:</strong> <em>{onlyDate(post.date)}</em></p>
			</footer>
		</a>
	{/each}
</article>


<style>
	:root {
		--lightGrey: #90aab1;
		--bg: #ffffff;
	}

	* {
		color: black;
		font-family: 'Arial Narrow Bold', sans-serif;
	}

	article {
		width: 100%;
		height: 90vh;
		justify-self: center;

		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr repeat(auto, 1fr);
		gap: 10px;
		padding: 20px;

		overflow: scroll;
	}

	@media (max-width: 1000px) {
		article {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: repeat(auto, 1fr);
		}
	}

	@media (max-width: 700px) {
		article {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(auto, 1fr);
		}
	}

	article > * {
		background-color: #e0e0dc;
		border-color: white;
		border-radius: 20px;
		border-width: 5px;
		padding: 20px;
		color: black;
		height: 400px;
		overflow:auto;
	}
</style>