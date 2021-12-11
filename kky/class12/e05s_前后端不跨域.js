var express = require("express");//http,url,querystring
var  fs = require("fs");

var filePath;
var PORT=86;

var app = express();

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

//设置静态资源
app.use(express.static("./"));
app.use(express.static("./css"));
app.use(express.static("./js"));


//这是主页
app.get("/",function(req,res){
    var ip=req.ip;
    console.log("访问者:",ip);
    res.send({code:2021,msg:"express 后台服务创建成功"});
});

//addGet 接收 前端通过get方式 传递的数据,然后添加
app.get("/addGet",function(req,res){
    console.log("addGet 我执行了");
    res.send({code:2021,msg:"addGet 添加成功"});
})

//addPost 接收 前端通过post方式 传递的数据,然后添加
app.post("/addPost",function(req,res){
    console.log("addPost 我执行了");
    res.send({code:2021,msg:"addPost 添加成功"});
})

//getData 前端通过get方式 获取数据
app.get("/getData",function(req,res){
    console.log("getData 我执行了");
    res.send({code:2021,msg:"getData 获取成功",data:[]});
})


//postData 前端通过post方式 获取数据
app.post("/postData",function(req,res){
    console.log("postData 我执行了");
    res.send({code:2021,msg:"postData 获取成功",data:[]});
})

//getDel 根据前端通过get方式发送的id 进行数据删除
app.get("/getDel",function(req,res){
    console.log("getDel 我执行了");
    res.send({code:2021,msg:"getDel 删除成功"});
})

//postDel 根据前端通过post方式发送的id 进行数据删除
app.post("/postDel",function(req,res){
    console.log("postDel 我执行了");
    res.send({code:2021,msg:"postDel 删除成功"});
})





app.listen(PORT,function(){
    console.log("服务创建成功 http://127.0.0.1:"+PORT);
});
