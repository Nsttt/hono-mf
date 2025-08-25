import { Hono } from 'hono'
import { loadRemoteUtils, loadRemoteApi } from './federation-service.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello from Host App!')
})

app.get('/health', (c) => {
  return c.json({ status: 'healthy', service: 'host' })
})

// API route to test remote utilities
app.get('/api/remote-utils', async (c) => {
  const result = await loadRemoteUtils()
  return c.json(result)
})

// API route to test remote API
app.get('/api/remote-api', async (c) => {
  const result = await loadRemoteApi()
  return c.json(result)
})

app.get('/dashboard', (c) => {
  return c.html(`
    <html>
      <head><title>Host Dashboard</title></head>
      <body>
        <h1>Host Application Dashboard</h1>
        <p>This host app consumes remote modules via Module Federation Pure Runtime</p>
        
        <h2>Module Federation Tests</h2>
        <button onclick="testRemoteUtils()">Test Remote Utils</button>
        <button onclick="testRemoteApi()">Test Remote API</button>
        
        <div id="remote-content">
          <p>Click buttons above to test Module Federation</p>
        </div>
        
        <script>
          function testRemoteUtils() {
            document.getElementById('remote-content').innerHTML = '<p>Loading remote utils...</p>';
            fetch('/api/remote-utils')
              .then(r => r.json())
              .then(data => {
                document.getElementById('remote-content').innerHTML = 
                  '<h3>Remote Utils Test Results:</h3><pre>' + JSON.stringify(data, null, 2) + '</pre>';
              })
              .catch(err => {
                document.getElementById('remote-content').innerHTML = 
                  '<h3>Error:</h3><p>' + err.message + '</p>';
              });
          }
          
          function testRemoteApi() {
            document.getElementById('remote-content').innerHTML = '<p>Loading remote API...</p>';
            fetch('/api/remote-api')
              .then(r => r.json())
              .then(data => {
                document.getElementById('remote-content').innerHTML = 
                  '<h3>Remote API Test Results:</h3><pre>' + JSON.stringify(data, null, 2) + '</pre>';
              })
              .catch(err => {
                document.getElementById('remote-content').innerHTML = 
                  '<h3>Error:</h3><p>' + err.message + '</p>';
              });
          }
        </script>
      </body>
    </html>
  `)
})

export default app
