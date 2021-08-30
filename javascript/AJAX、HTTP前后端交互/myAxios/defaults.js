var { forEach,merge} = require('./utils')
var DEFAULT_CONTENT_TYPE = {
    'Content-Type':'application/x-www-form-urlencoded'
}
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
        adapter = require('./adapters/xhr')
    } else {
        //node环境
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
            setContentType(headers,'application/json;charset=utf-8')
            return JSON.stringify(data)
        }
    }],
    transformResponse:[function transformResponse(data){
        var transitional = this.transitional
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
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
}
defaults.headers = {
    // common:{
    //     'Accept':'application/json,text/plain,*/*'
    // }
},
forEach(['delete','get','head'],function(method){
    defaults.headers [ method ] ={}
})
forEach(['post','put','patch'],function(method){
    defaults.headers [method] = merge(DEFAULT_CONTENT_TYPE)
})
module.exports = defaults
