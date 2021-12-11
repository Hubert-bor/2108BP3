var express = require("express");
var fs = require("fs");

var PORT=86;
var filePath="./data/data02.json";
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


//主页
app.get("/",function(req,res){
    res.send("这是后台页面,不是前端的写");
});

//////////////////////////////////////////////////////
//addGet 接收前台通过get方式得到数据,然后进行添加
app.get("/addGet",function(req,res){
	// console.log("0000000000000000");

    //express 接收 前台通过 get 方式,发送的数据
    var addGetObj=req.query;

	
    console.log("addGet addGetObj:",addGetObj);
    addReadWriteFile(filePath,addGetObj,function(){
		res.send({code:2021,msg:"addGet 添加成功"});
	})
});
//////////////////////////////////////////////////////



app.listen(PORT,function(){
    console.log('服务创建成功 http://127.0.0.1:'+PORT);
})

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