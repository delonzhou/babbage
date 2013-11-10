define(
[
"jquery",
"underscore",
"marionette",
"views/transactionView",
"views/accountView"
],
function($, _, Marionette, TransactionView, AccountView) {
    return Marionette.CompositeView.extend({
        className: 'accounts-view',
        template: 'accounts',
        itemView: AccountView,
        itemViewContainer: '.accounts-contents'
    });
});