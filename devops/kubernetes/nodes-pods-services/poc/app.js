const http = require('http');
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Hello from Node.js K8s POC!\nPod: ${process.env.HOSTNAME || 'local'}\n`);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
