define(
[
"underscore",
"moment",
"backbone"
],
function(_, moment, Backbone) {
    return Backbone.Model.extend({
        initialize: function() {
            this._init_data();
        },

        _init_data: function() {
            var now = moment().startOf('day');
            var dates = this.get('data').date;
            var cashFlows = this.get('data').predictedCashFlows;
            var balances = this.get('data').predictedBalances;

            this.set({
                start: now.clone().add('days', _.first(dates)),
                end: now.clone().add('days', _.last(dates)),
            });

            this._data = _.reduce(dates, function(out, d, i) {
                out.push({
                    date: this.get('start').clone().add('days', d),
                    cashFlow: cashFlows[i],
                    balance: balances[i]
                });

                var j = d+1;
                while (j < dates[i+1]) {
                    out.push({
                        date: this.get('start').clone().add('days', j),
                        cashFlow: cashFlows[i],
                        balance: balances[i]
                    });
                    j++;
                }

                return out;
            }, [], this);
        },

        getData: function() {
            return this._data;
        },

        getCurrentBalance: function() {
            return _.first(this._data).balance;
        },

        getNextYearBalance: function() {
            return _.last(this._data).balance;
        }
     });
})