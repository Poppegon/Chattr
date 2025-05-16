<script>
    import toast from 'svelte-5-french-toast';
    import { posts_store } from "$lib/user";
    import { goto } from "$app/navigation";
    import { base } from '$app/paths';
    import { onMount } from "svelte";
    import { user } from '$lib/user';

    let title = "";
    let content = "";
    /**
	 * @type {never[]}
	 */
    let images = [];
    /**
	 * @type {never[]}
	 */
    let tags = [];
    let username = "";
    let newImgUrl = "";
    let newPostId = "";

    /**
	 * @type {any[]}
	 */
    let parsedPostsStore = [];
    let postCreated = false;

    onMount(() => {
        parsedPostsStore = JSON.parse($posts_store)
        username = user ? JSON.parse($user) : "";
    });

    function generateID() {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
        const randomNumber = () => numbers[Math.floor(Math.random() * numbers.length)];
        
        let newID = "";
        do {
            newID = `${randomNumber()}${randomNumber()}${randomNumber()}${randomLetter()}${randomLetter()}${randomLetter()}`;
        } while (parsedPostsStore.some(post => post.id === newID));
        
        return newID;
    }

    function createPost() {
        if (postCreated) {
            goto(base + "/post/" + newPostId)
            return
        }

        newPostId = generateID()
        const newPost = {
            id: newPostId, // Unikt ID för identifiering
            author: username, // Eller ett användarnamn om du har inloggningar
            header: title,
            text: content,
            date: new Date().toISOString(), // Datum i ISO-format
            likes: 0, // Antal likes
            dislikes: 0, // Antal dislikes
            attachedImages: images, // Länk till en bild eller null om ingen finns
            comments: [], // En array av kommentarer
            tags: tags // En array av tags för sortering
        };

        $posts_store = JSON.stringify([...parsedPostsStore, newPost]);
        //alert("Your post has been posted!!!")
        postCreated = true
        postToast()
    }

    function addImage()
    {
        if (newImgUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
            images.push(newImgUrl);
            images = images;
            alert("added image" + newImgUrl)
            newImgUrl = ""
        } else {
            alert("Please enter a valid image URL.");
        }
    }

    //{toaster.info({title: 'this is a toast'});}

    function postToast()
    {
        toast.success('Post posted!')
    }
</script>

<main class="dark:bg-surface-900 bg-surface-50">
    <form on:submit|preventDefault={createPost}>
        
        <div id="topBar">
            <h1>Create a post here...</h1>

            <p>{newPostId}</p>

            <button type="submit" class="border2px fancyText btn transition-all duration-1000 {postCreated?"preset-outlined-white bg-primary-950":"preset-outlined-primary-50-950"}">{postCreated?"View Post":"Create Post"}</button>
        </div>

        <input placeholder="Title" type="text" bind:value={title} required class="inputBox text-black dark:bg-surface-100"/>

        <textarea placeholder="Main Paragraph" bind:value={content} required class="inputBox text-black dark:bg-surface-100"></textarea>
    </form>

    <aside id="toolSelector">
        <form on:submit|preventDefault={addImage}>
            <input placeholder="Paste image url here" type="text" bind:value={newImgUrl} required class="inputBox text-black dark:bg-surface-100"/>
            <button type="submit" class="border2px fancyText btn transition-all duration-1000 preset-outlined-secondary-200-800">Attach image</button>
        </form>
        <label for="attachedImagesShowcase">Attached Images:</label>
        <div id="attachedImagesShowcase">
            {#if images.length > 0}
                {#each images as img}
                    <img src="{img}" alt="attached by user">
                {/each}

                {:else}
                <p>No images attached yet</p>
            {/if}
        </div>
    </aside>
</main>

<style>
    main {
        height: 100%;
        width: 100%;
        transition: all ease-out 1000ms;
        display: grid;
        grid-template-columns: 1fr 400px;
        grid-template-rows: 1fr;
    }

    form {
        display: grid;
        padding: 10px;
        gap: 5px;
        grid-template-rows: 50px 50px 1fr;
    }

    .fancyText {
		font-weight: bold;
		font-size: larger;
	}

    .border2px {
        border-width: 2px;
    }

    button {
        height: 40px;
        border-radius: 20px;
    }

    .inputBox {
        border-radius: 20px;
        transition: all ease-out 1000ms;
    }
    
    #topBar {
        display: flex;
        padding: 5px;
        justify-content: space-between;
    }

    #toolSelector {
        display: grid;
        grid-template-rows: 130px 1fr;
        padding: 15px;
        gap: 5px;
        height: 100%;
    }

    #attachedImagesShowcase {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        overflow-y: scroll;

        height: 530px;
        width: 100%;
    }
</style>