//Importing the required file for starting up the server
const http = require('http');
const main = require('./main');
const hostname = '127.0.0.1';
const port = 3008;

// Creating the server
const server = http.createServer(main);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
