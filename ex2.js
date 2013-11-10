"use strict";

var util = require("util"),
    rio = require("rio");

var args = {
    prods: ["IBM", "YHOO", "MSFT"]
};

function displayResponse(err, res) {
    var i;
    if (!err) {
        res = JSON.parse(res);
        util.puts("hello");
        // Optimal weights: 0.27107,0.2688,0.46013
    } else {
        util.puts("Optimization failed");
    }
}

rio.sourceAndEval(__dirname + "/ex2.R", {
    entryPoint: "getOptimalPortfolio",
    data: args,
    callback: displayResponse
});
