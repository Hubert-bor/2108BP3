var express = require("express");
var fs = require("fs");
var bodyParser=require("body-parser");


// 前台通过post 序列化(字符串) 发送的数据进行解析
var postStrBodyParser=bodyParser.urlencoded({extended:false});



var PORT=85;
var filePath="data/data01.json";


var app = express();
app.listen(PORT,function(){
    console.log("http://127.0.0.1:"+PORT);
});

//跨域问题(cors)
/*app.use("*", function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	next();
});*/

/* 
app.use("*", function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "content-type");
	next();
});
 */

// 设置静态资源
// app.use(express.static("./view"));// 这是默认页面index.html 所在的目录为静态资源
app.use(express.static("./view/css"));
app.use(express.static("./view/js"));
app.use(express.static("./view/img"));

//主页
app.get("/",function(req,res){
    var ip = req.ip;
    res.sendFile(__dirname+"/view/index.html");
});

//还是主页
app.get("/index.html",function(req,res){
    var ip = req.ip;
    // res.sendFile(__dirname+"/view/index.html");
    // 重定向 redirect(路由/网址);
    res.redirect("/");
})










