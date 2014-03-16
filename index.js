// Show static html-pages

// Include libraries
var express = require("express");
var logfmt = require("logfmt");

// Create new web server
var app = express();

// Initiate logger
app.use(logfmt.requestLogger());

// Initiate server port
var port = Number(process.env.PORT || 5000);

// ** Functions, server when called **

// Initiate static html server
app.get('/', function(request, response) 
{
    response.sendfile(__dirname + '/index.html');
}).configure(function() 
{
    app.use('/images', express.static(__dirname + '/images'));
}).listen(port, function() {
	console.log("Listening on " + port);
});



 
