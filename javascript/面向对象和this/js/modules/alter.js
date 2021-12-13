//定义依赖米快
define(['dataServer'],function(dataServer){
    console.log(dataServer)
    let message = 'alter.js'
    function showMsg(){
        console.log(message,dataServer.getName())
    }
    // function getName(){
    //     return '我是重写的name'
    // }
    return {showMsg}
})
