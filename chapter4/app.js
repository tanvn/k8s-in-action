// const http = require('http');
// const os = require('os');

// console.log("Kubia server starting...");

// var requestCount = 0;

// var handler = function(request, response) {
//   console.log("Received request from " + request.connection.remoteAddress);
//   requestCount++;
//   if (requestCount > 5) {
//     response.writeHead(500);
//     console.log("return status code 500 Internal Server Error");
//     response.end("I'm not well. Please restart me!");
//     return;
//   }
//   response.writeHead(200);
//   response.end("You've hit " + os.hostname() + "\n");
// };

// var www = http.createServer(handler);
// www.listen(8080);

'use strict';

const express = require('express');
const os = require('os');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


// App
const app = express();

app.all('*', (req, res, next) =>{
	console.log("Request came from " + req.connection.remoteAddress+ " with request path: " + req.url);
	next();
});
app.get('/', (req, res) => {
  // res.send('Hello world\n');
  res.end("You've hit " + os.hostname() + "\n");

});

app.get('/healthCheck', (req, res) => {
	res.writeHead(500);
    console.log("return status code 500 Internal Server Error");
    res.end("I'm not well. Please restart me!");
    return;

})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);