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
       var whereObj={
           findObj:{
               sex:1
           },
           limit:0,
           skip:0,
           sortObj:{
               age:1
           }
       };
       
       //    var limit=0; //每页最多显示条数
       
       //    var n=1;//之前 页
       //    var skip=n*limit;//跳过前skip条
       
       //    var sortObj={
           //        age:1
           //    }
          
           // 若前台没有给定findObj, limit,skip,sortObj,则需要我们设置默认值
         var whereObj={};
         whereObj.findObj ? whereObj.findObj : whereObj.findObj={};
         whereObj.sortObj ? whereObj.sortObj : whereObj.sortObj={};
         whereObj.limit ? whereObj.limit : whereObj.limit=0;
         whereObj.skip ? whereObj.skip : whereObj.skip=0;


       



        //步骤6 dbase 操作 集合/表 
        //插入
        dbase.collection(dbCName).find(whereObj.findObj).skip(whereObj.skip*whereObj.limit).limit(whereObj.limit).sort(whereObj.sortObj).toArray(function(err,result){
            if(err){
                console.log("2.查询失败\nerr:",err);
            }else{
                console.log("2.查询成功",result);
                //步骤7  断开数据库
                db.close();
            }
        })

    }
})








