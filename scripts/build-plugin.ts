import { build } from 'esbuild'

await build({
	bundle: true,
	entryPoints: ['src/index.ts'],
	external: ['vite'],
	format: 'esm',
	outfile: 'dist/index.js',
	platform: 'node',
	target: 'node20.19.0',
	tsconfig: 'tsconfig.plugin.json',
})
