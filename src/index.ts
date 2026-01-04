import type { Plugin, ViteDevServer } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import prettyBytes from 'pretty-bytes'
import { build } from 'vite'

export type IifePluginOptions = {
	minify?: 'auto' | boolean
	verbose?: boolean
}

const IIFE_URL_PREFIX = '/__iife'

/**
 * A Vite plugin that builds an IIFE version of a module.
 */
export default function iife(options?: IifePluginOptions): Plugin {
	// Merge user options with defaults
	const resolvedOptions: Required<IifePluginOptions> = {
		minify: 'auto',
		verbose: false,
		...stripUndefined(options),
	}

	let isBuild = false
	let root = process.cwd()

	// Cache for dev server IIFE builds
	const iifeCache = new Map<string, string>()

	return {
		configResolved(config) {
			isBuild = config.command === 'build'
			root = config.root
		},
		// Serve IIFE files in dev mode
		configureServer(server: ViteDevServer) {
			server.middlewares.use(async (request, response, next) => {
				if (!request.url?.startsWith(IIFE_URL_PREFIX + '/')) {
					next()
					return
				}

				const filePath = request.url.slice(IIFE_URL_PREFIX.length)
				const relativeFilePath = filePath.startsWith('/') ? filePath.slice(1) : filePath
				const absolutePath = path.resolve(root, relativeFilePath)

				if (!absolutePath.startsWith(root)) {
					response.statusCode = 403
					response.end('Access Denied')
					return
				}

				try {
					// Check cache first
					let iifeCode = iifeCache.get(absolutePath)

					if (!iifeCode) {
						iifeCode = await buildIife(absolutePath, resolvedOptions, isBuild, root)
						iifeCache.set(absolutePath, iifeCode)
					}

					response.setHeader('Content-Type', 'application/javascript')
					response.end(iifeCode)
				} catch (error) {
					next(error)
				}
			})

			// Invalidate cache on file changes
			server.watcher.on('change', (changedPath) => {
				if (iifeCache.has(changedPath)) {
					iifeCache.delete(changedPath)
					if (resolvedOptions.verbose) {
						console.log(`[vite-plugin-iife] Cache invalidated for "${changedPath}"`)
					}
				}
			})
		},
		name: 'vite-plugin-iife',
		async transform(_, id) {
			// Handle ?iife&url - return URL to the IIFE file
			if (id.includes('?iife&url') || id.includes('?url&iife')) {
				const cleanId = id.replace(/\?.*$/, '')

				if (!isBuild) {
					// Dev mode: return virtual URL served by middleware
					const relativePath = path.relative(root, cleanId).split(path.sep).join('/')
					const url = `${IIFE_URL_PREFIX}/${relativePath}`
					return {
						code: `export default ${JSON.stringify(url)};`,
						map: undefined,
					}
				}

				// Build mode: emit file as asset and return URL
				const iifeCode = await buildIife(cleanId, resolvedOptions, isBuild, root)
				const fileName = path.basename(cleanId).replace(/\.[^.]+$/, '.iife.js')

				const refId = this.emitFile({
					name: fileName,
					source: iifeCode,
					type: 'asset',
				})

				return {
					code: `export default import.meta.ROLLUP_FILE_URL_${refId};`,
					map: undefined,
				}
			}

			// Handle ?iife - return IIFE code as string (existing behavior)
			if (id.endsWith('?iife')) {
				const cleanId = id.replace(/\?.*$/, '')
				const iifeCode = await buildIife(cleanId, resolvedOptions, isBuild, root)

				return {
					code: `export default ${JSON.stringify(iifeCode)};`,
					map: undefined,
				}
			}
		},
	}
}

/**
 * Build a module as an IIFE.
 */
async function buildIife(
	filePath: string,
	options: Required<IifePluginOptions>,
	isBuild: boolean,
	root: string,
): Promise<string> {
	if (options.verbose) {
		console.log(`[vite-plugin-iife] Building IIFE version of "${filePath}"`)
		const { size } = await fs.stat(filePath)
		console.log(`[vite-plugin-iife] Input size:  ${prettyBytes(size)}`)
	}

	const minifyResolved = options.minify === 'auto' ? isBuild : options.minify

	const result = await build({
		build: {
			minify: minifyResolved,
			rollupOptions: {
				input: filePath,
				output: {
					format: 'iife',
				},
				treeshake: true,
			},
			target: 'es6',
			write: false,
		},
		configFile: false,
		logLevel: options.verbose ? 'info' : 'silent',
		root,
	})

	// Type guard on Vite's output
	if (!('output' in result)) {
		throw new TypeError('Unexpected build result')
	}

	const iifeCode = result.output[0].code

	if (options.verbose) {
		const prettySize = prettyBytes(iifeCode.length)
		console.log(`[vite-plugin-iife] Output size: ${prettySize}`)
	}

	return iifeCode
}

function stripUndefined(
	options: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
	if (options === undefined) return undefined
	return Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined))
}
