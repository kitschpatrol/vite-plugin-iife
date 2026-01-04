declare module '*?iife' {
	const content: string
	export default content
}

declare module '*?iife&url' {
	const url: string
	export default url
}

declare module '*?url&iife' {
	const url: string
	export default url
}
