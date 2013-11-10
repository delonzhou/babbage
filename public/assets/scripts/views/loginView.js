define(
[
"jquery",
"underscore",
"marionette"
],
function($, _, Marionette) {
    return Marionette.ItemView.extend({
        template: 'login',
        className: 'login-view',

        events: {
            'click .login-button': 'doLogin'
        },

        doLogin: function(e) {
            e.preventDefault();

            App.block();
            this.$('.spinner').show();
            $.ajax({
                url: '/api/login',
                method: 'POST'
            }).done(function(data) {
                App.unblock();
                App.vent.trigger('login', data);
            }.bind(this));
        }
    });
});