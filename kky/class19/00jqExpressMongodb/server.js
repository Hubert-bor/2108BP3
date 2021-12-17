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