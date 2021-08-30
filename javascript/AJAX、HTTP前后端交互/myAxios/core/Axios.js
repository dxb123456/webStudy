var dispatchRequest = require('./dispatchRequest')
var InterceptorManager =require('./InterceptorManager')
let {forEach,initUrl} = require('../utils')
let mergeConfig = require ('../core/mergeConfig');
function Axios(instanceConfig){
    this.defaults = instanceConfig;
    this.interceptors={
        request:new InterceptorManager(),
        response:new InterceptorManager()
    }
}

Axios.prototype.request = function request(config){
    config.url = initUrl(config.url,config.params);
    config = mergeConfig(this.defaults,config)
    var promise;
    promise = Promise.resolve(config);

    var requestChain = [];
    this.interceptors.request.handlers.forEach(item=>{
        requestChain.unshift(item.fulfilled,item.rejected)
    })
    var responseChain = [];
    this.interceptors.response.handlers.forEach(item=>{
        responseChain.unshift(item.fulfilled,item.rejected)
    })
    var chain = [dispatchRequest,undefined];
    Array.prototype.unshift.apply(chain,requestChain)
    Array.prototype.push.apply(chain,responseChain)

    while(chain.length){
        promise = promise.then(chain.shift(),chain.shift())
    }
    return promise
}


forEach(['delete','get','head','options'],function(method){
    Axios.prototype[method] = function(url,config){
        return this.request(mergeConfig(config||{},{
            method:method,
            url:url,
            data:(config || {}).data
        }))
    }
})

forEach(['post','put','patch'],function(method){
    Axios.prototype[method] = function(url,data,config){
        return this.request(mergeConfig(config||{},{
            method:method,
            url:url,
            data:data
        }))
    }
})

// Axios.prototype.get = function request(config){
//     console.log("request-get",config)
// }
// Axios.prototype.getUri = function getUri(config){
//     console.log("getUri",config)
// }
module.exports=Axios;

