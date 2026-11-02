import { expect, it } from 'vitest'
import codeInlineScript from './assets/iife-me?iife'
import iifeUrl from './assets/iife-me?iife&url'

const IIFE_URL_REGEX = /^\/__iife\/.*iife-me\.ts$/v

// TODO this is not actually loading the index.html file
// in ./test/assets
it('converts typescript file to iife on import', () => {
	expect(codeInlineScript).toMatchInlineSnapshot(`
		""use strict";
		(function() {
			// test/assets/iife-me.ts
			console.log("Hello IIFE!");
		})();
		"
	`)
})

it('returns url for iife file with ?iife&url', () => {
	expect(typeof iifeUrl).toBe('string')
	// In dev/test mode, should be a virtual URL starting with /__iife/
	expect(iifeUrl).toMatch(IIFE_URL_REGEX)
})

it('serves the IIFE code at the imported url', async () => {
	// eslint-disable-next-line node/no-unsupported-features/node-builtins -- This test runs in Chromium.
	const response = await fetch(iifeUrl)
	expect(response.ok).toBe(true)
	expect(response.headers.get('Content-Type')).toContain('application/javascript')
	expect(await response.text()).toBe(codeInlineScript)
})
