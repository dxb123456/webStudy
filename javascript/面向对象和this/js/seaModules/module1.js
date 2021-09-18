define(function (require, exports, module) {
    let name = 'module1'
    console.log(module)
    function say() {
        console.log(name)
    }
    module.exports =  {say:say,name:name}
})
