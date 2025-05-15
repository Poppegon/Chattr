<script>
// @ts-nocheck
    import { posts_store } from "$lib/user";
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { user } from "$lib/user";

    /**
	 * @type {{ id: any; text: any; } | null}
	 */
    let data = null
    let parsedPostsStore
    let index = 0
    let username = ""
    let newCommentText = ""

    onMount(() => {
        parsedPostsStore = JSON.parse($posts_store);
        username = JSON.parse($user)
        index = parsedPostsStore.indexOf(getPostById(parsedPostsStore))

        data = getPostById(parsedPostsStore);
        console.log(data)
    });

    const postId = $page.params.post_details;

    if (parsedPostsStore) {
        data = getPostById(parsedPostsStore);
    }

    function updateData() {
        data = getPostById(parsedPostsStore)
    }
    // @ts-ignore
    function getPostById(store)
    {
        return Array.isArray(store) ? store.find(post => post.id === postId) : null;
    }
    // @ts-ignore
    function dateAndTimeInNiceString(input)
	{
		return input.split("T")[1];
	}

    function handleLike()
    {
        parsedPostsStore[index].likes += 1
        parsedPostsStore = parsedPostsStore
        saveData()
        updateData()
    }

    function handleDislike()
    {
        parsedPostsStore[index].dislikes += 1
        parsedPostsStore = parsedPostsStore
        saveData()
        updateData()
    }

    function postComment()
    {
        if (newCommentText.length == "" || username == "") { return }
        parsedPostsStore[index].comments.append({
            author: username,
            text: newCommentText,
            date: new Date().toISOString(),
            likes: 0,
            dislikes: 0,
            replies: [] // Möjlighet att svara på kommentarer
        })

        newCommentText = ""

        console.log()
        saveData()
    }

    function saveData()
    {
        $posts_store = JSON.stringify(parsedPostsStore)
    }
</script>

<article class="overflow-scroll dark:bg-surface-900 bg-surface-50" id="divided">
    <section class="littlePadding">
        {#if data}
            <div class="flex gap-2">
                <h3 class="dark:text-surface-100 text-surface-900">Post ID: {data.id}</h3><br>
                <h3 class="dark:text-surface-100 text-surface-900">Written by: {data.author}</h3>
            </div>
            <h1 class="text-3xl">{data.header}</h1>
            <p class="text-base">{data.text}</p>

            <br><br>
            <div id="like-dislike-buttons" class="bg-surface-200">
                <button type="button" class="btn hover:bg-primary-950" onclick={() => handleLike()}>
                    👍
                </button>
                <span class="badge text-l text-black">{data.likes - data.dislikes || 0}</span>

                <button type="button" class="btn hover:bg-secondary-900" onclick={() => handleDislike()}>
                    👎
                </button>
            </div>

            <div id="commentsContainer">
                <div class="flex items-center justify-between p-1">
                    <h2 class="text-xl underline"><strong>Comments</strong></h2><br>
                    
                    <form onsubmit={(e)=>{return postComment(e)}}>
                        <input type="text" placeholder="Write a comment?" class="inputBox text-black dark:bg-surface-100 w-100" />
                    </form>
                </div>
                    
                {#if data.comments && data.comments.length > 0}

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
        overflow: hidden;
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

	.inputBox {
		border-radius: 20px;
        transition: all ease-out 1000ms;
	}

    #like-dislike-buttons{
        justify-content: space-around;
        align-items: center;
        margin-bottom: 10px;
        padding: 5px;
        width: fit-content;
        border-radius: 10px;
    }
</style>