var http = require('http');
//url模块,处理req.url数据
var url =require('url');


var port=81;

var app=http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    // console.log('1req:',req);
    if(req.url=="/favicon.ico"){
        // console.log("这里不再执行");
    }else{
        //req.url 端口号后面所有的内容(接口名称+数据)
        console.log("req.url:",req.url);
        
        //pathname 接口名称(路由)
        var pathname=url.parse(req.url).pathname;
        console.log("pathname:",pathname);

        var obj1=url.parse(req.url).query;
        console.log("obj1:",obj1);
        //前端通过 get 方式 传递的数据,是个对象
        var obj2=url.parse(req.url,true).query;
        console.log("obj2:",obj2);
    }

    res.end('去看看后台打印出了什么');
});


app.listen(port,function(){
    console.log(`后端服务创建成功,请前往http://127.0.0.1:${port}`);
})

/* 
http.createServer(function(req,res){

}).listen(81,function(){
    console.log("后端服务创建成功,请前往http://127.0.0.1:81");
}) */