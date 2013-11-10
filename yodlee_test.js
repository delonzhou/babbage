var _ = require('underscore'),
    yodlee = require('./yodlee');

yodlee.login('sbMemadamlangsner2', 'sbMemadamlangsner2#123', function() {
    yodlee.getBankAccounts(function(data) {
        yodlee.getTransactions(data[3].itemAccountId, function(data) {
            console.log(data);
        });
    });
});