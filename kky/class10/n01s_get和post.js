var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var filePath="./data/data01.json";
var PORT=84;

/* 
Content-Type（内容类型），一般是指网页中存在的 Content-Type，
用于定义网络文件的类型和网页的编码，
决定浏览器将以什么形式、什么编码读取这个文件，
这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因。
Content-Type 标头告诉客户端实际返回的内容的内容类型。

*/
var app = http.createServer(function(req,res){
    res.writeHead(200,{
        "content-type":"text/html;charset=utf-8",
        "Access-Control-Allow-Origin":"*",////解决跨域问题
        "Access-Control-Allow-Methods": "POST,GET",
        'Access-Control-Allow-Headers':'Content-type',
    });
    // res.end("除了他们三个都回答了");
    var pathname=url.parse(req.url).pathname;

    if(pathname=="/favicon.ico"){
        return ;
    }else if(pathname=="/addGet"){
        // console.log("我执行了吗?");
          // res.end("11111");
        var obj=url.parse(req.url,true).query;
        // console.log("addGet 接收前台通过 get 提交的数据obj:",obj);

        ReadWriteFile(filePath,obj,function(){
            // console.log("大家好,我是addGet回调函数");
            // res.end("addGet 添加成功");
            var obj={code:200,info:"addGet 添加成功"};
            res.end(JSON.stringify(obj));
        })
        
    }else if(pathname=="/addPost"){
        // res.end("11111");
        var str="";
        req.on("data",function(s){
            str+=s;
        });
        req.on("end",function(){
            var obj=querystring.parse(str);
            // console.log("addPost 接收前台通过 post 提交的数据obj:",obj);
            ReadWriteFile(filePath,obj,function(){
                // console.log("大家好,我是addPost回调函数");
                // res.end("addPost 添加成功");
                var obj={code:200,info:"addPost 添加成功"};
                res.end(JSON.stringify(obj));
            })
        })
    }else if(pathname=="/getData"){
        // console.log("9999999999999999");
        fs.readFile(filePath,"utf-8",function(err,data){
            if(err){

            }else{
                var obj={code:200,data:data,info:"getData 获取数据成功"};
                res.end(JSON.stringify(obj));
                // res.end(data)
            }
        })
    }else if(pathname=="/getDel"){

    }else{
        
    }
  // res.end("00000");
   
});

app.listen(PORT,function(){
    console.log("后台服务创建成功 http://127.0.0.1:"+PORT);
});



function ReadWriteFile(filePath,obj,callback){
    // console.log("filePath:",filePath,"obj:",obj,"\ncallback:",callback);
    // callback();
    fs.readFile(filePath,"utf-8",function(err,data){
        if(err){
            console.log("读取文件失败\nerr:",err);
        }else{
           
            if(data.length==0){
                var arr=[];
            }else{
                var arr=JSON.parse(data);
            }
            obj.id=+new Date();
            arr.push(obj);
            var str=JSON.stringify(arr);


            fs.writeFile(filePath,str,function(err){
                if(err){
                    console.log("写入文件失败\nerr:",err);
                }else{
                    callback();
                }
            });
        }
    });
}



