define(
[
"jquery",
"underscore",
"backbone",
"marionette",
"views/loginView",
"views/graphView",
"views/headerView",
"views/footerView",
"models/budget"
],

function ($, _, Backbone, Marionette, LoginView, GraphView, HeaderView, FooterView, Budget) {

    App = new Marionette.Application();

    App.addInitializer(function(options) {
        _.extend(App, {
            block: function() {
                $('#blocker').show();
            },
            unblock: function() {
                $('#blocker').hide();
            }
        });
    });

    // global events
    App.addInitializer(function(options) {
        App.vent.on('login', function(data) {
            App.budget = new Budget({ data: data });

            this.loginArea.close();

            this.headerArea.show(new HeaderView({ model: App.budget }));
            this.graphArea.show(new GraphView({ model: App.budget }));
            this.footerArea.show(new FooterView({ model: App.budget }));
        }, this);
    });

    App.addInitializer(function(options) {
        // create application level regions for sidebar and graph
        App.addRegions({
            headerArea: "header#headerArea",
            graphArea: "section#graphArea",
            loginArea: "section#loginArea",
            footerArea: "footer#footerArea"
        });
    });

    // gets triggered when app starts
    App.on("start", function() {
        this.loginArea.show(new LoginView());
    });

    return App;
});