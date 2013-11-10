define(
[
"jquery",
"underscore",
"marionette",
"common/formatter"
],
function($, _, Marionette, Formatter) {
    return Marionette.Layout.extend({
        template: 'header',

        events: {
            'click .logout': 'logout'
        },

        initialize: function() {
            this.templateHelpers = {
                self: this,
                money: Formatter.money
            };
        },

        logout: function(e) {
            location.href = '/';
        }
    });
});