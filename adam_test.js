var yodlee = require('./yodlee'),
    http = require('http'),
    _ = require('underscore');

var txns = [];

yodlee.getTransactions(function(data) {

    console.log('hello');
});

http.createServer(function (req, res) {
  res.writeHead(200);
  res.end(JSON.stringify(txns));
}).listen(8000);
console.log('listening on 8000');