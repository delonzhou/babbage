var rio = require('rio'),
    yodlee = require('./yodlee');

yodlee.login('sbMemadamlangsner2', 'sbMemadamlangsner2#123', function() {
    yodlee.getBankAccounts(function(data) {
        yodlee.getTransactions(data[3].itemAccountId, function(data) {

            rio.sourceAndEval(__dirname + '/ProjectBudget.R', {
                entryPoint: 'returnResults',
                data: JSON.parse(JSON.stringify(data).replace(/'/g, "")),
                callback: function(err, response) {
                        console.log('error? ', err);
                        console.log('response: ', response);
                }
            });
        });
    });
});