var express = require("express");

var PORT = 85;
var arr=[{user:"kky",age:18,sex:0}];

var app = express();
app.listen(PORT,function(){
    console.log("服务创建成功 http://127.0.0.1:"+PORT);
});

//解决跨域问题(cors)
/*app.use("*", function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	next();
});*/

//  app.use("*", function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header("Access-Control-Allow-Methods", "*");
// 	res.header("Access-Control-Allow-Headers", "content-type");
// 	next();
// });



//主页
app.get("/",function(req,res){
    res.send("这是http://127.0.0.1:"+PORT+"后台,为了解决JSONP跨域");
});

//addGet1
app.get("/addGet1",function(req,res){
    var obj=req.query;
    console.log("obj:",obj);
    res.send({code:2021,data:arr,msg:"addGet1 "});

    
})

//addGetJsonp
app.get("/addGetJsonp",function(req,res){
    var obj=req.query;
    console.log("obj:",obj);
    var cb=obj.cb;
    console.log("cb:",cb);
   
    //";cb(arr);"==>";fn1(arr);"
    arr[0].id=+new Date();

    var  r=";"+cb+"("+JSON.stringify(arr)+");";
    console.log("这是要返回给前端的字符串:",r);
    //jsonp 跨域 步骤3 把数据编程JSON字符串方法 步骤2中 收到的的函数名字,并返回给前台
    //jsonp跨域后台核心知识点
    res.send(r);
})


