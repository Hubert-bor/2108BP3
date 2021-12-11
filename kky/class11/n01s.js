var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

const PROT = 85;
var filePath="./data/data01.json";

var app = http.createServer(function(req,res){
    res.writeHead(200,{
        "content-type":"text/html;charset=utf-8",
        "Access-Control-Allow-Origin":"*",////解决跨域问题
        "Access-Control-Allow-Methods": "POST,GET",
        'Access-Control-Allow-Headers':'Content-type',
    });
    // res.end("0后端服务创建成功");
    var pathname = url.parse(req.url).pathname;
    if(pathname=="/addGet"){
        var addGetObj=url.parse(req.url,true).query;
        console.log("01 addGet 前后端通信成功 addGetObj:",addGetObj);
        
        addReadWriteFile(filePath,addGetObj,function(){
            res.end(JSON.stringify({code:2021,msg:"addGet 添加成功"}));
        });

        
    }else if(pathname=="/addPost"){
        var str1="";
        req.on("data",function(s){
            str1+=s;
        });
        req.on("end",function(){
            var addPostObj=querystring.parse(str1);
            // console.log("02 addPost 前后端通信成功 addPostObj:",addPostObj);
            
            addReadWriteFile(filePath,addPostObj,function(){
                res.end(JSON.stringify({code:2021,msg:"addPost 添加成功"}));
            });

        })

    }else if(pathname=="/getData"){
        fs.readFile(filePath,'utf-8',function(err,data){
            if(err){
                console.log("getData 读取失败:\n",err);
            }else{
                // console.log("data:",data,typeof data);

                var obj1={code:2021,msg:"getData 获取数据成功",data:data};
                // res.end(JSON.stringify(obj1));

                var arr=JSON.parse(data);
                var obj2={code:2021,msg:"getData 获取数据成功",data:arr};
               
                res.end(JSON.stringify(obj2));
            }
        })
    }else if(pathname=="/postData"){
        fs.readFile(filePath,'utf-8',function(err,data){
            if(err){
                console.log("postData 读取失败:\n",err);
            }else{
                console.log("data:",data,typeof data);

                var arr=JSON.parse(data);
                var obj2={code:2021,msg:"postData 获取数据成功",data:arr};
               
                res.end(JSON.stringify(obj2));
            }
        })
    }else if(pathname=="/getDel"){
        var getDelObj=url.parse(req.url,true).query;
        console.log("01 getDel 前后端通信成功 getDelObj:",getDelObj);
        
        delReadWriteFile(filePath,getDelObj.id,function(){
            res.end(JSON.stringify({code:2021,msg:"getDel 删除成功"}));
        })

    }else if(pathname=="/postDel"){
        // console.log("1我是postDel,我执行了吗?");
        var str2="";
        req.on("data",function(s){
            str2+=s;
        });
        // console.log("2我是postDel,我执行了吗?");
        req.on("end",function(){
            // console.log("3我是postDel,我执行了吗?");
            var postDelObj=querystring.parse(str2);
            // console.log("01 postDel 前后端通信成功 postDelObj:",postDelObj);
        
            delReadWriteFile(filePath,postDelObj.id,function(){
                res.end(JSON.stringify({code:2021,msg:"postDel 删除成功"}));
            })
        })

    }else{
        res.end("2.接口不存在或空页面");
    }

});


app.listen(PROT,function(){
    console.log("服务创建成功 http://127.0.0.1:"+PROT);
});


//将前台发送的数据,添加到data02.json
function addReadWriteFile(filePath,obj,cb){
    // console.log("99999obj:",obj);
    fs.readFile(filePath,'utf-8',function(err,data){
        if(err){
            console.log("读取失败:\n",err);
        }else{
            console.log("data:",data);

            var arr=JSON.parse(data);
            obj.id=+new Date();
            obj.time=+new Date();
            arr.push(obj);
            var str=JSON.stringify(arr);

            fs.writeFile(filePath,str,function(err){
                if(err){
                    console.log("写入失败:\n",err);
                }else{
                    console.log("写入成功");
                    cb();
                }
            })

        }

    });
}

//根据前台发送的id,将data02.json中特定数据删除
function delReadWriteFile(filePath,id,cb){
    //////////////////////////////
    fs.readFile(filePath,'utf-8',function(err,data){
        if(err){
            console.log("读取失败:\n",err);
        }else{
            console.log("data:",data);

            var arr=JSON.parse(data);
            console.log("delReadWriteFilearr:",arr);

            for(var i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    arr.splice(i,1);
                    break;
                }
            }

            var str=JSON.stringify(arr);

            fs.writeFile(filePath,str,function(err){
                if(err){
                    console.log("写入失败:\n",err);
                }else{
                    console.log("写入成功");
                    cb();
                }
            })

        }

    });
    //////////////////////////////
}