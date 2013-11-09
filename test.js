var _ = require('underscore'),
    https = require('https'),
    querystring = require('querystring');

data = querystring.stringify({
    cobrandLogin: 'sbCobadamlangsner',
    cobrandPassword: '77da9de9-6a84-46c1-9d92-51f19da6e37c'
});

var req = https.request({
    host:'rest.developer.yodlee.com',
    path:'/services/srest/restserver/v1.0/authenticate/coblogin',
    method:'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
    }
}, function(res) {
        var data = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) { data += chunk; });
        res.on('end', function() {
            login = JSON.parse(data);
            console.log(login.cobrandConversationCredentials.sessionToken);
        });
    });

req.write(data);
req.end();