define(function (require,exports,module){
    let msg ='module2';
    function fun(){
        console.log('我是module2')
        return msg
    }
    module.exports = fun
})
