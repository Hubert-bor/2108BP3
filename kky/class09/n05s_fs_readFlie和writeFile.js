var fs = require('fs');

var filePath="data.json";

fs.readFile(filePath,function(err,data){
    if(err){
        console.log('1读取失败\nerr:',err);
    }else{
        var str=data.toString(); 
        console.log('2str:',str);
        var arr=JSON.parse(str);
        console.log('3arr:',arr,typeof arr);
        var obj={
            id:+new Date()
        }
        arr.push(obj);
        console.log('4arr:',arr);
        var str2=JSON.stringify(arr);
        fs.writeFile(filePath,str2,function(err){
            if(err){
                console.log('5写入失败\nerr:',err)
            }else{
                console.log('6.写入成功');
            }
        })
    }
});
