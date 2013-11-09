var yodlee = require('./yodlee');
var express = require('express');
var http = require('http');
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

http.createServer(app).listen(4000);
