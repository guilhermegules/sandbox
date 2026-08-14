const http = require('http');
const os = require('os');
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/cpu-heavy') {
    const end = Date.now() + 1000;
    while (Date.now() < end) {}
    res.end(`CPU intensive task done on Pod: ${os.hostname()}\n`);
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`Hello from Node.js K8s Autoscaling POC!\nPod: ${os.hostname()}\n`);
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
