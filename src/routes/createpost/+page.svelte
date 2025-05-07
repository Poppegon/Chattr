<script>
    import { posts_store } from "$lib/user";
    import { onMount } from "svelte";

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
    let newPostId = null;

    let parsedPostsStore = [];

    onMount(() => {
        parsedPostsStore = JSON.parse($posts_store)

        newPostId = generateID()
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
        alert("Your post has been posted!!!")
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
</script>

<main>
    <form on:submit|preventDefault={createPost}>
        
        <div id="topBar">
            <h1>Create a post here...</h1>

            <p>{newPostId}</p>

            <button type="submit" class="border2px fancyText btn preset-outlined-secondary-200-800">Post</button>
        </div>

        <input placeholder="Title" type="text" bind:value={title} required class="inputBox text-black"/>

        <textarea placeholder="Main Paragraph" bind:value={content} required class="inputBox text-black"></textarea>
    </form>

    <aside id="toolSelector">
        <form on:submit|preventDefault={addImage}>
            <input placeholder="Paste image url here" type="text" bind:value={newImgUrl} required class="inputBox text-black"/>
            <button type="submit" class="border2px fancyText btn preset-outlined-secondary-200-800">Attach image</button>
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