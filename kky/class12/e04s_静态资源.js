var express = require("express");

var PORT=86;

var app = express();

app.listen(PORT,function(){
    console.log("服务创建成功 http://127.0.0.1:"+PORT);
});

//设置 静态资源/资源托管  位置 ./
app.use(express.static("./"));
// app.use(express.static("./gongYou"));
// app.use(express.static("./2108BP3"));

app.get("/",function(req,res){
    res.send("你可以访问我这里的所有文件");
});