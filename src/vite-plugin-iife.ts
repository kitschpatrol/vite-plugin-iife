import fs from 'node:fs/promises'
import prettyBytes from 'pretty-bytes'
import { type Plugin, build } from 'vite'

export type IifePluginOptions = {
	minify?: 'auto' | boolean
	verbose?: boolean
}

export default function iife(options?: IifePluginOptions): Plugin {
	// Merge user options with defaults
	const resolvedOptions: Required<IifePluginOptions> = {
		minify: 'auto',
		verbose: false,
		...stripUndefined(options),
	}

	let isBuild = false

	return {
		configResolved(config) {
			isBuild = config.command === 'build'
		},
		name: 'vite-plugin-iife',
		async transform(_, id) {
			if (id.endsWith('?iife')) {
				const cleanId = id.replace(/\?.*$/, '')

				if (resolvedOptions.verbose) {
					console.log(`[vite-plugin-iife] Building IIFE version of "${cleanId}"`)

					const { size } = await fs.stat(cleanId)
					console.log(`[vite-plugin-iife] Input size:  ${prettyBytes(size)}`)
				}

				const minifyResolved =
					resolvedOptions.minify === 'auto' ? Boolean(isBuild) : resolvedOptions.minify

				const result = await build({
					build: {
						minify: minifyResolved,
						rollupOptions: {
							input: cleanId,
							output: {
								format: 'iife',
							},
							treeshake: true,
						},
						target: 'es6',
						write: false,
					},
					configFile: false,
					logLevel: resolvedOptions.verbose ? 'info' : 'silent',
					root: process.cwd(),
				})

				// Type guard on Vite's output
				if (!('output' in result)) {
					throw new TypeError('Unexpected build result')
				}

				if (resolvedOptions.verbose) {
					const prettySize = prettyBytes(result.output[0].code.length)
					console.log(`[vite-plugin-iife] Output size: ${prettySize}`)
				}

				const iifeCode = result.output[0].code
				const wrappedCode = `export default ${JSON.stringify(iifeCode)};`

				return {
					code: wrappedCode,
					map: undefined,
				}
			}
		},
	}
}

function stripUndefined(
	options: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
	if (options === undefined) return undefined
	return Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined))
}
