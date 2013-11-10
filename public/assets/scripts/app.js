define(
[
"jquery",
"underscore",
"backbone",
"marionette",
"views/loginView",
"views/graphView",
"views/sideBar/sideBarView",
"models/budget"
],

function ($, _, Backbone, Marionette, LoginView, GraphView, SideBarView, Budget) {

    App = new Marionette.Application();

    App.addInitializer(function(options) {
        _.extend(App, {
            // add methods to App object here
        });
    });

    // global events
    App.addInitializer(function(options) {
        App.vent.on('login', function(data) {
            var now = moment().startOf('day');
            App.budget = new Budget({
                data: data,
                start: now,
                end: now.clone().add('months', 12)
            });

            this.graphArea.show(new GraphView({ model: App.budget }));
            this.sideBar.show(new SideBarView({ model: App.budget }));
        }, this);
    });

    App.addInitializer(function(options) {
        // create application level regions for sidebar and graph
        App.addRegions({
            graphArea: "section#graphArea",
            sideBar: "section#sideBar"
        });
    });

    // gets triggered when app starts
    App.on("start", function() {
        this.graphArea.show(new LoginView());
    });

    return App;
});