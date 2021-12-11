
const limit=3;//每一次显示最多显示3次
var currentPage=1;//默认显示第一页

//此时查询的类别
var searchObj={
	findObj:{}
};


var pageMax;//当前 商品类别 最大页面

//jq 等待加载
$(function(){
	var trypeArr=[{},{goodsType:"f1"},{goodsType:"f2"},{goodsType:"f3"},{goodsType:"f4"}];
	
	
	//页面第一次进入 或者 页面刷新  自动获取数据
	getData();
	
	
	//点击 添加#addPost 按钮 通过$.ajax post方式添加
	$("#addPost1").click(function(){
		var goodsName=$("#goodsName").val();
		var goodsType=$("#goodsType").val();
		console.log("goodsType:",goodsType);
		// var f=$("#isRed>label>input:checked").val();
		// console.log("f:",f);
		
		// $("#goodsType").val("");
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
					// console.log("addPost data:",data);
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
			$("#mask").show(1000,function(){});
			$("#info").show(1200).html("商品名称和类别不能为空");
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
			$("#mask").show(1000,function(){});
			$("#info").show(1200).html("商品名称和类别不能为空");
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
		searchObj.findObj=trypeArr[i];//
		console.log("8888888888 searchObj:",searchObj);
		getData(searchObj);
	});
	
	
	//下一页
	$("#next").click(function(){
		if(currentPage<pageMax){
			console.log("pageMax:",pageMax);
			
			$("#page>button").eq(currentPage).addClass("active").siblings().removeClass("active");
			
			searchObj.skip=currentPage;
			
			currentPage++;
			// console.log("当前页:",currentPage);
			
			
			getData(searchObj);
			
		}else{
			$("#mask").show(1000,function(){});
			$("#info").show(1200).html("亲,已经最后一页了");
			setTimeout(function(){
				$("#mask,#info").hide();
			},3000);
		}
	})
	//上一页
	$("#prev").click(function(){
		if(currentPage>1){
			currentPage--;
			console.log("当前页:",currentPage);
			$("#page>button").eq(currentPage-1).addClass("active").siblings().removeClass("active");
			searchObj.skip=currentPage-1;
			getData(searchObj);
		}else{
			$("#mask").show(1000,function(){});
			$("#info").show(1200).html("亲,已经是第一页了");
			setTimeout(function(){
				$("#mask,#info").hide();
			},3000);
		}
	})
	
	//跳转页
	$("#page").on("click","button",function(){
		var i = $(this).index();
		currentPage=i+1;
		$(this).addClass("active").siblings().removeClass("active");
		// searchObj.skip=currentPage-1;
		searchObj.skip=i;//currentPage=i+1;//currentPage-1=i;
		getData(searchObj);
	})
	
});

//getData 根据条件获取数据
function getData(data){
	data?data:(data={findObj:{}});
	console.log("777:",data);
	$.ajax({
		url:"/getData",
		type:"get",
		data:data,
		beforeSend:function(){
			$("#loading").show();
		},
		success:function(data2){
			// console.log("getData data2:",data2);
			if(data2.code==2021){
				
				// 渲染页面
				// showPage
				showPage(data2.data);
				
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

//获取 商品类别 最大页数
function pagingFun(){
	var url="/countMax";
	$.get(url,searchObj,function(data2){
		if(data2.code==2021){
			var max=data2.data;
			pageMax=Math.ceil(max/limit);
			//
			console.log("当前商品类别:pageMax",pageMax);
			
			//渲染分页
			showPageMax(pageMax);
		}
	})
}

//渲染分页 按钮
function showPageMax(pageMax){
	var btns="";
	for(var i=1;i<=pageMax;i++){
		if(i==currentPage){
			btns+=`<button type="button" class="active">${i}</button>`;
		}else{
			btns+=`<button type="button">${i}</button>`;
		}
	}
	$("#page").html(btns);
}
