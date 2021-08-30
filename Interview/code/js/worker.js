console.log('hello！')
var num=0,on=true;
function timedCount () {
    // console.log(on)
    for (var i =num ; i < 10000000000; i++) {
        console.log(on)
        if( !on ){
            break
        }
        if (i % 10 === 0 ) {

            postMessage(i);
        }
    }
}
self.addEventListener('message', function (e) {
    console.log(e.data)
    if(e.data == 'start') {
        on = true;
        timedCount();
    }
}, false);



