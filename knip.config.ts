import { knipConfig } from '@kitschpatrol/knip-config'

export default knipConfig({
	entry: ['test/assets/main.ts'],
	ignoreDependencies: ['playwright'],
})
