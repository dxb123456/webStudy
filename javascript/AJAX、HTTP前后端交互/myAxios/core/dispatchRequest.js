var defaults = require('../defaults')
var {merge} = require('../utils')
var transformData = require('./transformData')
// 用于拦截时使用
function dispatchRequest(config) {
    config.headers = config.headers || {};

    config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
    )
    config.headers = merge(config.headers[config.method] || {},config.headers)
    var adapter = defaults.adapter;    //Promise 对象
    return adapter(config).then(function onAdapterResolution(response) {
            response.data = transformData.call(
                config,
                config.data,
                config.headers,
                config.transformResponse
            )
            return response
        }, function onAdapterRejection(reject) {
            // return reject
            throw reject
        }
    )
}

module.exports = dispatchRequest;
