var express = require('express');
var CONFIG =require("./config.js")
CONFIG.PORT = 8001;
// 创建 express 实例
var app = express();
app.use((req,res,next)=>{
    const{ALLOW_OPTIONS,ALLOW_METHODS,HEADERS,CREDENTIALS } = CONFIG.CROS;
    // res.header('Access-Control-Allow-Origin',ALLOW_OPTIONS);
    res.header('Access-Control-Allow-Origin','*');
    //写了*号就不能懈怠cookie，只允许一个源
    res.header('Access-Control-Allow-Credentials',CREDENTIALS);
    res.header('Access-Control-Allow-Headers',HEADERS);
    res.header('Access-Control-Allow-Methods',ALLOW_METHODS);
    req.method === 'OPTIONS' ? res.send('成功'):next()
})
// 响应HTTP的GET方法

app.use('/adm', function(req, res, next) {
    res.send("Hello")
    next();
});
app.get('/axios-demo', function (req, res) {
    setTimeout(()=>{
        res.send('你好！axios');
    },2000)
});
app.post('/axios-demo', function (req, res) {
    setTimeout(()=>{
        res.send('你好！axios,我是post');
    },2000)
});
app.get('/', function (req, res) {
     res.send('Hello World!');
});

// 监听到8000端口
app.listen(CONFIG.PORT, function () {
    console.log('Hello World is listening at port 8000');
});
