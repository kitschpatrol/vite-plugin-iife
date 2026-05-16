import { expect, it } from 'vitest'
import codeInlineScript from './assets/iife-me?iife'
import iifeUrl from './assets/iife-me?iife&url'

const IIFE_URL_REGEX = /^\/__iife\/.*iife-me\.ts$/

// TODO this is not actually loading the index.html file
// in ./test/assets
it('converts typescript file to iife on import', () => {
	expect(codeInlineScript).toMatchInlineSnapshot(`
		"(function() {
		  "use strict";
		  const message = "Hello IIFE!";
		  console.log(message);
		})();
		"
	`)
})

it('returns url for iife file with ?iife&url', () => {
	expect(typeof iifeUrl).toBe('string')
	// In dev/test mode, should be a virtual URL starting with /__iife/
	expect(iifeUrl).toMatch(IIFE_URL_REGEX)
})
