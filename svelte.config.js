import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { adapter: adapter({
		pages: 'docs',
		assets: 'docs',
		fallback: "404"
	}
) },
	extensions: ['.svelte', '.svx']
};

export default config;
