const express = require('express');

const dbase = require('./model/db');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));
app.use(express.static('./'));
app.use(express.static('./views'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});
app.post('/addPost', (req, res) => {
    var cName = 'book';
    var obj = req.body;
    dbase.insertOne(cName, obj, res, (err, result, client) => {
        res.send({ code: 200, msg: '添加成功!' })
        client.close();
    });

})

//获取数据

app.get('/getData', (req, res) => {
    var cName = 'book';
    var obj = req.query;
    var whereObj = {
        findObj: obj.findObj ? obj.findObj : {},
        limit: 3,
        sortObj: { time: -1 },
        skip: obj.skip
    }
    console.log(whereObj.findObj);
    dbase.find(cName, whereObj, res, (err, result, client) => {
        res.send({ code: 200, msg: '获取成功!', data: result })
        client.close();
    });

})

app.post('/postDel', (req, res) => {
    var cName = 'book';
    var obj = req.body;
    dbase.deleteOne(cName, obj, res, (err, result, client) => {
        res.send({ code: 200, msg: '删除成功!', data: result })
        client.close();
    });

})


app.post('/postData', (req, res) => {
    var cName = 'book';
    var obj = req.body;
    console.log(obj);
    var whereObj = {
        findObj: obj.findObj ? obj.findObj : {},
        limit: 3,
        sortObj: { time: -1 },
        skip: obj.skip?obj.skip:obj.skip=0
    };
    dbase.find(cName, whereObj, res, (err, result, client) => {
        res.send({ code: 200, msg: '获取成功!', data: result })
        client.close();
    });

})


app.listen(80, function () {
    console.log('服务器已启动!');
});