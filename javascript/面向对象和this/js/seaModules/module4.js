define(function(require,exports,module){
    let msg ='module4'
    let module2 = require('./module2')
    let newmsg = module2();
    require.async('./module3',function(module3){
        console.log(module3)
        module3.module3();
    })
    function fun2(){
        console.log(newmsg)
    }
    exports.fun2 = fun2;
})
