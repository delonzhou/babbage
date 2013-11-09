var _ = require('underscore'),
    https = require('https'),
    querystring = require('querystring');

var host = 'rest.developer.yodlee.com',
    pathPrefix = '/services/srest/restserver/v1.0/';

var cobSessionToken,
    userSessionToken;

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

    sendRequest('authenticate/coblogin', data, function(res) {
        cobSessionToken = res.cobrandConversationCredentials.sessionToken;
        callback();
    });
};

var get_tokens = function() {
    var obj = {};

    if (cobSessionToken) {
        obj.cobSessionToken = cobSessionToken;
    }

    if (userSessionToken) {
        obj.userSessionToken = userSessionToken;
    }

    return obj;
}

var login = function(username, password, callback) {
    cobAuthenticate(function() {
        var creds = _.extend(get_tokens(), {
            login: username,
            password: password
        });

        sendRequest('authenticate/login', creds, function(loginData) {
            userSessionToken = loginData.userContext.conversationCredentials.sessionToken;
            callback();
        });
    });
};

module.exports = {
    getTransactions: function(options, callback) {
        login('sbMemadamlangsner1', 'sbMemadamlangsner1#123', function() {
            sendRequest('jsonsdk/TransactionSearchService/executeUserSearchRequest', _.extend(get_tokens(), {
                'transactionSearchRequest.containerType': 'bank',
                'transactionSearchRequest.higherFetchLimit': 500,
                'transactionSearchRequest.lowerFetchLimit': 1,
                'transactionSearchRequest.resultRange.startNumber': 1,
                'transactionSearchRequest.resultRange.endNumber': 500,
                'transactionSearchRequest.searchClients.clientId': 1,
                'transactionSearchRequest.searchClients.clientName': 'DataSearchService',
                'transactionSearchRequest.searchFilter.itemAcctId': '10006171',
                'transactionSearchRequest.searchFilter.currencyCode': 'USD',
                'transactionSearchRequest.searchFilter.postDateRange.fromDate': options.start,
                'transactionSearchRequest.searchFilter.postDateRange.toDate': options.end,
                'transactionSearchRequest.searchFilter.transactionSplitType': 'ALL_TRANSACTION',
                'transactionSearchRequest.ignoreUserInput': 'true'

            }), callback);
        });
    }
};