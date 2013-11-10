define(
[
"jquery",
"underscore",
"marionette",
"views/transactionView"
],
function($, _, Marionette, TransactionView) {
    return Marionette.CompositeView.extend({
        className: 'transaction-table-view',
        template: 'transactionTable',
        itemView: TransactionView,
        itemViewContainer: '.table-contents'
    });
});