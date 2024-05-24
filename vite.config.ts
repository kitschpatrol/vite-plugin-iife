import iifePlugin from './src/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		copyPublicDir: false,
		emptyOutDir: true,
		outDir: '../../dist-demo',
	},
	plugins: [iifePlugin({ minify: 'auto', verbose: true })],
	// Some contortions to get the path to the cache
	// to work from a subfolder
	// publicDir: '../../',
	root: './src/demo',
})
