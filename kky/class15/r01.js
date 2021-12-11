// console.log("module:",module);
console.log("exports",exports);//{}
console.log("module.exports",module.exports);//{}
console.log("exports===module.exports",exports===module.exports);//true==>var exports=module.exports

var zwc=require("./e01");
console.log("zwc:",zwc);

var a=zwc.a;
console.log("a:",a);

zwc.e();

zwc.f();