// 发送xhl人请求
var settle = require('../core/settle')
module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        // var responseType = config.responseType;
        var request = new XMLHttpRequest();
        request.open(config.method.toLowerCase(), config.url, true)
        if('setRequestHeader' in request){
            for(var key in requestHeaders){
                if(typeof requestData ==='undefined' && key.toLowerCase() === 'content-type'){
                    // console.log(1)
                    delete requestHeaders[key]
                }else{
                    // console.log(2)
                    if(typeof requestHeaders[key] !== 'object'){
                        request.setRequestHeader(key,requestHeaders[key])
                    }

                }
            }
        }
        // console.log(request)

        request.send(requestData);
        request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
                return
            }
            setTimeout(onloaded)
            // onloaded()
            if(config.cancelToken){
                config.cancelToken.promise.then(function  onCanceled(cancel){
                    if(!request){
                        return
                    }
                    request =1;
                    request.abort();
                    reject(cancel);
                    request = null;
                })
            }
        }


        // console.log(request)

        function onloaded() {
            if (!request) {
                return
            }
            var response = {
                data: request.response,
                status: request.status,
                statusText: request.statusText,
                headers: null,
                config: config,
                request: request
            }
            //处理返回数据
            settle(resolve, reject, response)
            request = null
        }

    })
}
