var _ = require('underscore'),
    yodlee = require('./yodlee');

yodlee.login('sbMemadamlangsner1', 'sbMemadamlangsner1#123', function() {
    yodlee.getBankAccounts(function(data) {
        console.log(data);
    });
});