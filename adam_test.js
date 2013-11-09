var yodlee = require('./yodlee');

yodlee.login('sbMemadamlangsner1', 'sbMemadamlangsner1#123', function() {
    yodlee.getTransaction('DagBank', function(data) {
        console.log(data);
    });
});