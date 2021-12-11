// 导入模块
const express = require('express');
const fs = require('fs');
var bodyParse = require("body-parser");//post Str 接收步骤1 post Obj 接收步骤1 


//// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParse.urlencoded({ extended: false });//post str 接收步骤2

// 设置端口号
const PORT = 80;

// 写入文件路径
var pathname = '../data/data01.json';

// 创建服务器
var app = express();

app.use('*', (req, res, next) => {
    // 中间件,处理跨域
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
});
// get 方式请求 GetAdd
app.get('/GetAdd', (req, res) => {
    // 接收前台传入数据
    var GetAddStr = req.query;
    // 调用保存文件函数
    saveData(pathname, GetAddStr, () => {
        res.send({ code: 200, msg: 'GetAddStr 添加数据成功!' });
    })

});

// get 方式请求 GetSearch
app.get('/GetSearch', (req, res) => {
    // 接收前台传入的数据

    res.send('GetSearch');

});

// get 方式请求 GetDelete
app.get('/GetDelete', (req, res) => {
    res.send('GetDelete');

});

// post 请求方式 PostAdd
app.post('/PostAdd', urlencodedParser, (req, res) => {
    // 接收前台传入的数据
    var postAddStr = req.body;
    // 调用保存文件函数
    saveData(pathname, postAddStr, () => {
        res.send({ code: 200, msg: 'postAddStr 添加数据成功!' });
    })
});

// post 请求方式 PostSearch
app.post('/PostSearch', (req, res) => {
    res.send("PostSearch");

});

// post 请求方式 PostDelete
app.post('/PostDelete', (req, res) => {
    res.send("PostDelete");

});
//监听端口
app.listen(PORT);
console.log('服务器启动成功!');


// 存储文件函数
function saveData(pathname, obj, callback) {
    // 读取文件
    fs.readFile(pathname, 'utf-8', (err, result) => {
        if (err) {
            console.log('文件读取失败!');
        } else {
            if (result.length == 0) {
                var arr = [];
            } else {
                arr = JSON.parse(result);
                obj.id = +new Date();
                arr.push(obj);
                var str = JSON.stringify(arr);

                // 写入文件
                fs.writeFile(pathname, str, (err) => {
                    if (err) {
                        console.log('文件写入失败!');
                    } else {
                        console.log('文件写入');
                        callback();
                    }
                })
            }
        }
    })

}