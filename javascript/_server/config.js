module.exports ={
    PORT:8000,
    CROS:{
        ALLOW_OPTIONS:'http://localhost:9333',
        ALLOW_METHODS:'PUT,POST,GET,DELETE,OPTIONS,HEAD',
        HEADERS:'Content-Type,Content-Length,Authorization,Accept',
        CREDENTIALS:true
    },
    SESSION:{
        secret:'ZFPX',
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:1000*60*60*24*30
        }
    }
}
