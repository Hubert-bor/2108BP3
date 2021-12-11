var fs = require('fs');
var filePath = 'n03.txt';


//异步操作 删除文件(不是文件夹)

fs.unlink(filePath,function(err){
    if(err){
        console.log('1:删除失败\n',err)
    }else{
        console.log('2.删除成功');
    }
})