define(
[
"jquery",
"underscore",
"backbone",
"marionette",
"views/transactionTableView"
],
function($, _, Backbone, Marionette, TransactionTableView) {
    return Marionette.Layout.extend({
        template: 'footer',

        regions: {
            recurringArea: '.recurring-area',
            nonRecurringArea: '.non-recurring-area'
        },

        onShow: function() {
            this.recurringArea.show(new TransactionTableView({
                model: new Backbone.Model({ title: 'Recurring Transactions' }),
                collection: new Backbone.Collection([{
                    amount: -1400,
                    name: 'TRANSFER ADAM S LANGSNER:Yvonne Whitley.....'
                }, {
                    amount: 3170,
                    name: 'BETTERMENT DES:TRANSFER ID:xxx0455 INDN.....',
                    freq: 'twice a month'
                }, {
                    amount: -762,
                    name: 'BETTERMENT HOLDI DES:QUICKBOOKS ID:xxxx.....'
                }, {
                    amount: -734,
                    name: 'AMERICAN EXPRESS DES:AM PMT ID:x0946 IN.....'
                }])
            }));

            this.nonRecurringArea.show(new TransactionTableView({
                model: new Backbone.Model({ title: 'Everything Else' }),
                collection: new Backbone.Collection([{
                    amount: -494,
                    name: 'Spent'
                }])
            }));
        }
    });
})