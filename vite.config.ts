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
			allow: ['..']
		}
	},
	build: {
		rollupOptions: {
			external: [
				// Externalize all Three.js examples/jsm modules
				/three\/examples\/jsm\/.*/
			],
			// Increase the warning limit for large chunks
			chunkSizeWarningLimit: 1000
		}
	},
	// Add a resolver to handle missing Three.js modules
	resolve: {
		alias: {
			// Create empty modules for problematic imports
			'three/examples/jsm/loaders/DRACOLoader': 'three',
			'three/examples/jsm/shaders/HorizontalBlurShader': 'three',
			'three/examples/jsm/shaders/VerticalBlurShader': 'three',
			'three/examples/jsm/objects/GroundProjectedSkybox': 'three',
			'three/examples/jsm/loaders/HDRCubeTextureLoader': 'three',
			'three/examples/jsm/loaders/RGBELoader': 'three'
		}
	},
	optimizeDeps: {
		exclude: ['@threlte/extras', '@threlte/core']
	}
});
