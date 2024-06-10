import { Hono } from 'hono'
import { env } from './env'

console.log('\n' + new Date().toISOString() + ' - Starting Application...\n')

const app = new Hono()

let welcome = 'Welcome to Seidor API! 🚀'

switch (env.NODE_ENV) {
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

const res = {
  service_layer_user: env.SBO_SL_USER,
  service_layer_db: env.SBO_SL_DB_NAME,
  sap_db: env.SBO_DB_NAME,
  sap_db_type: env.SBO_DB_TYPE,
  message: welcome,
}

app.get('/', (c) => {
  return c.json(res)
})

export default {
  port: env.PORT,
  fetch: app.fetch,
}

console.log('******************************************************')
console.log(`Server is running on URL: http://localhost:${env.PORT}`)
console.log('\nApplication Details ->', env.NODE_ENV == 'development' ? res : JSON.stringify(res, null, 2))
console.log('******************************************************')
