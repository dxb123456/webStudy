(function () {
    'use strict';

    // let { toString } =Object.prototype;


    function extend$1(a, b, thisArg) {
        //copy属性和方法
        Object.keys(b).forEach(item => {
            // console.log(item)
            a[item] = b[item];
        });
    }

    function forEach$3(obj, fn) {
        if (obj === null || typeof obj === 'undefined') {
            return
        }
        // if(typeof obj !=='object'){
        //     //     obj=[obj]
        //     // }
        if (Array.isArray(obj)) {
            for (var i = 0, l = obj.length; i < l; i++) {
                fn.call(null, obj[i]);
            }
        }
    }
    function initUrl$1(url,params){
        console.log(params);
        if(params && Object.prototype.toString.call(params) === '[object Object]'){
            var str='';
            for (var key in params){
                if(url.indexOf('?')>-1){
                    str += `&${key}=${encodeURIComponent(params[key])}`;
                }else {
                    str += `?${key}=${encodeURIComponent(params[key])}`;
                }
            }
            url += str;
        }
        return url;
    }
    function merge$2(config1 = {}, config2 = {}) {
        var config = {...config1, ...config2};
        return config
    }

    function merge_get(config) {
        return config
    }

    var utils = {
        extend: extend$1,
        forEach: forEach$3,
        merge: merge$2,
        initUrl:initUrl$1,
        merge_get: merge_get,
    };

    var settle= function settle(resolve,reject,response){

        var validatestatus = response.config.validatestatus;
        if(!validatestatus || validatestatus(response.status)){
            resolve(response);
        }else {
            reject(new Error(`请求出错: status ${response.status}`));
        }

    };

    // 发送xhl人请求

    var xhr = function xhrAdapter(config) {
        return new Promise(function dispatchXhrRequest(resolve, reject) {
            var requestData = config.data;
            var requestHeaders = config.headers;
            // var responseType = config.responseType;
            var request = new XMLHttpRequest();
            request.open(config.method.toLowerCase(), config.url, true);
            if('setRequestHeader' in request){
                for(var key in requestHeaders){
                    if(typeof requestData ==='undefined' && key.toLowerCase() === 'content-type'){
                        // console.log(1)
                        delete requestHeaders[key];
                    }else {
                        // console.log(2)
                        if(typeof requestHeaders[key] !== 'object'){
                            request.setRequestHeader(key,requestHeaders[key]);
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
                setTimeout(onloaded);
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
                    });
                }
            };


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
                };
                //处理返回数据
                settle(resolve, reject, response);
                request = null;
            }

        })
    };

    var { forEach: forEach$2,merge: merge$1} = utils;
    var DEFAULT_CONTENT_TYPE = {
        'Content-Type':'application/x-www-form-urlencoded'
    };
    function isObject(data){
        return typeof data !== null && typeof data === "object"
    }
    function setContentType(headers,value){
        if(headers && !headers['Content-Type'] ){
            headers["Content-Type"] = value;
        }
    }
    function getDefaultAdapter() {
        var adapter;
        if (typeof XMLHttpRequest) {
            //浏览器环境
            adapter = xhr;
        }
        return adapter
    }

    var defaults = {
        adapter: getDefaultAdapter(),       // 获取请求方式
        validateStatus: function validateStatus(status) {
            return status >= 200 && status < 300
        },
        transitional:{
            silentJSONParsing:false,
            forcedJSONParsing:false,
        },
        transformRequest:[function transformRequest(data,headers){
            if(isObject(data) || (headers && headers['Content-type'] === 'application/json')){
                setContentType(headers,'application/json;charset=utf-8');
                return JSON.stringify(data)
            }
        }],
        transformResponse:[function transformResponse(data){
            var transitional = this.transitional;
            var silentJSONParsing = transitional && transitional.silentJSONParsing;
            transitional && transitional.forcedJSONParsing;
            var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';
            if(strictJSONParsing || (silentJSONParsing && data.length && !Array.isArray(data))){
                try{
                    return JSON.parse(data)
                }catch (e) {
                    if(strictJSONParsing){
                        throw Error('resopnse is not a JSON')
                    }
                }
            }
        }]
    };
    defaults.headers = {
        // common:{
        //     'Accept':'application/json,text/plain,*/*'
        // }
    },
    forEach$2(['delete','get','head'],function(method){
        defaults.headers [ method ] ={};
    });
    forEach$2(['post','put','patch'],function(method){
        defaults.headers [method] = merge$1(DEFAULT_CONTENT_TYPE);
    });
    var defaults_1 = defaults;

    var {forEach: forEach$1} = utils;
    var transformData = function transformData(data,headers,fns){
        var context = this || defaults_1;
        forEach$1(fns,function(fn){
            data = fn.call(context,data,headers);
        });
        return data
    };

    var {merge} = utils;

    // 用于拦截时使用
    function dispatchRequest(config) {
        config.headers = config.headers || {};

        config.data = transformData.call(
            config,
            config.data,
            config.headers,
            config.transformRequest
        );
        config.headers = merge(config.headers[config.method] || {},config.headers);
        var adapter = defaults_1.adapter;    //Promise 对象
        return adapter(config).then(function onAdapterResolution(response) {
                response.data = transformData.call(
                    config,
                    config.data,
                    config.headers,
                    config.transformResponse
                );
                return response
            }, function onAdapterRejection(reject) {
                // return reject
                throw reject
            }
        )
    }

    var dispatchRequest_1 = dispatchRequest;

    function InterceptorManager(){
        this.handlers = [];
    }
    InterceptorManager.prototype.use= function use(fulfilled,rejected,options){
        this.handlers.push({
            fulfilled:fulfilled,
            rejected:rejected
        });
    };
     var InterceptorManager_1 = InterceptorManager;

    function mergeConfig(config1,config2){
        var config = {...config1,...config2};
        // console.log(config)
        return config
    }

    var mergeConfig_1 = mergeConfig;

    let {forEach,initUrl} = utils;

    function Axios(instanceConfig){
        this.defaults = instanceConfig;
        this.interceptors={
            request:new InterceptorManager_1(),
            response:new InterceptorManager_1()
        };
    }

    Axios.prototype.request = function request(config){
        config.url = initUrl(config.url,config.params);
        config = mergeConfig_1(this.defaults,config);
        var promise;
        promise = Promise.resolve(config);

        var requestChain = [];
        this.interceptors.request.handlers.forEach(item=>{
            requestChain.unshift(item.fulfilled,item.rejected);
        });
        var responseChain = [];
        this.interceptors.response.handlers.forEach(item=>{
            responseChain.unshift(item.fulfilled,item.rejected);
        });
        var chain = [dispatchRequest_1,undefined];
        Array.prototype.unshift.apply(chain,requestChain);
        Array.prototype.push.apply(chain,responseChain);

        while(chain.length){
            promise = promise.then(chain.shift(),chain.shift());
        }
        return promise
    };


    forEach(['delete','get','head','options'],function(method){
        Axios.prototype[method] = function(url,config){
            return this.request(mergeConfig_1(config||{},{
                method:method,
                url:url,
                data:(config || {}).data
            }))
        };
    });

    forEach(['post','put','patch'],function(method){
        Axios.prototype[method] = function(url,data,config){
            return this.request(mergeConfig_1(config||{},{
                method:method,
                url:url,
                data:data
            }))
        };
    });

    // Axios.prototype.get = function request(config){
    //     console.log("request-get",config)
    // }
    // Axios.prototype.getUri = function getUri(config){
    //     console.log("getUri",config)
    // }
    var Axios_1=Axios;

    function CancelToken(exector){
        if(typeof exector !== 'function'){
            throw new TypeError('exector must be a function')
        }
        var resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
        });

        // 将cancel函数暴露给了外面的cancel
        exector(function cancel(message){
            // if(token.reason){
            //     return
            // }
            resolvePromise();
        });

    }
    var cancelToken = CancelToken;

    let {extend} = utils;

    function createInstance(defaultConfig) {
        var context = new Axios_1(defaultConfig);
        var instance = Axios_1.prototype.request.bind(context);
        // var instance = Axios.prototype.request
        extend(instance, Axios_1.prototype);
        console.dir(instance);
        extend(instance, context);

        return instance
    }

    var axios = createInstance(defaults_1);




    axios.CancelToken = cancelToken;
    window.axios = axios;
    var axios_1 = axios;

    return axios_1;

}());
