var http = require('http');
// 用来处理req.url 数据(接口名和前端通过get方式传递过来的数据)
var url = require('url');
//处理 前端通过post方式传递过来的数据
var querystring = require('querystring');
var fs = require("fs");

const PORT = 82;
var filePath="data10.json";

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
           
            fs.readFile(filePath,"utf-8",function(err,data){
                if(err){
                    console.log('读取失败\n',err)
                }else{
                    obj.id=+new Date();
                    var arr;
                    if(data.length==0){
                        arr=[];
                    }else{
                        arr=JSON.parse(data);
                    }
                    arr.push(obj);
                    var str=JSON.stringify(arr);

                    fs.writeFile(filePath,str,function(err){
                        if(err){
                            console.log('写入失败\n',err)
                        }else{
                            console.log("写入成功");
                            res.end("去后端控制台看看结果,data10.json");
                        }
                    })


                }
            })
        })
    }
});

app.listen(PORT,function(){
    console.log("创建服务成功,http://127.0.0.1:"+PORT);
})
