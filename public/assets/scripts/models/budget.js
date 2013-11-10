define(
[
"underscore",
"backbone"
],
function(_, Backbone) {
    return Backbone.Model.extend({
        initialize: function() {
        },

        getData: function() {
            return [];
        }
     });
})