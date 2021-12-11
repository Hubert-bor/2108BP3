var express = require('express')
var bodyParse=require('body-parser');
var db=require("./modules/db");
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

app.get("/entry.html",function(req,res){
    var ip = req.ip;
    console.log("访问者IP:",ip);
    res.sendFile(__dirname+"/view/entry.html");
});

app.get("/a",function(req,res){
    var ip = req.ip;
    console.log("访问者IP:",ip);
    res.sendFile(__dirname+"/view/entry.html");
});

//addPost
app.post("/addPost",urlencodedParser,function(req,res){
    var obj=req.body;
    console.log("addPost obj:",obj);

    obj.time=+new Date();

    var cName="fruit";//数据中的 表/集合 名称


    db.insertOne(cName,obj,res,function(err,result,db){
        if(err){
            console.log("添加失败");
            res.send({code:0,msg:"添加失败"})
        }else{
            console.log("addPost 添加成功,result:",result);
            db.close();//断开数据库
            res.send({code:2021,msg:"addPost 添加成功"});
        }
        
    });
});

//getData
app.get("/getData",function(req,res){
    var whereObj=req.query;
    console.log("getData obj:",whereObj);

    var cName="fruit";//数据中的 表/集合 名称


    db.find(cName,whereObj,res,function(err,result,db){
        if(err){
            console.log("获取失败");
            res.send({code:0,msg:"获取失败"})
        }else{
            console.log("getData 获取成功,result:",result);
            db.close();//断开数据库
            res.send({code:2021,msg:"getData 添加成功",data:result});
        }
    });
    
});





///////////////////////////////////////////////////////////////////////
app.get("/addJqGet",function(req,res){
    var obj=req.query;
    console.log("addJqGet obj:",obj);

    res.send({code:2021,msg:"addJqGet 添加成功"});
});

