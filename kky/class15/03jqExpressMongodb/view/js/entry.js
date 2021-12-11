
$(function(){
	getData();
	
	$("#addPost").click(function(){
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
					goodsPrice1:$("#goodsPrice1").val(),
					goodsPrice2:$("#goodsPrice2").val(),
					goodsCount:$("#goodsCount").val(),
					isRed:$("#isRed>label>input:checked").val()
				},
				beforeSend:function(){
					$("#loading").show();
				},
				success:function(data){
					console.log("addPost data:",data);
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
	
	
	
});

//getData
function getData(data){
	data?data:(data={});
	$.ajax({
		url:"/getData",
		type:"get",
		data:data,
		beforeSend:function(){
			$("#loading").show();
		},
		success:function(data){
			console.log("getData data:",data);
			if(data.code==2021){
				
				// 渲染页面
				// showPage
				showPage(data.data);
				
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
			<tr>
				<td>${arr[i].goodsName}</td>
				<td>${arr[i].goodsType}</td>
				<td>¥ ${arr[i].goodsPrice1}</td>
				<td>¥ ${arr[i].goodsPrice2}</td>
				<td>${arr[i].goodsCount}</td>
				<td>${arr[i].isRed}</td>
				<td>${arr[i].time}</td>
				<td>
					<a onclick=delPost('${arr[i]._id}')>删除</a>
				</td>
			</tr>
		`;
	}
	$("#tab>tbody").html(trs);
}