var yodlee = require('./yodlee');
var express = require('express');
var http = require('http');
var rio = require('rio');
var app = express();

function send_json(res, json) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(json));
}

app.configure(function() {
  // set ejs as view rendering engine
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');

  app.use(express.methodOverride());
  app.use(express.json());
  app.use(express.urlencoded());

  // serves frontend application
  app.use(express.static('public'));

  app.use(express.logger());
  app.use(app.router);

  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.get('/', function(req, res) {
  res.render('index');
});


app.get('/test', function(req, response) {
  var args = {
    prods: ["IBM", "YHOO", "MSFT"]
  };
  rio.sourceAndEval(__dirname + "/ex2.R", {
    entryPoint: "getOptimalPortfolio",
    data: args,
    callback: function displayResponse(err, res) {
      var i;
      if (!err) {
        res = JSON.parse(res);
        response.send("hello");
        // Optimal weights: 0.27107,0.2688,0.46013
      } else {
        response.send("Optimization failed");
      }
    }
  });
});

app.post('/api/login', function(req, res) {
  yodlee.getData(function(txns) {
    var dummy = {
      "date": [1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 31, 33, 34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 61, 61, 63, 64, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 90, 91, 91, 93, 94, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 120, 121, 121, 123, 124, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 150, 151, 151, 153, 154, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 180, 181, 181, 183, 184, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 210, 211, 211, 213, 214, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 240, 241, 241, 243, 244, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 270, 271, 271, 273, 274, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 300, 301, 301, 303, 304, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 330, 331, 331, 333, 334, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 360, 361],
      "projectedCashFlows": [2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987, 2710.96, -211.109999999998, -96.7050000000022, -394.240000000002, -136.080000000006, -400.000000000004, -415.030000000002, -660.355, -427.110000000001, -602.160000000006, -9.99999999999864, -94.0000000000105, 3641.74, 742.123333333336, -245.69, -223, -259.019999999995, -327.5, -7.30000000000246, -399.999999999998, -285.000000000003, -1400, -2.99999999999955, -761.875, -2.99999999999318, -6.36000000000013, -27.8799999999997, -13.4799999999987],
      "projectedBalances": [8368.41, 8157.3, 8060.595, 7666.355, 7530.27499999999, 7130.27499999999, 6715.24499999999, 6054.88999999999, 5627.77999999999, 5025.61999999998, 5015.61999999998, 4921.61999999997, 8563.35999999997, 9305.48333333331, 9059.79333333331, 8836.79333333331, 8577.77333333331, 8250.27333333331, 8242.97333333331, 7842.97333333331, 7557.97333333331, 6157.97333333331, 6154.97333333331, 5393.09833333331, 5390.09833333332, 5383.73833333332, 5355.85833333332, 5342.37833333332, 8053.33833333332, 7842.22833333333, 7745.52333333332, 7351.28333333332, 7215.20333333332, 6815.20333333331, 6400.17333333331, 5739.81833333331, 5312.70833333331, 4710.5483333333, 4700.5483333333, 4606.54833333329, 8248.2883333333, 8990.41166666663, 8744.72166666663, 8521.72166666663, 8262.70166666664, 7935.20166666664, 7927.90166666663, 7527.90166666664, 7242.90166666663, 5842.90166666664, 5839.90166666664, 5078.02666666664, 5075.02666666664, 5068.66666666664, 5040.78666666664, 5027.30666666664, 7738.26666666665, 7527.15666666665, 7430.45166666665, 7036.21166666664, 6900.13166666664, 6500.13166666663, 6085.10166666663, 5424.74666666663, 4997.63666666663, 4395.47666666662, 4385.47666666663, 4291.47666666661, 7933.21666666662, 8675.33999999995, 8429.64999999995, 8206.64999999995, 7947.62999999996, 7620.12999999996, 7612.82999999996, 7212.82999999996, 6927.82999999995, 5527.82999999996, 5524.82999999996, 4762.95499999996, 4759.95499999996, 4753.59499999996, 4725.71499999996, 4712.23499999997, 7423.19499999997, 7212.08499999997, 7115.37999999997, 6721.13999999996, 6585.05999999996, 6185.05999999996, 5770.02999999995, 5109.67499999995, 4682.56499999995, 4080.40499999995, 4070.40499999995, 3976.40499999994, 7618.14499999994, 8360.26833333328, 8114.57833333327, 7891.57833333328, 7632.55833333328, 7305.05833333328, 7297.75833333328, 6897.75833333328, 6612.75833333328, 5212.75833333328, 5209.75833333328, 4447.88333333328, 4444.88333333329, 4438.52333333329, 4410.64333333329, 4397.16333333329, 7108.12333333329, 6897.01333333329, 6800.30833333329, 6406.06833333329, 6269.98833333328, 5869.98833333328, 5454.95833333328, 4794.60333333328, 4367.49333333327, 3765.33333333327, 3755.33333333327, 3661.33333333326, 7303.07333333326, 8045.1966666666, 7799.5066666666, 7576.5066666666, 7317.4866666666, 6989.9866666666, 6982.6866666666, 6582.6866666666, 6297.6866666666, 4897.6866666666, 4894.6866666666, 4132.8116666666, 4129.81166666661, 4123.45166666661, 4095.57166666661, 4082.09166666661, 6793.05166666661, 6581.94166666661, 6485.23666666661, 6090.99666666661, 5954.9166666666, 5554.9166666666, 5139.8866666666, 4479.5316666666, 4052.4216666666, 3450.26166666659, 3440.26166666659, 3346.26166666658, 6988.00166666658, 7730.12499999992, 7484.43499999992, 7261.43499999992, 7002.41499999992, 6674.91499999992, 6667.61499999992, 6267.61499999992, 5982.61499999992, 4582.61499999992, 4579.61499999992, 3817.73999999992, 3814.73999999993, 3808.37999999993, 3780.49999999993, 3767.01999999993, 6477.97999999993, 6266.86999999994, 6170.16499999993, 5775.92499999993, 5639.84499999992, 5239.84499999992, 4824.81499999992, 4164.45999999992, 3737.34999999992, 3135.18999999991, 3125.18999999991, 3031.1899999999, 6672.9299999999, 7415.05333333324, 7169.36333333324, 6946.36333333324, 6687.34333333325, 6359.84333333325, 6352.54333333324, 5952.54333333325, 5667.54333333324, 4267.54333333324, 4264.54333333325, 3502.66833333324, 3499.66833333325, 3493.30833333325, 3465.42833333325, 3451.94833333325, 6162.90833333326, 5951.79833333326, 5855.09333333326, 5460.85333333325, 5324.77333333325, 4924.77333333324, 4509.74333333324, 3849.38833333324, 3422.27833333324, 2820.11833333323, 2810.11833333324, 2716.11833333322, 6357.85833333323, 7099.98166666656, 6854.29166666656, 6631.29166666656, 6372.27166666657, 6044.77166666657, 6037.47166666657, 5637.47166666657, 5352.47166666656, 3952.47166666657, 3949.47166666657, 3187.59666666657, 3184.59666666657, 3178.23666666657, 3150.35666666657, 3136.87666666658, 5847.83666666658, 5636.72666666658, 5540.02166666658, 5145.78166666657, 5009.70166666657, 4609.70166666656, 4194.67166666656, 3534.31666666656, 3107.20666666656, 2505.04666666656, 2495.04666666656, 2401.04666666655, 6042.78666666655, 6784.90999999989, 6539.21999999988, 6316.21999999988, 6057.19999999989, 5729.69999999989, 5722.39999999989, 5322.39999999989, 5037.39999999989, 3637.39999999989, 3634.39999999989, 2872.52499999989, 2869.5249999999, 2863.1649999999, 2835.2849999999, 2821.8049999999, 5532.7649999999, 5321.6549999999, 5224.9499999999, 4830.7099999999, 4694.62999999989, 4294.62999999989, 3879.59999999989, 3219.24499999988, 2792.13499999988, 2189.97499999988, 2179.97499999988, 2085.97499999987, 5727.71499999987, 6469.83833333321, 6224.14833333321, 6001.14833333321, 5742.12833333321, 5414.62833333321, 5407.32833333321, 5007.32833333321, 4722.32833333321, 3322.32833333321, 3319.32833333321, 2557.45333333321, 2554.45333333322, 2548.09333333322, 2520.21333333322, 2506.73333333322, 5217.69333333322, 5006.58333333322, 4909.87833333322, 4515.63833333322, 4379.55833333321, 3979.55833333321, 3564.52833333321, 2904.17333333321, 2477.06333333321, 1874.9033333332, 1864.9033333332, 1770.90333333319, 5412.64333333319, 6154.76666666653, 5909.07666666653, 5686.07666666653, 5427.05666666653, 5099.55666666653, 5092.25666666653, 4692.25666666653, 4407.25666666653, 3007.25666666653, 3004.25666666653, 2242.38166666653, 2239.38166666654, 2233.02166666654, 2205.14166666654, 2191.66166666654, 4902.62166666654, 4691.51166666655, 4594.80666666654, 4200.56666666654, 4064.48666666653, 3664.48666666653, 3249.45666666653, 2589.10166666653, 2161.99166666653, 1559.83166666652, 1549.83166666652, 1455.83166666651, 5097.57166666651, 5839.69499999985, 5594.00499999985, 5371.00499999985, 5111.98499999986, 4784.48499999986, 4777.18499999985, 4377.18499999985, 4092.18499999985, 2692.18499999985, 2689.18499999985, 1927.30999999985, 1924.30999999986, 1917.94999999986, 1890.06999999986, 1876.58999999986]
    };
    send_json(res, dummy);

    // rio.sourceAndEval(__dirname+'/ProjectBudget.R', {
    //     entryPoint: 'getProjection',
    //     data: txns,
    //     callback: function(err, response) {
    //         console.log(response);
    //         send_json(res, JSON.parse(response));
    //     }
    // });
  });
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log("Listening on port " + port);

// var childProcess = require('child_process'),
// rserve;

// rserve = childProcess.exec('R CMD Rserve --save', function (error, stdout, stderr) {
// if (error) {
// 	console.log(error.stack);
// 	console.log('Error code: '+error.code);
// 	console.log('Signal received: '+error.signal);
// }
// console.log('Child Process STDOUT: '+stdout);
// console.log('Child Process STDERR: '+stderr);
// });

// rserve.on('exit', function (code) {
// console.log('Child process exited with exit code '+code);
// require('rio').evaluate("pi / 2 * 2");
// });