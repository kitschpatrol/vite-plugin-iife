import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import iifePlugin from './src'

export default defineConfig({
	// Vitest 5 browser mode defaults to 'warn', which hides the plugin's verbose output
	logLevel: 'info',
	plugins: [iifePlugin({ minify: 'auto', verbose: true })],
	root: './test/assets',
	test: {
		browser: {
			enabled: true,
			instances: [{ browser: 'chromium' }],
			provider: playwright(),
		},
		dir: 'test',
	},
})
