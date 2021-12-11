var fs = require("fs");

var filePath='test.html';

//异步操作 fs 读取模块
fs.readFile(filePath,function(err,data){
    if(err){
        console.log("1err:",err);
    }else{
        var str1=data.toString();
        console.log('str1:',str1);
        console.log("111111");
    }
})

fs.readFile(filePath,'utf-8',function(err,data){
    if(err){
        console.log("2err:",err);
    }else{
        console.log('2data:',data);
        console.log("22222");
    }
})



console.log("0000000000000000000000");

