/* 
    mongodb 开源数据库系统
    mongodb 驱动
    mongoose 驱动
*/

// cnpm i mongodb --save
var mongodb = require("mongodb");  //步骤1 引入mongodb

var MongoClient=mongodb.MongoClient;//步骤2 创建MongoClient,可以用来连接数据库(系统)

// var dbUrl="mongodb://127.0.0.1:27017";
var dbUrl="mongodb://localhost:27017";
var dbName="2108BP3";
var dbCName="user";

//步骤3 关联/连接 数据库
MongoClient.connect(dbUrl,function(err,db){//此处db表示已经关联上 mongodb数据库

    //步骤4: 判断是否连接成功
    if(err){
        console.log("1.连接数据库失败\nerr:",err);
    }else{
        console.log("2.连接数据库成功");


        //步骤5 创建/切换 数据库名称
        var dbase=db.db(dbName);

        //模拟要添加的数据
        var obj={
            user:"赵万财",
            age:18,
            sex:1,
            time:1638928583350
        }

        //步骤6 dbase 操作 集合/表 
        //插入
        dbase.collection(dbCName).insertOne(obj,function(err,result){
            if(err){
                console.log("2.插入失败\nerr:",err);
            }else{
                console.log("2.插入成功",result);
                //步骤7  断开数据库
                db.close();
            }
        })

    }
})








