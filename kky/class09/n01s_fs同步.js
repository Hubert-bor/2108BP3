var str="热更新"
console.log("str:",str);

// node中用require引入模块;
// fs 用来读写 文本文件 的模块
var fs = require('fs');
// let fs
// const fs
// console.log('fs:', fs);


var filePath="test.html";

//同步操作
var data1=fs.readFileSync(filePath);
var str1=data1.toString();
console.log('data1:',data1);
console.log('str1:',str1);

console.log('///////////////////////////');
var data2=fs.readFileSync(filePath,'utf-8');
console.log('data2:',data2);

console.log("0000000000000000000000");
