import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		cors: false,
		headers: {
			"Content-Security-Policy": "frame-ancestors 'self' https://youtube.com/"
		}
	},
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
			$services: path.resolve('./src/lib/services'),
			$components: path.resolve('./src/lib/components'),
			$stores: path.resolve('./src/lib/stores'),
			$models: path.resolve('./src/lib/models'),
		}
	}
});
