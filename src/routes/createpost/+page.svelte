<script>
    import { base } from '$app/paths';
    import { posts_store } from "$lib/user";

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

    function generateID()
    {

    }

    function createPost() {
        const post = {
            id: "123abc", // Unikt ID för identifiering
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

        posts_store.update(posts => [...posts, newPost]);
    }
</script>

<main>
    <form on:submit|preventDefault={createPost}>
        <label for="title" class="text-2xl">Title:</label>
        <input id="title" type="text" bind:value={title} required />

        <label for="content" class="text-2xl">Content:</label>
        <textarea id="content" bind:value={content} required></textarea>

        <button type="submit">Create Post</button>
    </form>

    <aside id="toolSelector">

    </aside>
</main>

<style>
    main {
        height: 100%;
        width: 100%;

        display: grid;
        grid-template-columns: 1fr 300px;
        grid-template-rows: 1fr;
    }

    form {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 40px 1fr 50px 10fr 1fr;

        padding: 10px;
    }
</style>