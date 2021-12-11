var express = require("express");

var PORT =85;
var arr=[];

var app = express();

app.listen(PORT,function(){
    console.log("这是后台,测试jsonp跨域 http://127.0.0.1:"+PORT);
});

app.get("/",function(req,res){
    res.send("这是后台,测试jsonp跨域")
});

//addJsonp1 添加
app.get("/addJsonp1",function(req,res){
    var obj=req.query;
    console.log("addJsonp1 obj:",obj);
    var f1="cb" in obj;
    var f2="callback" in obj;
    var f3="cb2" in obj;
    console.log("f1:",f1,"f2:",f2);
    // if(f1&&!f2){
    //     obj.callback=obj.cb;
    // }
    if(f2){
       obj.cb=obj.callback;
    }
    if(f3){
        obj.cb=obj.cb2;
    }

    console.log("obj:",obj);
    
    
    // var obj2={};
    // for(var o in obj){
    //     if(o!="cb"){
    //         obj2[o]=obj[o];
    //     }
    // }
    // obj2.id=+new Date();
    // arr.unshift(obj2);

    
    var cb=obj.cb;
    delete obj.cb;
    // console.log("obj:",obj);
    
    obj.id=+new Date()+"a";
    arr.unshift(obj);


    // console.log("arr:",arr);

    var r=";"+cb+"("+JSON.stringify(arr)+");";/////////////////////////////////////

    res.send(r);
});

//addJsonp2 获取数据
app.get("/addJsonp2",function(req,res){
    var obj=req.query;
    console.log("addJsonp1 obj:",obj);
    var f1="cb" in obj;
    var f2="callback" in obj;
    var f3="cb2" in obj;
    console.log("f1:",f1,"f2:",f2);
    // if(f1&&!f2){
    //     obj.callback=obj.cb;
    // }
    if(f2){
       obj.cb=obj.callback;
    }
    if(f3){
        obj.cb=obj.cb2;
    }

    console.log("obj:",obj);
    
    
    // var obj2={};
    // for(var o in obj){
    //     if(o!="cb"){
    //         obj2[o]=obj[o];
    //     }
    // }
    // obj2.id=+new Date();
    // arr.unshift(obj2);

    
    var cb=obj.cb;
    delete obj.cb;
    // console.log("obj:",obj);
    
  


    // console.log("arr:",arr);

    var r=";"+cb+"("+JSON.stringify(arr)+");";/////////////////////////////////////

    res.send(r);
})