import axios from 'axios'

const  aa= function(k){
    return k>200 ? "大于200":'<=200'
}
const  bb= function(k){
    return k>200 ? "大于200":'<=200'
}
const throwFun = function(){
    throw new Error('this is a error!')
}

const axiosPost = function(){
     return axios.get('http://localhost:8001/axios-post').then((response)=>{
        let datas;
        try {
            datas = JSON.parse(response.data)
        }catch (e) {
            datas = response.data;
        }
         return datas
    })
}

export {
    aa,bb,throwFun,axiosPost
}
