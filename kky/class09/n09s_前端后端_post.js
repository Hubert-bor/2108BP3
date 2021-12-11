var http = require('http');
// 用来处理req.url 数据(接口名和前端通过get方式传递过来的数据)
var url = require('url');
//处理 前端通过post方式传递过来的数据
var querystring = require('querystring');

const PORT = 82;

var app= http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    var pathname=url.parse(req.url).pathname;
    if(pathname!="/favicon.ico"){
        //后端 接收前端通过 post 方式传递的数据
        //步骤1 声明一个空字符串,用来存储接收到的数据
        var str="";
        //步骤2 监听 开始 接收数据  (这个行为) 
        req.on("data",function(s){
            str+=s;
        })
        //步骤3 监听 结束 接收数据 (这个行为)
        req.on("end",function(){
            console.log("str:",str);
            var obj=querystring.parse(str);
            console.log("111111obj:",obj);
            res.end("post接收成功了,在后台打印一下看看");
        })
    }
});

app.listen(PORT,function(){
    console.log("创建服务成功,http://127.0.0.1:"+PORT);
})
