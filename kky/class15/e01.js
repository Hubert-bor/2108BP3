var a1=1,a2=2,a3=3;
var b1="2";
var c1=[3];
var d1={user:"kky"};
var e1=function(){
    console.log("e");
}

function f1(){
    console.log("f1");
}


//导出
exports.a=a1;//
module.exports.b=b1;//
exports.c=c1;
module.exports.d=d1;
exports.e=e1;
module.exports.f=f1;
