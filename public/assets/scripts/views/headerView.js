define(
[
"jquery",
"underscore",
"marionette"
],
function($, _, Marionette) {
    return Marionette.Layout.extend({
        template: 'header',

        templateHelpers: {
            currentBalance: function() {
                return '$TODO';
            },

            nextYearBalance: function() {
                return '$TODO';
            }
        }
    });
});