define(
[
"jquery",
"underscore",
"marionette",
"common/formatter"
],
function($, _, Marionette, Formatter) {
    return Marionette.ItemView.extend({
        template: 'account',
        className: 'clearfix account-view',

        events: {
            'click': 'selectAccount'
        },

        selectAccount: function(e) {
            App.block();
            $.ajax({
                url: '/api/transactions?itemAccountId='+this.model.get('itemAccountId'),
                method: 'GET'
            }).done(function(data) {
                App.unblock();
                App.vent.trigger('transactions', data);
            }.bind(this));
        }
    });
});