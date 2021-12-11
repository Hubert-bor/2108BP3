var express = require("express");
var bodyParser=require("body-parser");

var bodyPostStr=bodyParser.urlencoded({extended:false});

var db=require("./modules/db");
const res = require("express/lib/response");

var app = express();

var PORT=80;

app.listen(PORT,function(){
    console.log("http://127.0.0.1:"+PORT);
});

app.use(express.static("./view/css"));
app.use(express.static("./view/js"));
app.use(express.static("./view/img"));

app.get("/",function(req,res){
    var ip = req.ip;
    console.log("ip:",ip);
    res.sendFile(__dirname+"/view/index.html");
});

app.get("/entry",function(req,res){
    var ip = req.ip;
    console.log("ip:",ip);
    res.sendFile(__dirname+"/view/page/entry.html");
});

// /user/addPost
app.post("/user/addPost",bodyPostStr,function(req,res){
    var obj=req.body;
    console.log("/user/addPost obj:",obj);

    obj.time=+new Date();
    var cName="user10";

    db.insertOne(cName,obj,res,function(err,result,db){
        if(err){

        }else{
            console.log("result:",result);
            db.close();
            res.send({code:200,msg:"/user/addPost 添加数据成功"}); 
        }
    });
    // res.send({code:200,msg:"/user/addPost 添加数据成功"});
});

///user/getData 获取数据
app.get("/user/getData",function(req,res){
    var obj=req.query;
    console.log("前端和后端通信是否成功 /user/getData obj:",obj);
    // res.send({code:200,msg:"/user/getData 获取数据成功",data:[]});
    var cName="user10";
    // var whereObj=obj;
    var whereObj={
        findObj:obj.findObj,
        limit:3,
        sortObj:{time:-1},
        skip:obj.skip/1
    }

    
    db.find(cName,whereObj,res,function(err,result,db){
        if(err){
            
        }else{
            console.log("后端和数据库 通信成功 result:",result);
            db.close();
            res.send({code:200,msg:"user/getData 获取数据成功",data:result});
        }
    })
});

///user/delData 删除 根据 _id
app.post("/user/delData",bodyPostStr,function(req,res){
    var obj=req.body;
    console.log("前端和后端通信是否成功 /user/delData obj:",obj);//

    var cName="user10";

    db.deleteOne(cName,obj,res,function(err,result,db){
        if(err){

        }else{
            console.log("后端和数据库 通信成功 user/delData 删除成功");
            db.close();
            res.send({code:200,msg:"user/delData 删除成功"});
        }
    });
    // res.send({code:200,msg:"user/delData 删除成功"});
})

//countMax 通过get 获取数据条数
app.get("/countMax",function(req,res){
    var obj=req.query;
    console.log("countMax 前端和后端通信是否成功",obj);

    var cName="user10";
    var whereObj=obj;
    
    db.findCount(cName,whereObj,res,function(max,db){
        db.close();
        res.send({code:2021,msg:" /countMax 获取数据条数成功",max:max});
    })
})


/* 
whereObj={
    findObj:{},
    sortObj:{time:1}
    limit:3,
    skip:2
}
*/


