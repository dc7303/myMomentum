const http = require('http');
const url = require('url');
const fs = require('fs');

http
  .createServer(function(request, response) {
    if (request.url === '/') {
      fs.readFile('index.html', 'utf8', function(err, data) {
        if (err) {
          console.log(err.message);
        } else {
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end(data);
        }
      });
    }
  })
  .listen(3000);
