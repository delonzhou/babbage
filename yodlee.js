var _ = require('underscore'),
    https = require('https'),
    querystring = require('querystring');

var host = 'rest.developer.yodlee.com',
    pathPrefix = '/services/srest/restserver/v1.0/authenticate/';

var sendRequest = function(action, req_data, callback) {
        var query_data = querystring.stringify(req_data);

        var req = https.request({
            host: host,
            path: pathPrefix+action,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': query_data.length
            }
        }, function(res) {
            var res_data = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                res_data += chunk;
            });
            res.on('end', function() {
                callback(JSON.parse(res_data));
            });
        });

        req.write(query_data);
        req.end();
};

var cobAuthenticate = function(callback) {
    var data = {
        cobrandLogin: 'sbCobadamlangsner',
        cobrandPassword: '77da9de9-6a84-46c1-9d92-51f19da6e37c'
    };

    sendRequest('coblogin', data, function(res) {
        callback(res.cobrandConversationCredentials.sessionToken);
    });
};

module.exports = {
    login: function(username, password, callback) {
        cobAuthenticate(function(sessionToken) {
            var creds = {
                coSessionToken: sessionToken,
                login: username,
                password: password
            };

            sendRequest('login', creds, callback);
        });
    }
};