// 引入http模块
var http= require('http');


// 创建服务器(程序);
//request  请求  发送数据  req
//response 响应         res

//协议 ip  0-65535

//127.0.0.1和localhost 都代表自己电脑

// http.STATUS_CODES 状态码 200 表示成功

// 客户端/ 浏览器

/* 
//  ctrl+/ 单行注释
// alt  + 上下键
// shift +alt +a  多行注释
// ctrl+shift+k   删除当前行
// 

"content-type":"text/plain;charset=utf-8"  纯文本
 "content-type":"text/html;charset=utf-8"  html
*/

http.createServer(function(request,response){
    response.writeHead(200,{
        // "content-type":"text/plain;charset=utf-8"
        "content-type":"text/html;charset=utf-8"
    })
    var str="我是node创建的<strong>服务器</strong>";
    response.end(str);
}).listen(81,function(){
    console.log("创建服务成功,请前往http://127.0.0.1:81")
})
