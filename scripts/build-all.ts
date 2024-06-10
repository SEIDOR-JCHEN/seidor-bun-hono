import { $ } from 'bun'

console.log(process.env.NODE_ENV)

await $`bun build:all`
