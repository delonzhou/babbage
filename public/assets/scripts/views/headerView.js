define(
[
"jquery",
"underscore",
"marionette"
],
function($, _, Marionette) {
    return Marionette.Layout.extend({
        template: 'header',
        className: 'clearfix header-top'
    });
});