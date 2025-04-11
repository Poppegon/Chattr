import { browser } from "$app/environment";
import { writable } from "svelte/store";

const posts = browser ? window?.localStorage.getItem('posts') ?? "" : ""

export const posts_store = writable(posts)

if (browser) {
    /* https://svelte.dev/tutorial/auto-subscriptions */
    posts_store.subscribe((value) => {
            /* on changes to the posts_store, update the localStorage in the browser. */
            window?.localStorage.setItem('posts', value);
    })
}