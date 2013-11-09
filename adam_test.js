var yodlee = require('./yodlee'),
    http = require('http'),
    _ = require('underscore');

var txns = [];

yodlee.getTransactions({
    start: '07-01-2013',
    end: '11-08-2013'
}, function(data) {
    _.each(data.searchResult.transactions, function(d, i) {
        if (d.account.itemAccountId == 10006171) {
            var txn = {};
            txn.description = d.description.description;
            txn.simpleDescription = d.description.simpleDescription;
            txn.checkNumber = d.checkNumber;
            txn.postDate = d.postDate;
            txn.transactionPostingOrder = d.transactionPostingOrder;
            txn.category = d.category;
            txn.amount = d.amount.amount;
            txn.currentBalance = d.account.accountBalance.amount;
            txn.transactionType = d.transactionType;
            txn.transactionTypeId = d.transactionTypeId;
            txn.localizedTransactionType = d.localizedTransactionType;
            txn.transactionBaseType = d.transactionBaseType;
            txn.transactionBaseTypeId = d.transactionBaseTypeId;
            txn.localizedTransactionBaseType = d.localizedTransactionBaseType;
            txns.push(txn);
        }
    });
    console.log('hello');
});

http.createServer(function (req, res) {
  res.writeHead(200);
  res.end(JSON.stringify(txns));
}).listen(8000);
console.log('listening on 8000');