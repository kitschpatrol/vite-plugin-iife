import esbuild from 'esbuild'
import fs from 'node:fs/promises'
import prettyBytes from 'pretty-bytes'
import { type Plugin } from 'vite'

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

				const result = await esbuild.build({
					bundle: true,
					entryPoints: [cleanId],
					format: 'iife',
					minify: minifyResolved,
					platform: 'browser',
					target: 'es6',
					treeShaking: true,
					write: false,
				})

				if (resolvedOptions.verbose) {
					const prettySize = prettyBytes(result.outputFiles[0].contents.length)
					console.log(`[vite-plugin-iife] Output size: ${prettySize}`)
				}

				const iifeCode = result.outputFiles[0].text
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
