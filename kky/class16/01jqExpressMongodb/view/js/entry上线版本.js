
var currentPage=1;//当前页
var limit=3;//默认表格每页最多显示3条
var searchObj={};
var pageMax=1;
$(function(){
	var trypeArr=[{},{goodsType:"f1"},{goodsType:"f2"},{goodsType:"f3"},{goodsType:"f4"}];
	
	////页面第一次进入 或者 页面刷新  自动获取数据
	getData();
	
	//点击 添加#addPost 按钮 通过$.ajax post方式添加
	$("#addPost1").click(function(){
		var goodsName=$("#goodsName").val();
		var goodsType=$("#goodsType").val();
		if(goodsName&&goodsType){
			$.ajax({
				url:"/addPost",
				type:"post",
				data:{
					goodsName:goodsName,
					goodsType:goodsType,
					goodsPrice1:($("#goodsPrice1").val()/1).toFixed(2),
					goodsPrice2:($("#goodsPrice2").val()/1).toFixed(2),
					goodsCount:$("#goodsCount").val(),
					isRed:$("#isRed>label>input:checked").val()
				},
				beforeSend:function(){
					$("#loading").show();
				},
				success:function(data){
					console.log("1 addPost data:",data);
					if(data.code==2021){
						
						//清空所有内容
						$("#goodsName").val("");
						$("#goodsPrice1").val("");
						$("#goodsPrice2").val("");
						$("#goodsCount").val("");
						$("#goodsType").val("f1");
						$("#isRed>label>input:eq(1)").prop("checked",true);
						
						//调用getDtat 不传值,表示获取所有数据;
						getData();
						$("#show>div.type>a:eq(0)").addClass("active").siblings().removeClass("active");
					}
				},
				error:function(){
					
				},
				complete:function(){
					$("#loading").hide();
				}
			})
		}else{
			$("#mask").show();
			$("#info").show(1500).html("商品名称和类别不能为空");
			setTimeout(function(){
				$("#mask,#info").hide();
			},3000);
		}
	});
	
	////点击 添加#addPost2 按钮 通过$.post方式添加
	$("#addPost2").click(function(){
		var goodsName=$("#goodsName").val();
		var goodsType=$("#goodsType").val();
		if(goodsName&&goodsType){
			$("#loading").show();//先显示loading
			var url="/addPost";
			var data={
				goodsName:goodsName,
				goodsType:goodsType,
				goodsPrice1:($("#goodsPrice1").val()/1).toFixed(2),
				goodsPrice2:($("#goodsPrice2").val()/1).toFixed(2),
				goodsCount:$("#goodsCount").val(),
				isRed:$("#isRed>label>input:checked").val()
			}
			$.post(url,data,function(data2){
				// console.log("11111111111addPost2 :",data2);
				////////
				if(data2.code==2021){
					//清空所有内容
					$("#goodsName").val("");
					$("#goodsPrice1").val("");
					$("#goodsPrice2").val("");
					$("#goodsCount").val("");
					$("#goodsType").val("f1");
					$("#isRed>label>input:eq(1)").prop("checked",true);
					
					//调用getDtat 不传值,表示获取所有数据;
					getData();
					
					$("#show>div.type>a:eq(0)").addClass("active").siblings().removeClass("active");
					//
					$("#loading").hide();
				}
				////////
			})
		}else{
			$("#mask").show();
			$("#info").show(1500).html("商品名称和类别不能为空");
			setTimeout(function(){
				$("#mask,#info").hide();
			},3000);
		}
	});
	
	//根据 商品类别 获取对应的数据
	$("#show>div.type>a").click(function(){
		currentPage=1;
		searchObj.skip=0;
		var i=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		// var data=trypeArr[i];
		// var searchObj={
		// 	findObj:trypeArr[i]
		// }
		searchObj.findObj=trypeArr[i]
		
		getData(searchObj);
	});
	
	
	//上一页
	$("#prev").click(function(){
		if(currentPage>1){
			currentPage--;
		}
		console.log("现在显示页码为:",currentPage);
		$("#page>button").eq(currentPage-1).addClass("active").siblings().removeClass("active");
		
		//调用getData();按照条件查询数据
		console.log("26666666 searchObj:",searchObj);
		searchObj.skip=currentPage-1;
		console.log("8888888888 searchObj:",searchObj);
		getData(searchObj);
	});
	
	//下一页
	$("#next").click(function(){
		if(currentPage<pageMax){
			currentPage++;
		}
		console.log("现在显示页码为:",currentPage);
		$("#page>button").eq(currentPage-1).addClass("active").siblings().removeClass("active");
		
		//调用getData();按照条件查询数据
		console.log("36666666 searchObj:",searchObj);
		searchObj.skip=currentPage-1;
		console.log("8888888888 searchObj:",searchObj);
		getData(searchObj);
	});
	
	$("#page").on("click","button",function(){
		var i=$(this).index()+1;
		console.log("i:",i);
		currentPage=i;
		$(this).addClass("active").siblings().removeClass("active");
		console.log("现在显示页码为:",currentPage);
		
		//调用getData();按照条件查询数据
		console.log("16666666 searchObj:",searchObj);
		searchObj.skip=currentPage-1;
		console.log("8888888888 searchObj:",searchObj);
		getData(searchObj);
		
	});
	
	
	
	
});

//getData
function getData(data){
	data?data:(data={findObj:{}});
	$.ajax({
		url:"/getData",
		type:"get",
		data:data,
		beforeSend:function(){
			$("#loading").show();
		},
		success:function(data2){
			console.log("2 getData data",data2);
			if(data2.code==2021){
				// 渲染页面
				showPage(data2.data);
				
				//
				pagingFun();
			}
		},
		error:function(){
			
		},
		complete:function(){
			$("#loading").hide();
		}
	})
}

//渲染
function showPage(arr){
	var trs="";
	for(var i=0;i<arr.length;i++){
		trs+=`
			<tr class=${arr[i].isRed=="1"?"red":""}>
				<td>${arr[i].goodsName}</td>
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
	var url="/delPost";
	var data={_id:_id};
	
	$("#loading").show();//先显示loading
	$.post(url,data,function(data){
		console.log("delPost data:",data);
		////////
		if(data.code==2021){
			//调用getDtat 不传值,表示获取所有数据;
			getData();
			//
			$("#loading").hide();
		}
	});
};


//分页功能

//
function pagingFun(){
	console.log("0000000")
	var url="/countMax";
	var data=searchObj;
	$.get(url,data,function(data2){
		// console.log("data2:",data2);
		if(data2.code==2021){
			var max=data2.data;
			pageMax=Math.ceil(max/limit);
			console.log("页数:",pageMax);
			//渲染分页
			showPageN(pageMax);
		}
	})
}


//渲染分页 按钮
function showPageN(pageMax){
	var btns=``;
	for(var i=1;i<=pageMax;i++){
		if(i==currentPage){
			btns+=` <button class="active" type="button">${i}</button> `;
		}else{
			btns+=` <button type="button">${i}</button> `;
		}
	}
	$("#page").html(btns);
}

