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
		tailwindcss()
	],
	server: {
		fs: {
			// Allow access to files from the project root.
			allow: ['..']
		}
	},
	build: {
		rollupOptions: {
			external: [
				// 'three/examples/jsm/objects/GroundProjectedSkybox',
				// 'three/examples/jsm/loaders/HDRCubeTextureLoader',
				// 'three/examples/jsm/loaders/RGBELoader'
			]
		}
	},
	resolve: {
		alias: {
			// Add any other Three.js modules that might be causing issues
			'three/examples': 'three/examples'
		}
	},
	optimizeDeps: {
		exclude: ['@threlte/extras']
	}
});
