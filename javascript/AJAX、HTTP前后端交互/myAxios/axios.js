var defaults = require('./defaults')
var Axios = require('./core/Axios')
let {extend} = require('./utils')

function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = Axios.prototype.request.bind(context)
    // var instance = Axios.prototype.request
    extend(instance, Axios.prototype)
    console.dir(instance)
    extend(instance, context)
    return instance
}

var axios = createInstance(defaults)



var CancelToken = require('./cancel/cancelToken')
axios.CancelToken = CancelToken
window.axios = axios
module.exports = axios
