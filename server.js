const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

server.use(express.json()); // Middleware to parse JSON requests

app.prepare().then(() => {
  // Serve the Next.js app
  server.all("*", (req, res) => {
    return res.send('opala')
  });

  server.listen(3001, () => console.log("🚀 Server is listening on port 3001"));
});
