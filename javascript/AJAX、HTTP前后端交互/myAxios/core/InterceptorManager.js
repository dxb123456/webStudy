function InterceptorManager(){
    this.handlers = [];
}
InterceptorManager.prototype.use= function use(fulfilled,rejected,options){
    this.handlers.push({
        fulfilled:fulfilled,
        rejected:rejected
    })
}
 module.exports = InterceptorManager
