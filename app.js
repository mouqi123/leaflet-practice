var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var PORT = 8000;
var server = http.createServer(function (request, response) {
	var pathname = url.parse(request.url).pathname;
	var abs = __dirname+pathname;

	fs.stat(abs, (err, stats) => {
		if(err){
			response.writeHead(404, {
				'Content-Type': 'text/plain'
			});
			response.write("This request URL " + abs + " was not found on this server.");
			response.end();
		}else {
			fs.readFile(abs, "binary", function (err, file) {
				if (err) {
					response.writeHead(500, {
						'Content-Type': 'text/plain'
					});
					response.end(err);
				} else {
					response.writeHead(200, {
						'Content-Type': 'text/html'
					});
					response.write(file, "binary");
					response.end();
				}
			});
		}

	});
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
