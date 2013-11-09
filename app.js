var yodlee = require('./yodlee');
var express = require('express');
var http = require('http');
var app = express();


// yodlee.login('sbMemadamlangsner1', 'sbMemadamlangsner1#123', function() {
//     console.log(sessionToken);
// });

app.get('/', function(req, res) {
	res.send('test');
});

http.createServer(app).listen(4000);
