
function mergeConfig(config1,config2){
    var config = {...config1,...config2};
    // console.log(config)
    return config
}

module.exports = mergeConfig
