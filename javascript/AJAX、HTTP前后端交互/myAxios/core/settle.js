module.exports= function settle(resolve,reject,response){

    var validatestatus = response.config.validatestatus
    if(!validatestatus || validatestatus(response.status)){
        resolve(response)
    }else{
        reject(new Error(`请求出错: status ${response.status}`))
    }

}
