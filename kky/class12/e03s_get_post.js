var express = require('express');
var fs = require('fs');
var bodyParse=require("body-parser");//post Str 接收步骤1 post Obj 接收步骤1 
const { dirname } = require('path');

//// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser=bodyParse.urlencoded({extended:false});//post str 接收步骤2


var PROT=86;
// var filePath1="./data/data03.json";
// var filePath2="data/data03.json";
// var filePath3="/data/data03.json";//此处 等号后的第一个/ 表示根目录
var filePath="data/data03.json";

var app = express();
app.listen(PROT,function(){
    console.log("服务创建成功 http://127.0.0.1:"+PROT);
});

//跨域问题(cors)
/*app.use("*", function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	next();
});*/

app.use("*", function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "content-type");
	next();
});


//主页
app.get("/",function(req,res){
    res.send({code:2021,msg:"后台主页"});
});

//addGet
app.get("/addGet",function(req,res){
    var obj=req.query;
    addReadWriteFile(filePath,obj,function(){
        res.send({code:2021,msg:"addGet 添加成功"});
    });
});

//addPost
app.post("/addPost",urlencodedParser,function(req,res){
    var obj=req.body;
    addReadWriteFile(filePath,obj,function(){
        res.send({code:2021,msg:"addPost 添加成功"});
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////
//addPostObj
app.post("/addPostObj",bodyParse.json(),function(req,res){//post Obj 接收步骤2
    var obj=req.body;//post Obj 接收步骤3
    console.log("addPostObj:",obj);
    addReadWriteFile(filePath,obj,function(){
        res.send({code:2021,msg:"addPostObj 添加成功"});
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////


//getData
app.get("/getData2",function(req,res){
    //__dirname 当前文件的绝对路径
    // console.log("__dirname:",__dirname);
    // console.log("__dirname:",__dirname+"/"+filePath);
    // res.sendFile 返回任意文件,必须是 绝对路径
    res.sendFile(__dirname+"/"+filePath);
});
//getData1
app.get("/getData",function(req,res){
    fs.readFile(filePath,'utf-8',function(err1,data1){
        if(err1){
            res.send({code:0,msg:"获取数据失败"});
        }else{
            var arr=JSON.parse(data1);
            res.send({code:2021,msg:"getData 获取数据成功",data:arr});
        }
    })
    
});

//postData
app.post("/postData",urlencodedParser,function(req,res){
    fs.readFile(filePath,'utf-8',function(err1,data1){
        if(err1){
            res.send({code:0,msg:"获取数据失败"});
        }else{
            var arr=JSON.parse(data1);
            res.send({code:2021,msg:"postData 获取数据成功",data:arr});
        }
    })
});

//getDel
app.get("/getDel",function(req,res){
    var obj=req.query;
    delReadWriteFile(filePath,obj.id,function(){
        res.send({code:2021,msg:"getDel 删除成功"});
    })
});

//postDel
app.post("/postDel",urlencodedParser,function(req,res){
    var obj=req.body;
    delReadWriteFile(filePath,obj.id,function(){
        res.send({code:2021,msg:"postDel 删除成功"});
    })
});

//getSearch
app.get("/getSearch",function(req,res){
    var obj=req.query;
    console.log("getSearch obj:",obj);
    fs.readFile(filePath,'utf-8',function(err,data){
        if(err){
            res.send({code:0,msg:"找不到数据"});//查询失败
        }else{
            var arr=JSON.parse(data);
            if(obj.user){
                //前端传递了数据
                var arr2=arr.filter(function(v){
                    return v.user==obj.user;
                })
                res.send({code:2021,msg:"getSearch 返回相应数据",data:arr2})
            }else{
                //没有传递数据
                res.send({code:2021,msg:"getSearch 返回所有数据",data:arr})
            }
        }
    })
    
})

//postSearch
app.post("/postSearch",urlencodedParser,function(req,res){
    var obj=req.body;
    console.log("postSearch obj:",obj);
    fs.readFile(filePath,'utf-8',function(err,data){
        if(err){
            res.send({code:0,msg:"找不到数据"});//查询失败
        }else{
            var arr=JSON.parse(data);
            if(obj.user){
                //前端传递了数据
                var arr2=arr.filter(function(v){
                    return v.user==obj.user;
                })
                res.send({code:2021,msg:"postSearch 返回相应数据",data:arr2})
            }else{
                //没有传递数据
                res.send({code:2021,msg:"postSearch 返回所有数据",data:arr})
            }
        }
    })
});

















/////////////////////////////////////////////////////////
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
            // arr.push(obj);
            arr.unshift(obj);
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
