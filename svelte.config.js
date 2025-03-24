import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
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
