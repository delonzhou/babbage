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

        initialize: function() {
            this.templateHelpers = {
                self: this,
                money: Formatter.money
            };
        }
    });
});