<!-- src/routes/devblog/+page.svelte -->
<script>
	export let data;
	import { base } from '$app/paths';
</script>

<main class="p-5 dark:bg-surface-900 bg-surface-50">
	<h1 class="text-primary-950 text-2xl">Devblog</h1>

	<ul>
		{#each data.posts as post}
			<li class="post">
				<a href="{base}/devblog/{post.slug}">
					{post.title} — {post.date}
				</a>
			</li>
			<hr>
		{/each}
	</ul>
</main>

<style>
	main {
		transition: all ease-out 1000ms;
	}

	.post {
		margin-top: 5px;
	}

	.post a:hover {
		transform: scale(1.1);
		display: inline-block;
	}

	.post a {
		transform: scale(1);
		transition: all 1000ms;
	}
</style>