const http = require('http');
const os = require('os');

console.log("Kubia server starting ...")

var myServer = http.createServer( (request, response) => {
	console.log("Request came from " + request.connection.remoteAddress+ " with request path :" + request.url);
	response.writeHead(200);
	response.end("You've hit " + os.hostname() + "\n");

});

myServer.listen(8080);