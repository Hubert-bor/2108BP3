var express = require('express')
var bodyParse=require('body-parser');
var db=require("./modules/db");
const e = require('express');
// console.log("db:",db);
var app = express();

var PORT=80;
//// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser=bodyParse.urlencoded({extended:false});//post str 接收步骤2


app.listen(PORT,function(){
    console.log("http://127.0.0.1:"+PORT);
});


//设置跨域


//设置静态资源
// app.use(express.static("./"));
// app.use(express.static("./view"));
app.use(express.static("./view/css"));
app.use(express.static("./view/js"));
app.use(express.static("./view/img"));

//设置 过滤 中间件 前台post传递 数据
// app.use(urlencodedParser);

//主页
app.get("/",function(req,res){
    var ip = req.ip;
    console.log("访问者IP:",ip);
    res.sendFile(__dirname+"/view/index.html");
});

//重定向 到主页
app.get("/index.html",function(req,res){
    var ip = req.ip;
    console.log("访问者IP:",ip);
    res.redirect("/");
});

app.get("/entry",function(req,res){
    var ip = req.ip;
    console.log("访问者IP:",ip);
    res.sendFile(__dirname+"/view/entry.html");
});
app.get("/kky",function(req,res){
    var ip = req.ip;
    console.log("访问者IP:",ip);
    res.sendFile(__dirname+"/view/entry.html");
});

app.get("/a",function(req,res){
    var ip = req.ip;
    console.log("访问者IP:",ip);
    res.sendFile(__dirname+"/view/entry.html");
});


app.post("/addPost",urlencodedParser,function(req,res){
    var obj=req.body;
    console.log("前端到后端通信是否成功 addPost obj:",obj);

    var cName="fruit11";
    obj.time=+new Date();
    db.insertOne(cName,obj,res,function(err,result,db){
        if(err){

        }else{
            console.log("后端到数据库通信是否成功");
            db.close();
            res.send({code:200,msg:"addPost 添加成功"});
        }
    })
    // res.send({code:200,msg:"addPost 添加成功"});
});


//getData
app.get("/getData",function(req,res){
    var obj=req.query;
    console.log("前端到后端通信是否成功 addPost obj:",obj);

    var whereObj={
        findObj:obj.findObj?obj.findObj:{},
        sortObj:{
            time:-1
        },
        limit:obj.limit?(obj.limit/1):3,
        skip:obj.skip?(obj.skip/1):0
    }

  

    var cName="fruit11";

    db.find(cName,whereObj,res,function(err,result,db){
        if(err){

        }else{
            console.log("2后端到数据库通信是否成功");
            db.close();
            res.send({code:200,msg:"getData 获取成功",data:result});
        }

    })
    
})