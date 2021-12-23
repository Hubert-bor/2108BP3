const express = require('express');
const dbase = require('./modules/db');
const app = express();
const PORT = 80;
const cName = 'userT1';
// 静态资源
app.use(express.static('./'));
app.use(express.static('./public'));
app.use(express.static('./views'));
app.use(express.urlencoded({ extended: true }));

app.post('/delPost', (req, res) => {
    let obj = req.body;
    dbase.deleteOne(cName, obj, res, (err, result, client) => {
        res.send({ code: 200, message: '删除成功!' });
        client.close();
    })
});

app.post('/postData', (req, res) => {
    let obj = req.body;
    let whereObj = {
        limit: 0,
        findObj: obj.findObj,
        sortObj: obj.sortObj ? obj.sortObj : {},
        skip: 0
    };
    dbase.find(cName, whereObj, res, (err, result, client) => {
        res.send({ code: 200, message: '查询成功!', data: result })
        client.close();
    })
})

app.post('/addPost', (req, res) => {
    let obj = req.body;
    obj.userAge = obj.userAge / 1;
    // console.log(obj.userAge, typeof obj.userAge);
    // console.log(obj);
    dbase.insertOne(cName, obj, res, (err, result, client) => {
        res.send({ code: 200, message: '添加成功!' })
        client.close();
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.listen(PORT, function () {
    console.log('服务器启动成功!')
});