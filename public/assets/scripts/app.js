define(
[
"jquery",
"underscore",
"backbone",
"marionette",
"views/loginView",
"views/graphView",
"views/headerView",
"models/budget"
],

function ($, _, Backbone, Marionette, LoginView, GraphView, HeaderView, Budget) {

    App = new Marionette.Application();

    App.addInitializer(function(options) {
        _.extend(App, {
            // add methods to App object here
        });
    });

    // global events
    App.addInitializer(function(options) {
        App.vent.on('login', function(data) {
            App.budget = new Budget({ data: data });

            this.loginArea.close();
            this.headerArea.show(new HeaderView());
            this.graphArea.show(new GraphView({ model: App.budget }));
        }, this);
    });

    App.addInitializer(function(options) {
        // create application level regions for sidebar and graph
        App.addRegions({
            headerArea: "header#headerArea",
            graphArea: "section#graphArea",
            loginArea: "section#loginArea"
        });
    });

    // gets triggered when app starts
    App.on("start", function() {
        this.loginArea.show(new LoginView());
    });

    return App;
});