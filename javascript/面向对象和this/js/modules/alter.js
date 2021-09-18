//定义依赖米快
define(['dataServer'],function(dataServer){
    let message = 'alter.js'
    function showMsg(){
        console.log(message,dataServer.getName())
    }
    return {showMsg}
})
