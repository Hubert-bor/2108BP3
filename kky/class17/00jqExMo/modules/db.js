var mongodb = require("mongodb");  //步骤1 引入mongodb
var MongoClient=mongodb.MongoClient;//步骤2 创建MongoClient,可以用来连接数据库(系统)
// var dbUrl="mongodb://127.0.0.1:27017";
var dbUrl="mongodb://localhost:27017";
var dbName="2108BP3";


//连接数据库
function connectMGDB(cb2,res){
    MongoClient.connect(dbUrl,function(err,db){
        if(err){
            console.log("连接数据库失败\nerr:",err);
            res.send({code:0,msg:"连接数据库失败"});
        }else{
            console.log("连接数据库成功");
            var dbase = db.db(dbName);
            cb2(dbase,db);
        }
    })
}

//insertOne
module.exports.insertOne=function(cName,obj,res,cb1){
    // console.log("我是数据库中负责添加的我是insertOne",cName,obj,"\nres:",res,"cb1:",cb1);
    connectMGDB(function(dbase,db){
        dbase.collection(cName).insertOne(obj,function(err,result){
            cb1(err,result,db);
        })
    },res);
}

//deleteOne
module.exports.deleteOne=function(cName,obj,res,cb1){
    if(obj._id){
        var whereObj={
            _id:mongodb.ObjectId(obj._id)
        }
    }else{
        var whereObj=obj;
    }
    connectMGDB(function(dbase,db){
        dbase.collection(cName).deleteOne(whereObj,function(err,result){
            cb1(err,result,db);
        })
    },res);
}

//find
module.exports.find=function(cName,whereObj,res,cb1){
    connectMGDB(function(dbase,db){
        whereObj.findObj ? whereObj.findObj : whereObj.findObj={};
        whereObj.sortObj ? whereObj.sortObj : whereObj.sortObj={};
        whereObj.limit ? whereObj.limit : whereObj.limit=0;
        whereObj.skip ? whereObj.skip : whereObj.skip=0;
        dbase.collection(cName).find(whereObj.findObj).skip(whereObj.skip*whereObj.limit).limit(whereObj.limit).sort(whereObj.sortObj).toArray(function(err,result){
            cb1(err,result,db);
        })
    },res);
}

//findCount
module.exports.findCount=function(cName,whereObj,res,cb1){
    connectMGDB(function(dbase,db){
        whereObj.findObj ? whereObj.findObj : whereObj.findObj={};
         dbase.collection(cName).find(whereObj.findObj).count().then(function(max){ 
            cb1(max,db);
        })
    },res);
}










