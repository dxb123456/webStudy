(function (){
    requirejs.config({
        baseUrl:'',
        paths:{
            dataServer:'js/modules/dataServer',
            alter:'js/modules/alter',
            jquery:'js/libs/jquery'  //jquery 源码中使用amd语法会自动创建模块jquery
        }
    })
    requirejs(['alter','jquery'],function(alter,$){
        alter.showMsg();
        $('body').css({
            backgroundColor:'red'
        })
    })
})()
