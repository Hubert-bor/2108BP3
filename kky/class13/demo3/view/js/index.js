/* 
 jq ajax 
  $(选择器).load(url,function(data){
	  
  });
  
  /////////////////////////////
  data可选
  $.get(url,data,function(){
	  
  });
  /////////////////////////////
    data可选
  $.post(url,data,function(){
	  
  })
  
  
  
  
 
 */


$(function(){
	//通过jq ajax get方式获取数据
	getDataJqAjax();
	
	//通过ja Ajax 方法添加/获取数据
	$("#addJqAjaxGet").click(function(){
		var user=$("#user").val();
		var age=$("#age").val();
		var n=2;
		if(user&&age){
			if(n==1){
				$.ajax({
					url:"/addGet?user="+user+"&age="+age,//请求地址/接口名称
					type:"GET",
					async:true,//默认为true,异步
					// dataType
					// data  ,
					timeout:99999,//设置超时
					beforeSend:function(){//发送请求前运行的函数
						$("#loading").removeClass("hide");
						console.log("1send 发送 请求之前,移除hide");
					},
					success:function(data){//当请求成功时运行的函数,data是数据
						console.log("1成功了data :",data);
						if(data.code==2021){
							getDataJqAjax();
						}
					},
					error:function(err){//请求失败时运行的函数,err报错信息
						console.log("1失败err:",err)
					},
					complete:function(){
						console.log("1.(无论失败或成功都会执行)请求完成");
						$("#loading").addClass("hide");
					}
					
				});
			}else if(n==2){
				$.ajax({
					url:"/addGet",//请求地址/接口名称
					type:"GET",
					async:true,//默认为true,异步
					// dataType
					timeout:99999,
					data:{user:user,age:age}, 
					beforeSend:function(){//发送请求前运行的函数
						$("#loading").removeClass("hide");
						console.log("211111111111111111111send 发送 请求之前,移除hide");
					},
					success:function(data){//当请求成功时运行的函数,data是数据
						console.log("2成功了data :",data);
						if(data.code==2021){
							getDataJqAjax();
						}
					},
					error:function(err){//请求失败时运行的函数,err报错信息
						console.log("2失败err:",err)
					},
					complete:function(){
						console.log("2222222222222222222222222222.(无论失败或成功都会执行)请求完成");
						$("#loading").addClass("hide");
					}
					
				});
			}
			
			
			
			
			
		}else{
			alert("姓名和年龄不能空");
		}
		
	})
	
	//通过ja Ajax 方法添加/获取数据
	$("#addJqAjaxPost").click(function(){
		var user=$("#user").val();
		var age=$("#age").val();
		if(user&&age){
			$.ajax({
				url:"/addPost",
				type:"post",
				async:true,
				data:{user:user,age:age},
				beforeSend(){
					$("#loading").removeClass("hide");
				},
				success(data){
					console.log("addJqAjaxPost data:",data);
					if(data.code==2021){
						postDataJqAjax();
					}
				},
				error(err){
					console.log("err:",err);
					$("#info").html("添加失败");
				},
				complete(){
					$("#loading").addClass("hide");
				}
			})
		}else{
			alert("姓名和年龄不能空");
		}
	})
	
	
	//前端通过jq ajax get方式 添加
	$("#addJqGet").click(function(){
		var user=$("#user").val();
		var age=$("#age").val();
		
		var n=4;
		
		if(user&&age){
			if(n==1){
				$("#loading").removeClass("hide");
				var url="http://127.0.0.1:86/addGet?user="+user+"&age="+age;
				$.get(url,function(data,status,xhr){
					console.log("1data:",data);
					if(data.code==2021){
						$("#loading").addClass("hide");
						getDataJqAjax();
					}
				});
			}else if(n==2){
				$("#loading").removeClass("hide");
				var url="/addGet?user="+user+"&age="+age;
				$.get(url,function(data,status,xhr){
					console.log("2data:",data);
					if(data.code==2021){
						$("#loading").addClass("hide");
						getDataJqAjax();
					}
				});
			}else if(n==3){
				$("#loading").removeClass("hide");
				var url="/addGet";
				var str="user="+user+"&age="+age;
				var str2=`user=${user}+&age=${age}`;
				$.get(url,str,function(data,status,xhr){
					console.log("3data:",data);
					if(data.code==2021){
						$("#loading").addClass("hide");
						getDataJqAjax();
					}
				});
			}else if(n==4){
				$("#loading").removeClass("hide");
				var url="/addGet";
				var obj={user:user,age:age};
				$.get(url,obj,function(data,status,xhr){
					console.log("4data:",data);
					if(data.code==2021){
						$("#loading").addClass("hide");
						getDataJqAjax();
					}
				});
			}				
		}else{
			alert("姓名和年龄不能为空");
		}
	});
	
		//前端通过jq ajax post方式 添加
	$("#addJqPost").click(function(){
		var user=$("#user").val();
		var age=$("#age").val();
		
		var n=2;
		
		if(user&&age){
			if(n==1){
				$("#loading").removeClass("hide");
				var url="/addPost";
				var str="user="+user+"&age="+age;
				var str2=`user=${user}+&age=${age}`;
				$.post(url,str,function(data){
					console.log("1adPost data:",data);
					if(data.code==2021){
						postDataJqAjax();
						$("#loading").addClass("hide");
					}
				})
			}else if(n==2){
				$("#loading").removeClass("hide");
				var url="/addPost";
				var obj={user:user,age:age};
				$.post(url,obj,function(data){
					console.log("2adPost data:",data);
					if(data.code==2021){
						$("#loading").addClass("hide");
						postDataJqAjax();
					}
				})
			}
			
		}else{
			alert("姓名和年龄不能为空");
		}
	});
	
});

//通过jq ajax get获取数据
function getDataJqAjax(){
	$("#loading").removeClass("hide");
	var url="/getData";
	$.get(url,function(data){
		console.log("7 getData:",data);
		if(data.code==2021){
			//渲染页面
			$("#loading").addClass("hide");
			showPage(data.data);
		}
	})
}
//通过jq ajax post获取数据
function postDataJqAjax(){
	$("#loading").removeClass("hide");
	var url="/postData";
	$.post(url,function(data){
		console.log("8 postData:",data);
		if(data.code==2021){
			//
			$("#loading").addClass("hide");
			showPage(data.data);
		}
	})
}

//渲染
function showPage(arr){
	var trs="";
	// $.each(arr,function(key,value){
	// 	console.log("key:",key,"value:",value);
	// })
	for(var i=0;i<arr.length;i++){
		trs+=`
			<tr>
				<td>${i+1}</td>
				<td>${arr[i].user}</td>
				<td>${arr[i].age}</td>
				<td>${arr[i].id}</td>
				<td>
					<button type="button">上移</button>
					<button type="button">删除</button>
					<button type="button">下移</button>
				</td>
			</tr>
		`;
	}
	$("#show>table>tbody").html(trs);
}



