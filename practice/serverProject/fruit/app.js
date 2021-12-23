const express = require('express');
const dbase = require('./modules/db');
const app = express();
const PORT = 80;
// 静态资源
const cName = 'shop';
app.use(express.static('./'));
app.use(express.static('./public'));
app.use(express.static('./views'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../index.html');
});

app.post('/addPost', (req, res) => {
    let addObj = req.body;
    dbase.insertOne(cName, addObj, res, (err, result, client) => {
        res.send({ code: 200, message: '插入数据成功' });
        client.close();
    })

});

app.post('/postData', (req, res) => {
    let dataObj = req.body;
    let whereObj = {
        findObj: dataObj.findObj ? dataObj.findObj : {},
        limit: 0,
        skip: dataObj.skip ? dataObj.skip : 0,
        sortObj: {
            time: -1
        }
    };
    dbase.find(cName, whereObj, res, (err, result, client) => {
        res.send({ code: 200, message: '获取成功', data: result });
        client.close();
    })
});

app.post('/postDel', (req, res) => {
    let delObj = req.body;
    dbase.deleteOne(cName, delObj, res, (err, result, client) => {
        res.send({ code: 200, message: '删除成功' });
        client.close();
    })
});

// 更新接口
// ----------------------------------------------------------------
app.post('/updatePost', (req, res) => {
    let updateObj = req.body;
    // console.log(updateObj);
    let whereObj = {
        updateObj: {
            old: updateObj.old,
            new: updateObj.new
        }
    }
    dbase.updateOne(cName, whereObj, res, (err, result, client) => {
        res.send({ code: 200, message: '更新成功!' })
        client.close();
    })
});
// ----------------------------------------------------------------


app.listen(PORT, function () {
    console.log('服务器启动成功!')
});