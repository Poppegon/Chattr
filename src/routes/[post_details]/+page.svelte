<script>
    import { page } from '$app/stores';
    import { posts_store } from "$lib/user";
    import { onMount } from 'svelte';

    /**
	 * @type {{ id: any; text: any; } | null}
	 */
    let data = null

    onMount(() => {

        const parsedPostsStore = JSON.parse($posts_store);

        data = getPostById(parsedPostsStore);

        console.log(data)
    });

    $: postId = $page.params.post_details;

    $: if (posts_store) {
        data = getPostById(posts_store);
    }

    // @ts-ignore
    function getPostById(store)
    {
        return Array.isArray(store) ? store.find(post => post.id === postId) : null;
    }
</script>

<main class="w-screen h-screen overflow-hidden">
    <div id="pageShell">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</main>

{#if data}
    <h1>{data.id}</h1>
    <p>{data.text}</p>
    {:else}
    <p>No Data</p>
{/if}


<style>
    #pageShell {
        height: 100%;
        width: 100%;

        display: grid;
        grid-template-columns: 5fr 3fr;
        grid-template-rows: 1fr 10fr;

        gap: 5px;
    }

    #pageShell > * {
        border-width: 5px;
    }
</style>