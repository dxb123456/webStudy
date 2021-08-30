var defaults = require('../defaults')
var {forEach} = require('../utils')
module.exports = function transformData(data,headers,fns){
    var context = this || defaults;
    forEach(fns,function(fn){
        data = fn.call(context,data,headers)
    })
    return data
}
