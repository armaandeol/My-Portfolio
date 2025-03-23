import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite'	

export default defineConfig({
	
	plugins: [
		Icons({
			compiler: 'svelte',
			autoInstall: true
		}),
		sveltekit(),
		tailwindcss()],
	server: {
		fs: {
			// Allow access to files from the project root.
			allow: ['..']
		}
	}
});
