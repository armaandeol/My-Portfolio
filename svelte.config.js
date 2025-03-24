import adapter from '@sveltejs/adapter-auto';
// Replace vitePreprocess with a simpler preprocess import
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Use svelte-preprocess instead of vitePreprocess
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing module errors during prerendering for specific routes
				if (path === '/slice-simulator' || message.includes('ERR_MODULE_NOT_FOUND')) {
					console.warn(`Ignoring prerender error for ${path}: ${message}`);
					return;
				}
				
				// Otherwise throw the error
				throw new Error(message);
			}
		}
	}
};

export default config;
