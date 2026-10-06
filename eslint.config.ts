import { eslintConfig } from '@kitschpatrol/eslint-config'

export default eslintConfig(
	{
		type: 'lib',
	},
	{
		files: ['ext.d.ts'],
		rules: {
			'unicorn/name-replacements': 'off',
		},
	},
	{
		files: ['readme.md/*.ts'],
		rules: {
			'import/no-unresolved': 'off',
			'ts/triple-slash-reference': 'off',
		},
	},
)
