import { serve } from '@hono/node-server'
import app from './index.js'

const port = 3000

console.log(`Starting host server on port ${port}`)

serve({
  fetch: app.fetch,
  port
}, (info) => {
  console.log(`Host server is running on http://localhost:${info.port}`)
  console.log('Module Federation configured to consume remote1 from http://localhost:3001')
  console.log('Visit http://localhost:3000/dashboard to test Module Federation')
})