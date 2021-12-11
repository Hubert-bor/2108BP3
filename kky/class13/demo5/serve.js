var express = require("express");
var app = express();
var fs = require("fs");
var filePath="data.json";

app.listen(85,function(){
    console.log("http://127.0.0.1:85");
    
});

app.use(express.static("./"));

app.get("/addGet",function(req,res){
    var obj=req.query;
    console.log("obj:",obj);
    // setTimeout(function(){
    //     res.send({code:2021,msg:"addGet 添加成功"});
    // },3000);
    readWriteFile(filePath,obj,function(){
        // res.send({code:2021,msg:"addGet 添加成功"});
        setTimeout(function(){
            console.log("t1:",parseInt(+new Date()/1000))
            res.send({code:2021,msg:"addGet 添加成功"});
        },3000);
    })
});


function readWriteFile(filePath,obj,cb){
    fs.readFile(filePath,'utf-8',function(err,data){
        if(err){

        }else{
            var arr=JSON.parse(data);
            obj.id=+new Date();
            arr.unshift(obj);
            var str=JSON.stringify(arr);
            console.log("str:",str);
            fs.writeFile(filePath,str,function(err){
                if(err){

                }else{
                    cb();
                }
            })
        }
    })
}