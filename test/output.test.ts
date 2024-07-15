import codeInlineScript from './assets/iife-me?iife'
import { expect, it } from 'vitest'

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
