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

    function dateAndTimeInNiceString(input)
	{
        console.log(input)
		return input.split("T")[1];
	}
</script>

<article class="overflow-scroll" id="divided">
    <section class="littlePadding">
        {#if data}
            <h3 class="text-surface-100">Post ID: {data.id}</h3><br>

            <h1 class="text-3xl">{data.header}</h1>
            <p class="text-base">{data.text}</p>

            <br><br>
            <div id="like-dislike-buttons">
                <button type="button" class="btn preset-filled-success-200-800" on:click={() => handleLike()}>
                    👍 Like
                </button>
                <span class="badge preset-outlined-success-500 text-l">{data.likes || 0}</span>

                <button type="button" class="btn preset-filled-error-200-800" on:click={() => handleDislike()}>
                    👎 Dislike
                </button>
                <span>{data.dislikes || 0}</span>
            </div>

            <div id="commentsContainer">
                {#if data.comments && data.comments.length > 0}
                    <h2><strong>Comments</strong></h2><br>

                    <ul>
                        {#each data.comments as comment}

                            <li class="comment">
                                <p>{comment.text}</p>
                                {#if comment.author}
                                    <p><em>By: {comment.author}</em></p>
                                {/if}
                                {#if comment.date}
                                    <p><small>Posted on: {dateAndTimeInNiceString(comment.date)}</small></p>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <p>No comments available</p>
                {/if}
            </div>
        {:else}
            <p>No Data</p>
        {/if}
    </section>

    {#if data}
        <section id="imageSection">
            {#each data.attachedImages as image}
                <img src="../{image}" alt="{image}">
            {/each}
        </section>
    {/if}
    
</article>




<style>
    #divided {
        display: grid;
        grid-template-columns: 1fr 400px;
        height: 100%;
    }

    #imageSection {
        border-left-width: 5px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        overflow-x: visible;
        overflow-y: scroll;

        width: 100%;
        height: 100%;
    }

    .littlePadding {
        padding: 10px;
    }

    #commentsContainer {
        border-width: 3px;
        padding: 10px;
    }

    .comment {
        border-top-width: 2px;
        padding-top: 5px;
    }

    #like-dislike-buttons{
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding-left: 5px;
    }
</style>