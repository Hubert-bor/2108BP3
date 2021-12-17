

$(function(){
	
	getData();
	
	//addPost1 添加
	$("#addPost1").click(function(){
		var goodsName=$("#goodsName").val();
		var goodsType=$("#goodsType").val();
		
		if(goodsName&&goodsType){
/* 			console.log("00:",{
				goodsName,
				goodsImg:$("#goodsImg").val(),
				goodsAddress:$("#goodsAddress").val(),
				goodsPrice1:($("#goodsPrice1").val()/1).toFixed(2),
				goodsPrice2:($("#goodsPrice2").val()/1).toFixed(2),
				goodsCount:$("#goodsCount").val(),
				isRed:$("#isRed>label>input:checked").val(),
				goodsType:goodsType,
			}); */
			$.ajax({
				url:"/addPost",
				type:"post",
				data:{
					goodsName,
					goodsImg:$("#goodsImg").val(),
					goodsAddress:$("#goodsAddress").val(),
					goodsPrice1:($("#goodsPrice1").val()/1).toFixed(2),
					goodsPrice2:($("#goodsPrice2").val()/1).toFixed(2),
					goodsCount:$("#goodsCount").val(),
					isRed:$("#isRed>label>input:checked").val(),
					goodsType:goodsType,
				},
				beforeSend(){
					$("#loading").show();
				},
				success:function(data){
					console.log("data:",data);
					if(data.code==200){
						//清空所有内容
						$("#goodsName").val("");
						$("#goodsPrice1").val("");
						$("#goodsPrice2").val("");
						$("#goodsCount").val("");
						$("#goodsType").val("f1");
						$("#isRed>label>input:eq(1)").prop("checked",true);
						
						$("#show>div.type>a:eq(0)").addClass("active").siblings().removeClass("active");
						
						//getData();
						getData();
					}
				},
				error(){
					
				},
				complete(){
					$("#loading").hide();
				}
			})
		}else{
			$("#mask").show();
			$("#info").show(1200).html("商品名称和类别不能为空");
			setTimeout(function(){
				$("#mask,#info").hide();
			},3000);
		}
		
	});
	
	
	////////////////////////////////
	//查询
	$("#searchBtn").click(function(){
		var goodsName2=$("#goodsName2").val();
		var goodsAddress2=$("#goodsAddress2").val();
		var whereObj={}
		if(goodsName2&&!goodsAddress2){
			 whereObj={
				findObj:{
					goodsName:goodsName2
				}
			}
		}else if(goodsAddress2&&!goodsName2){
			 whereObj={
				findObj:{
					goodsAddress:goodsAddress2
				}
			}
		}else if(goodsName2&&goodsAddress2){
			 whereObj={
				findObj:{
					$or:[{goodsName:goodsName2},{goodsAddress:goodsAddress2}]
				}
			}
		}
		getData(whereObj);
		///////////////////////////////
	})
	
});

function getData(whereObj){
	if(!whereObj){
		whereObj={findObj:{}}
	}
	$.ajax({
		url:"/getData",
		type:"get",
		data:whereObj,
		beforeSend(){
			$("#loading").show();
		},
		success:function(data2){
			console.log("getData data2:",data2);
			if(data2.code==200){
				
				showPage(data2.data);
			}
		},
		error:function(){
		},
		complete:function(){
			$("#loading").hide();
		}
	})
}

function showPage(arr){
	var trs="";
	for(var i=0;i<arr.length;i++){
		trs+=`
			<tr class=${arr[i].isRed=="1"?"red":""}>
				<td>${arr[i].goodsName}</td>
				<td>
					${["f1","f2","f3","f4"].includes(arr[i].goodsImg)?"<img src="+arr[i].goodsImg+".png >":arr[i].goodsImg}
				</td>
				<td>${arr[i].goodsAddress}</td>
				<td>${setType(arr[i].goodsType)}</td>
				<td class="price1">¥ ${(arr[i].goodsPrice1/1).toFixed(2)}</td>
				<td>¥ ${(arr[i].goodsPrice2/1).toFixed(2)}</td>
				<td>${arr[i].goodsCount}</td>
				<td>${arr[i].isRed=="1"?"是":"否"}</td>
				<td>${timeFun(arr[i].time)}</td>
				<td>
					<a href="javascript:void(0);" onclick=delPost('${arr[i]._id}')>删除</a>
				</td>
			</tr>
		`;
	}
	$("#tab>tbody").html(trs);
}

//设置商品类别
function setType(attr){
	var obj={
		f1:"优选水果",
		f2:"卤味熟食",
		f3:"饮料酒水",
		f4:"休闲零食"
	}
	return obj[attr];
	// obj.f1
	// obj["f1"];
	// var attr="f1"; obj[attr];
}


// timeFun(time) 返回时间
function timeFun(time){
	var d=new Date(time);
	var year=d.getFullYear();
	var month=bu0(d.getMonth()+1);
	var date=bu0(d.getDate());
	var hours=bu0(d.getHours());
	var minutes=bu0(d.getMinutes());
	var seconds=bu0(d.getSeconds());
	return year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;
}
/////////////////////////////////////////////
// bu0(n) 返回数字 09/10
function bu0(n){
	return n>10?n:('0'+n);
}

//delPost
function delPost(_id){
	
}
