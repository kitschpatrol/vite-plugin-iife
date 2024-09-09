// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import iifePlugin from './src'

export default defineConfig({
	// Build: {
	// 	copyPublicDir: false,
	// 	emptyOutDir: true,
	// 	outDir: '../../dist-demo',
	// },
	plugins: [iifePlugin({ minify: 'auto', verbose: true })],
	// Some contortions to get the path to the cache
	// to work from a subfolder
	// publicDir: '../../',
	root: './test/assets',
	test: {
		browser: {
			enabled: true,
			name: 'chromium',
			provider: 'playwright',
		},
		dir: 'test',
	},
})
