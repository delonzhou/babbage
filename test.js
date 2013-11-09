var _ = require('underscore'),
    http = require('http');

http.request({
    host:'localhost',
    port:8069,
    path:'/tickets/'+request.query.token,
    method:'GET'
},
    function(res) {
        var data = '';
        res.on('data', function(chunk) { data += chunk; });
        res.on('end', function() {

        });
    }).end();