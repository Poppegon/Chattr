<script>
// @ts-nocheck
    import { Confetti } from "svelte-confetti";
    import toast from 'svelte-5-french-toast';
    import { posts_store } from "$lib/user";
    import { page } from '$app/stores';
    import { base } from '$app/paths';
    import { onMount } from 'svelte';
    import { user } from "$lib/user";

    /**
	 * @type {{ id: any; text: any; } | null}
	 */
    let data = $state(null)
    let parsedPostsStore
    let index = 0
    let username = $state("")
    let newCommentText = $state("")
    let confetti = $state(false)
    let likeOnCooldown = false
    let dislikeOnCooldown = false

    onMount(() => {
        parsedPostsStore = JSON.parse($posts_store);
        username = JSON.parse($user)
        index = parsedPostsStore.indexOf(getPostById(parsedPostsStore))

        data = getPostById(parsedPostsStore);
        console.log(data)
    });
/*
    window.addEventListener("storage", () => {
        // When local storage changes, dump the list to
        // the console.
        console.log(JSON.parse(window.localStorage.getItem("sampleList")));
    });
*/
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
		return input.split("T")[0] + " " + input.split("T")[1].split(".")[0];
	}

    function refreshLike() {
        confetti = false
        likeOnCooldown = false
    }

    function refreshDislike() {
        dislikeOnCooldown = false
    }

    function shootConfetti()
    {
        confetti = true

        setTimeout(refreshLike, 3000);
    }

    function handleLike()
    {
        if (likeOnCooldown) {return}

        parsedPostsStore[index].likes += 1
        parsedPostsStore = parsedPostsStore
        saveData()
        updateData()
        shootConfetti()
        likeOnCooldown = true
    }

    function handleDislike()
    {
        if (dislikeOnCooldown) {return}

        parsedPostsStore[index].dislikes += 1
        parsedPostsStore = parsedPostsStore
        saveData()
        updateData()
        dislikeOnCooldown = true
        setTimeout(refreshDislike, 3000);
    }

    function postComment(e)
    {
        e.preventDefault();
        if (newCommentText.length == "" || username == "") { return }

        parsedPostsStore[index]?.comments?.unshift({
            author: username,
            text: newCommentText,
            date: new Date().toISOString(),
            likes: 0,
            dislikes: 0,
            replies: [] // Möjlighet att svara på kommentarer
        })
        commentToast()
        newCommentText = ""
        updateData()

        console.log()
        saveData()
    }

    function saveData()
    {
        $posts_store = JSON.stringify(parsedPostsStore)
    }

    function commentToast()
    {
        toast.success('Comment posted!')
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
                {#if confetti}
                    <Confetti x={[-0.5, 0.5]} y={[0.25, 1]} amount=100 rounded colorRange={[75, 175]} />
                {/if}

                <button type="button" class="btn hover:bg-primary-950" id="likeBtn" onclick={() => handleLike()}>
                    👍
                </button>
                <span class="badge text-l text-black">{data.likes - data.dislikes || 0}</span>

                <button type="button" class="btn hover:bg-secondary-900" id="dislikeBtn" onclick={() => handleDislike()}>
                    👎
                </button>
            </div>

            <div id="commentsContainer">
                <div class="flex items-center justify-between p-1">
                    <h2 class="text-xl underline"><strong>Comments</strong></h2><br>
                    
                    <form onsubmit={(e)=>{return postComment(e)}}><input type="text" placeholder="Write a comment?" class="inputBox text-black dark:bg-surface-100 w-100" bind:value={newCommentText}/></form>
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
            {#if image.includes("http")}
                <img src="{image}" alt="{image}">
            {:else}
                <img src="{base}/{image}" alt="{image}">
            {/if}
            {/each}
        </section>
    {/if}
    
</article>




<style>
    article {
        transition: all ease-out 1000ms;
    }

    #divided {
        display: grid;
        grid-template-columns: 1fr 400px;
        height: 100%;
        overflow: hidden;
    }

    #imageSection {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;

        width: 100%;
        height: 100%;
    }

    section {
        overflow-x: visible;
        overflow-y: scroll;
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

    #dislikeBtn:active {
        animation: shake 0.15s;
    }

    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
    }

    #likeBtn:active {
        transform: scale(1.2);
    }
</style>