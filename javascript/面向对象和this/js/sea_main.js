

define(function(require,exports,module){
    let module1 = require('./seaModules/module1.js');
    console.log(module1)
    let module4 = require('./seaModules/module4.js');
    module4.fun2()
    let module5 = require('./seaModules/module5.js');
    console.log(module5)

    //A.几种暴露数据的写法：
    //1.使用return
    // return {
    //    name:1,
    //    age:2
    // }

    //2.使用exports
      //错误写法如下：
    // exports = {
    //     name:1,
    //     age:2
    // }
      //正确写法：
    // exports.name =1;
    // exports.age=2
    //3.使用 module
    module.exports = {
        name:1,
        age:2
    }
})
