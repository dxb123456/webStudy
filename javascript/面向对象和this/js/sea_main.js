

define(function(require){
    let module1 = require('./seaModules/module1.js');
    console.log(module1)
    let module4 = require('./seaModules/module4.js');
    module4.fun2()
})
