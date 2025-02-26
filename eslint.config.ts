import { eslintConfig } from '@kitschpatrol/eslint-config'

export default eslintConfig(
	{
		ignores: ['dist-demo/'],
		type: 'lib',
	},
	{
		files: ['ext.d.ts'],
		rules: {
			'unicorn/prevent-abbreviations': 'off',
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
