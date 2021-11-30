// console.log("我会后台开发了,可以挣大钱了,呵呵");

//require是node引入的意思,模块也就是一个对象
var fs = require('fs');//引入fs 模块

// console.log('fs:', fs);

var filePath="04_node.html";
var filePath2="../01_原生js深度克隆.html";

//fs.readFile 根据文件地址异步读取文件
fs.readFile(filePath2,function(err,data){
    if(err){
        console.log("err:",err);
    }else{
        // console.log("data:",data);
        var str=data.toString();
        console.log("str:",str);
    }
})