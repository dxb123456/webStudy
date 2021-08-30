// let { toString } =Object.prototype;


function extend(a, b, thisArg) {
    //copy属性和方法
    Object.keys(b).forEach(item => {
        // console.log(item)
        a[item] = b[item]
    })
}

function forEach(obj, fn) {
    if (obj === null || typeof obj === 'undefined') {
        return
    }
    // if(typeof obj !=='object'){
    //     //     obj=[obj]
    //     // }
    if (Array.isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i])
        }
    }
}
function initUrl(url,params){
    console.log(params)
    if(params && Object.prototype.toString.call(params) === '[object Object]'){
        var str='';
        for (var key in params){
            if(url.indexOf('?')>-1){
                str += `&${key}=${encodeURIComponent(params[key])}`
            }else{
                str += `?${key}=${encodeURIComponent(params[key])}`
            }
        }
        url += str;
    }
    return url;
}
function merge(config1 = {}, config2 = {}) {
    var config = {...config1, ...config2}
    return config
}

function merge_get(config) {
    return config
}

module.exports = {
    extend: extend,
    forEach: forEach,
    merge: merge,
    initUrl:initUrl,
    merge_get: merge_get,
}
