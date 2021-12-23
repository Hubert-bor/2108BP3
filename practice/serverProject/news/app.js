const express = require('express');
const dbase = require('./model/db');

const app = express();
const PORT = 80;

// 静态资源
app.use(express.static('./'));
app.use(express.static('./public'));
app.use(express.static('./views'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})

app.post('/postAdd', (req, res) => {
    var cName = "news";
    var obj = req.body;
    dbase.insertOne(cName, obj, res, (err, result, client) => {
        res.send({ code: 200, msg: '插入成功!' });
        client.close();
    })
})

app.post('/getData', (req, res) => {
    var cName = "news";
    var whereObj = req.body;

    console.log(whereObj);
    var whereObj = {
        findObj: whereObj.selList ? { selList: whereObj.selList } : {},
        limit: 3,
        sortObj: { time: -1 },
        skip: whereObj.skip ? whereObj.skip : 0
    }
    dbase.find(cName, whereObj, res, (err, result, client) => {
        res.send({ code: 200, msg: '查询成功!', data: result });
        client.close();
    })
})
app.post('/postDel', (req, res) => {
    var cName = "news";
    var obj = req.body;
    dbase.deleteOne(cName, obj, res, (err, result, client) => {
        res.send({ code: 200, msg: '删除成功!' });
        client.close();
    })
})

app.post('/postTotal', (req, res) => {
    var cName = "news";
    var obj = req.body;
    var whereObj = {

    }
    dbase.findCount(cName, whereObj, res, (max, client) => {
        res.send({ code: 200, msg: '删除成功!', data: max });
        client.close();
    })
})
app.listen(PORT, function () {
    console.log('服务器启动成功!');
})


