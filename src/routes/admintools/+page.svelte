<script>
    import { onMount } from 'svelte';
    import { posts_store } from "$lib/user";
    import { base } from "$app/paths";

    /**
	 * @type {string | any[]}
	 */
    let parsedPostsStore = [];
    onMount(() => {
        parsedPostsStore = JSON.parse($posts_store)
    });

    function removePostByIndex(index)
    {
        parsedPostsStore.slice(index, (index + 1))
        parsedPostsStore = parsedPostsStore
        console.log("removed index: " + index)
    }
</script>

<main>
    <ul>
        {#each parsedPostsStore as post, i}
            <li>
                <a href="{base}/post/{post.id}">
                    {post.header}
                </a>

                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <h1 on:click={()=>removePostByIndex(i)}>X</h1>
            </li>
            <br>
        {/each}
    </ul>
</main>

<style>
    main {
        padding: 10px;
    }

    a:hover {
        text-decoration: underline;
    }

    li {
        display: flex;
        gap: 10px;
    }

    h1 {
        cursor: pointer;
    }
</style>