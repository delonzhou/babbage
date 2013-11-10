var yodlee = require('./yodlee');
var express = require('express');
var http = require('http');
var rio = require('rio');
var app = express();


// yodlee.login('sbMemadamlangsner1', 'sbMemadamlangsner1#123', function() {
//     console.log(sessionToken);
// });

app.configure(function() {
  // set ejs as view rendering engine
  app.set('view engine', 'ejs');
  app.set('views', __dirname+'/views');

  app.use(express.methodOverride());
  app.use(express.json());
  app.use(express.urlencoded());

  // serves frontend application
  app.use(express.static('public'));

  app.use(express.logger());
  app.use(app.router);

  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/test', function(req, response) {
	var args = {
	    prods: ["IBM", "YHOO", "MSFT"]
	};
	rio.sourceAndEval(__dirname + "/ex2.R", {
	    entryPoint: "getOptimalPortfolio",
	    data: args,
	    callback: function displayResponse(err, res) {
		    var i;
		    if (!err) {
		        res = JSON.parse(res);
		        response.send("hello");
		        // Optimal weights: 0.27107,0.2688,0.46013
		    } else {
		        response.send("Optimization failed");
		    }
		}
	});
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log("Listening on port " + port);

var childProcess = require('child_process'),
rserve;

rserve = childProcess.exec('R CMD Rserve --save', function (error, stdout, stderr) {
if (error) {
console.log(error.stack);
console.log('Error code: '+error.code);
console.log('Signal received: '+error.signal);
}
console.log('Child Process STDOUT: '+stdout);
console.log('Child Process STDERR: '+stderr);
});

rserve.on('exit', function (code) {
console.log('Child process exited with exit code '+code);
require('rio').evaluate("pi / 2 * 2");
});
