// src/routes/devblog/[slug]/+page.js
import {error} from '@sveltejs/kit'
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const modules = import.meta.glob('../*.svx', { eager: true });
  const match = Object.entries(modules).find(([path]) =>
    path.includes(`${params.blog_details}.svx`)
  );
  if (!match) throw error(404, 'Post not found');

  const post = match[1];
  const { title, date } = post.metadata;
  const content = post.default;

  return {
    content,
    title,
    date,
  };
}