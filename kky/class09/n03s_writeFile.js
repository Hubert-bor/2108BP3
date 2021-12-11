var fs = require('fs');

var filePath = 'n03.txt';

var str='';
for(var a=1;a<=10;a++){
    str+=a+" ";
}
console.log('str:',str);

//异步操作 写入模块
fs.writeFile(filePath,str,function(err){
    if(err){
        // console.log("1err:",err);
        console.log("1写入文件失败:",err);
    }else{
        console.log("写入成功");
    }
})

