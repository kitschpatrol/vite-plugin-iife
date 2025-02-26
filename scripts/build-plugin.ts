import { build } from 'esbuild'

await build({
	bundle: true,
	entryPoints: ['src/index.ts'],
	external: ['vite'],
	format: 'esm',
	minify: true,
	outfile: 'dist/index.js',
	platform: 'node',
	target: 'node18',
	tsconfig: 'tsconfig.plugin.json',
})
