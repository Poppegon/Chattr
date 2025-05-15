<script>
	let { children } = $props();
	import LightSwitch from '$lib/components/LightSwitch.svelte';
	import toast, {Toaster} from 'svelte-5-french-toast'
	import { Hamburger } from 'svelte-hamburgers';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { user } from '$lib/user';
	import "../app.css";

	let username = $state("")
	    onMount(() => {
			username = $user ? JSON.parse($user) : "";
			console.log("username: "+ username)
		});

	const tag = "Avocado"

	let tags = [
		tag, tag, tag, tag, tag, tag, tag
	]

	const speechBubbleImgSrc = "SpeechBubble.png"

	let sidebarVisible = $state(true)

	// @ts-ignore
	function saveUsername(e)
	{
		e.preventDefault();
		$user = JSON.stringify(username)
		toast.success("Username saved!")
	}

	function toggleSideBar()
	{
		sidebarVisible = !sidebarVisible
		
		const mainLayout = document.getElementById('mainLayout');
		const title = document.getElementById('title');

		if (!mainLayout || !title) {
			console.error("Required elements not found in the DOM.");
			return;
		}

		if (window.innerWidth <= 768)
		// Small screens
		{
			if (sidebarVisible)
			{
				mainLayout.style.gridTemplateRows = "auto 1fr auto";
				mainLayout.style.gridTemplateColumns = "1fr";
				title.style.display = "block";
			} else {
				mainLayout.style.gridTemplateRows = "auto auto 1fr";
				mainLayout.style.gridTemplateColumns = "1fr";
				title.style.display = "block";
        	}
		} else {
		// Default behavior for larger screens
			if (sidebarVisible)
			{
				mainLayout.style.gridTemplateColumns = "1fr 13fr";
				title.style.display = "none";

			} else {
				mainLayout.style.gridTemplateColumns = "1fr 5fr";
				title.style.display = "block";
			}
		}
	}
</script>

<main id="mainLayout" class="dark:bg-surface-900 bg-surface-50">
	<!-- svelte-ignore event_directive_deprecated -->
	<button class="headerBox fancyText dark:bg-surface-900 bg-surface-50 border-secondary-300 text-primary-950" id="cornerContainer" onclick={()=>toggleSideBar()}>
		<img src="../{speechBubbleImgSrc}" alt="SpeechBubbleImage" id="icon" class="hover:rotate-z-[45deg] duration-500 transform-ease-in-out">
		<span class="{sidebarVisible?"display-block":"display-none"}" id="title">Chattr</span>
	</button>

	<nav class="headerBox fancyText dark:bg-surface-900 bg-surface-50 border-secondary-300 text-primary-950" id="navBar">

		<div class="md:hidden"><Hamburger type="elastic" title="Toggles the navigation buttons" /></div>

		<div id="navButtons" class="md:hidden">
			<a href="{base}/" class="flex flex-col underlined">HOME</a>

			<a href="{base}/createpost" class="underlined">Post something</a>

			<a href="{base}/devblog" class="underlined">Devblog</a>

			<a href="{base}/about" class="underlined">About</a>
		</div>

		<form onsubmit={(e)=>{return saveUsername(e)}}><input type="text" placeholder="Username" class="inputBox text-black dark:bg-surface-100" bind:value={username}/></form>

		<LightSwitch/>
	</nav>

	<aside id="categoriesBox" class="dark:bg-surface-900 bg-surface-50 border-secondary-300">
		<h2 class="text-black text-xl">Taggar</h2>
		<ul>
			{#each tags as tag}
				<li class="tag cursor-pointer text-primary-950">{tag}</li>
				<hr>
			{/each}
		</ul>
	</aside>
	
	{@render children()}
	<Toaster />
</main>

<style>
	#mainLayout {
		display: grid;
		grid-template-columns: 1fr 5fr;
		grid-template-rows: auto 1fr;
		height: 100vh;
		gap: 10px;
		padding: 20px;
		transition: all ease-out 1000ms;
		overflow: hidden;
	}

	* {
		scrollbar-color: var(--color-primary-950) var(--color-gray-50);
		scrollbar-width: 2px;
	}

	#categoriesBox {
		/*overflow-y: scroll;*/
		overflow-x: hidden;
		border-right-width: 5px;
		background: linear-gradient(to bottom, var(--color-surface-50), var(--color-surface-200));
		padding: 10px;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.headerBox {
		padding: 15px;
		border-bottom-width: 5px;
		border-right-width: 5px;
		background-color: var(--color-primary-950);
		color: white;
		font-size: 1.5rem;
		font-weight: bold;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
		padding: 8px;
		margin: 5px 0;
		background-color: var(--color-primary-50);
		border-radius: 5px;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.tag:hover {
		background-color: var(--color-primary-100);
		transform: scale(1.05);
	}

	#navBar {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		padding-left: 20px;
		padding-right: 20px;
		overflow-x: hidden;
	}

	#navButtons {
		display: flex;
		gap: 20px;
	}

	.inputBox {
		border-radius: 20px;
		transition: all ease-out 1000ms;
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

	/*Öppnas på egen risk*/
	@media (max-width: 768px) {
		#mainLayout {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto 1fr;
		}

		#categoriesBox {
			order: 2;
			width: 100%;
			border-right: none;
			border-top: 5px solid var(--color-gray-300);
		}

		#navBar {
			flex-direction: column;
			align-items: flex-start;
			padding: 10px;
		}

		#navButtons {
			flex-direction: column;
			gap: 10px;
			width: 100%;
			background-color: black;
		}

		#cornerContainer {
			justify-content: center;
			width: 100%;
		}

		#icon {
			height: 40px;
		}

		#title {
			font-size: 1.2rem;
		}
	}
</style>