import { Hono } from 'hono'
const app = new Hono()

let welcome = 'Welcome to Seidor API! 🚀'

switch (process.env.NODE_ENV) {
  case 'development':
    welcome += ' 🚧 Development 🚧'
    break
  case 'test':
    welcome += ' 🧪 Test 🧪'
    break
  case 'production':
    welcome += ' 🚨 Production 🚨'
    break
  default:
    welcome += ' 🤷‍♂️ Unknown 🤷‍♂️'
    break
}

app.get('/', (c) => {
  return c.json({ message: 'Hello World!' })
})

export default {
  port: 3000,
  fetch: app.fetch,
}

console.log('******************************************************')
console.log(`Server is running on URL: http://localhost:3000`)
console.log('******************************************************')
