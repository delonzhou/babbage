define(
[
"jquery",
"underscore",
"marionette",
"views/transactionView",
"common/formatter"
],
function($, _, Marionette, TransactionView, Formatter) {
    return Marionette.ItemView.extend({
        template: 'transaction',
        className: 'clearfix transaction-view',

        templateHelpers: {
            sign_class: function() {
                return this.self.model.get('amount') < 0 ? 'red' : 'green';
            },

            sign: function() {
                return this.self.model.get('amount') < 0 ? '-' : '+';
            },

            amount: function() {
                return this.money(Math.abs(this.self.model.get('amount')), 0);
            }
        },

        initialize: function() {
            this.templateHelpers = this.templateHelpers || {};
            this.templateHelpers.self = this;
            _.extend(this.templateHelpers, Formatter);
        }
    });
});