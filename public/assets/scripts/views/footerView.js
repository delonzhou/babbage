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
                    amount: -1200,
                    name: 'Rent'
                }, {
                    amount: 1935,
                    name: 'Salary'
                }])
            }));

            this.nonRecurringArea.show(new TransactionTableView({
                model: new Backbone.Model({ title: 'Everything Else' }),
                collection: new Backbone.Collection([{
                    amount: -895,
                    name: 'Spent'
                }])
            }));
        }
    });
})