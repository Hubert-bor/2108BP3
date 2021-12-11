var http = require('http');
// 用来处理req.url 数据(接口名和前端通过get方式传递过来的数据)
var url = require('url');
//处理 前端通过post方式传递过来的数据
var querystring = require('querystring');
var fs = require("fs");

const PORT = 83;
var filePath="data11.json";

var app= http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    var pathname=url.parse(req.url).pathname;
    if(pathname=="/favicon.ico"){

    }else if(pathname=="/addGet1"){
        //用来判断前台用哪个接口传递数据,进而我们可以根据前端和后端提前商量好的方式接收数据
        console.log("这里用来接收前台通过get方式传递的数据");
        var obj=url.parse(req.url,true).query;
        console.log("addGet1 obj:",obj);

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
                        res.end("去后端控制台看看结果,data11.json");
                    }
                })


            }
        })

    }else if(pathname=="/addPost1"){
        console.log("这里用来接收前台通过post方式传递的数据");
        var str="";
        req.on("data",function(s){
            str+=s;
        });
        req.on("end",function(){
            var obj=querystring.parse(str);
            console.log("addPost1 obj:",obj);
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
                            res.end("去后端控制台看看结果,data11.json");
                        }
                    })


                }
            })
        })
    }else{
        console.log("其他情况");
    }
    
});

app.listen(PORT,function(){
    console.log("创建服务成功,http://127.0.0.1:"+PORT);
})
