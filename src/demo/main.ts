import codeInlineScript from './iife-me?iife'

const script = document.createElement('script')
script.textContent = codeInlineScript
document.body.append(script)

const pre = document.createElement('pre')
pre.textContent = codeInlineScript
document.body.append(pre)
