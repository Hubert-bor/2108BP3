/* 
功能:
    前端 通过 表单和get方式,传递给后台,后台把存储到data08.json中
步骤/思路
    一.前端
        知识点 form action后台接口地址 method=提交方式 submit 提交
        action="addGet1"
        method="get"
        完成表单
        步骤1:form
        步骤2:label+input
        步骤3: input+name(告诉后台传过去的是什么数据)
        步骤4: 性别中注意添加value
        步骤5: 提交按钮

    二.后端
        知识点 http,url,fs
        http创建服务
        设置请求头,避免乱码
        url 处理req.url,
        为了得到pathname接口名称
        和
        url.parse(req.url,true).query 
        前台通过get方式传递过来的数据(是个对象)
        fs.readFile读取文件
        将得到的结果转为数组
        fs.WriteFile写入文件
        将信息发送给前台
    步骤1:引入http,url,fs模块
    步骤2:声明文件地址和端口号
    步骤3:创建服务
    步骤4:设置请求头
    步骤5:获取接口名称
    步骤6:不是favicon,接收数据(对象)
    
    步骤7:读取数据
        失败
        成功 步骤8:添加数据arr.push(obj)
        步骤9: 写入数据



*/

var http = require('http');
var url =require('url');
var fs= require('fs');

var filePath="data08.json";
var port=81;

var app = http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    var pathname=url.parse(req.url).pathname;//接口名
    console.log('1pathname:',pathname);//
    if(pathname!="/favicon.ico"){
        var obj=url.parse(req.url,true).query;//接收前台通过get方式传递的的数据==>对象
        console.log('2obj:',obj);
        //读取数据
        fs.readFile(filePath,"utf-8",function(err,data){
            if(err){
                console.log("3 addGet1 读取失败\n",err);
            }else{
                console.log("4.data:",data);
                var arr;
                if(data.length==0){
                    arr=[];
                }else{
                    //data不是空
                    arr=JSON.parse(data);
                }
                obj.id=+new Date();
                arr.push(obj);
                console.log('5arr:',arr);

                var str=JSON.stringify(arr);

                //写入数据
                fs.writeFile(filePath,str,function(err){
                    if(err){
                        console.log("6 addGet1 写入失败\n",err);
                    }else{
                        console.log("写入成功");
                        res.end('去看看后台打印出了什么和data08.json');
                    }
                })

            }
        })
    }
});

app.listen(port,function(){
    console.log(`服务创建成功 http://127.0.0.1:${port}`);
})

