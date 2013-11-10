define(
[
"underscore",
"backbone"
],
function(_, Backbone) {
    return Backbone.Model.extend({
        initialize: function() {
            console.log(this.get('data'));
        },

        getData: function() {
            return [];
        }
     });
})