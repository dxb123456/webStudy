function CancelToken(exector){
    if(typeof exector !== 'function'){
        throw new TypeError('exector must be a function')
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve
    })
    var token = this;

    // 将cancel函数暴露给了外面的cancel
    exector(function cancel(message){
        // if(token.reason){
        //     return
        // }
        resolvePromise()
    })

}
module.exports = CancelToken
