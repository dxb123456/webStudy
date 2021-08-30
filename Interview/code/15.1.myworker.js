function  add(num){
    var a=10000;
    for (var i=0;i<num;i++){
        a++
    }
    return a;
}
//当主线程向分线程传输数据之后，
self.onmessage = function(event){
    // console.log(event)
    // console.log(event.data);
    var result= add(event.data)
    self.postMessage(result)
}
