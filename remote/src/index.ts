const { Hono } = require("hono");
const { serve } = require("@hono/node-server");
const { serveStatic } = require("@hono/node-server/serve-static");
const app = new Hono();

const port = 3001;

console.log(`Starting remote server on port ${port}`);

// Serve static files from dist directory (webpack build output)
app.use(
  "/dist/*",
  serveStatic({
    root: "./",
    onNotFound: (path, c) => {
      console.log(`File not found: ${path}`);
    },
  })
);

// Serve mf-manifest.json from the dist directory
app.use(
  "/mf-manifest.json",
  serveStatic({
    root: "./dist",
    rewriteRequestPath: (path) => "/mf-manifest.json",
  })
);

// Serve remoteEntry.js from the dist directory
app.use(
  "/remoteEntry.js",
  serveStatic({
    root: "./dist",
    rewriteRequestPath: (path) => "/remoteEntry.js",
  })
);

app.get("/", (c) => {
  return c.text("Hello from Remote App!");
});

app.get("/health", (c) => {
  return c.json({ status: "healthy", service: "remote" });
});

app.get("/api/users", (c) => {
  return c.json({
    users: [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ],
  });
});

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Remote server is running on http://localhost:${info.port}`);
    console.log(
      `Module Federation manifest available at: http://localhost:${info.port}/mf-manifest.json`
    );
    console.log(
      `Remote entry available at: http://localhost:${info.port}/remoteEntry.js`
    );
    console.log(
      'Make sure to run "npm run build" to generate Module Federation assets'
    );
  }
);

module.exports = app;
