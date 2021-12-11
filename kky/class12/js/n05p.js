var PORT=86;
;(function(){
		var user = document.getElementById("user");
		var user2 = document.getElementById("user2");
		var age = document.getElementById("age");
		
		var addGet = document.getElementById("addGet");
		var addPost = document.getElementById("addPost");
		var addPostObj = document.getElementById("addPostObj");
		
		var getSearch = document.getElementById("getSearch");
		var postSearch = document.getElementById("postSearch");
		
		
		
		//调用getDataAjax
		var getDataUrl="http://127.0.0.1:"+PORT+"/getData";
		getDataAjax(getDataUrl);
		
		
		var url="http://127.0.0.1:"+PORT+"/getData2";
		getDataAjax2(url);
		
		
		//通过get方式添加
		addGet.onclick=function(){
			var userV=user.value;
			var ageV=age.value;
			if(userV&&ageV){
				//序列化 数据
				var data="user="+userV+"&age="+ageV;
				// var data=`user=${userV}&age=${ageV}`;
				
				//接口地址+数据
				var url="http://127.0.0.1:"+PORT+"/addGet?"+data;
				
				//调用 addGetAjax
				addGetAjax(url);
				
				
				
			}else{
				alert("姓名或年龄不能为空");
			}
		}
		
		//通过post方式 发送 字符串  添加
		addPost.onclick=function(){
			var userV=user.value;
			var ageV=age.value;
			if(userV&&ageV){
				var data="user="+userV+"&age="+ageV;
				var url="http://127.0.0.1:"+PORT+"/addPost";
				
				//调用addPostAjax
				addPostAjax(url,data);
				
			}else{
				alert("姓名或年龄不能为空");
			}
		}
		
		//通过post方式 发送 对象  添加
		addPostObj.onclick=function(){
			
			var userV=user.value;
			var ageV=age.value;
			if(userV&&ageV){
				var url="http://127.0.0.1:"+PORT+"/addPostObj";
				var obj={
					user:userV,
					age:ageV
				}
				addPostObjAjax(url,obj);
			}else{
				alert("姓名或年龄不能为空");
			}
		}
		
		//通过get方式将要查询的姓名传给后台
		getSearch.onclick=function(){
			var user2V=user2.value;
			var url="http://127.0.0.1:"+PORT+"/getSearch?user="+user2V;
			getSearchAjax(url);
		}
		
		//通过post方式将要查询的姓名传给后台
		postSearch.onclick=function(){
			var user2V=user2.value;
			var data="user="+user2V;
			var url="http://127.0.0.1:"+PORT+"/postSearch";
			postSearchAjax(url,data);
		}
		
}());



//通过ajax get 方式添加数据
function addGetAjax(url){
	var xhr=new XMLHttpRequest();
	xhr.open("get",url);
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var str=xhr.responseText;
			// console.log("str:",str);
			var strObj=JSON.parse(str);
			// console.log("strObj:",strObj);
			if(strObj.code==2021){
				// alert(strObj.msg);
				
				
				//调用getDataAjax
				var getDataUrl="http://127.0.0.1:"+PORT+"/getData";
				getDataAjax(getDataUrl);
				
				var url="http://127.0.0.1:"+PORT+"/getData2";
				getDataAjax2(url);
				
			}
		}
	}
}		

//通过ajax post 发送字符串 方式  添加数据
function addPostAjax(url,data){
	var xhr=new XMLHttpRequest();
	xhr.open("post",url);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(data);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var str=xhr.responseText;
			// console.log("str:",str);
			var strObj=JSON.parse(str);
			// console.log("strObj:",strObj);
			if(strObj.code==2021){
				// alert(strObj.msg);
				
				
				
				//调用postDataAjax
				var postDataUrl="http://127.0.0.1:"+PORT+"/postData";
				postDataAjax(postDataUrl)
			}
		}
	}
}

//通过ajax post 发送 对象 方式  添加数据
function addPostObjAjax(url,obj){
	var xhr=new XMLHttpRequest();
	xhr.open("post",url);
	
	// xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	// xhr.send(data);
	
	
	xhr.setRequestHeader("Content-type","application/json");
	xhr.send(JSON.stringify(obj));
	
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var str=xhr.responseText;
			// console.log("str:",str);
			var strObj=JSON.parse(str);
			// console.log("strObj:",strObj);
			if(strObj.code==2021){
				// alert(strObj.msg);
				
				
				
				//调用postDataAjax
				var postDataUrl="http://127.0.0.1:"+PORT+"/postData";
				postDataAjax(postDataUrl)
			}
		}
	}
}

//通过get方式获取数据
function getDataAjax(url){
	var xhr=new XMLHttpRequest();
	xhr.open("get",url);
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var str=xhr.responseText;
			// console.log('str:',str);
			var obj=JSON.parse(str);
			// console.log("obj:",obj);
			var arr=obj.data;
			// console.clear();//清除之前控制台所有的打印信息
			// console.log("getData arr:",arr);
			//调用showPage(arr);渲染页面
			showPage(arr);
		}
	}
}	
	
	//通过get方式获取数据
function getDataAjax2(url){
	var xhr=new XMLHttpRequest();
	xhr.open("get",url);
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var str=xhr.responseText;
			var arr=JSON.parse(str);
			console.log('getData2 是后台通过res.sendFile 返回的数据 arr:',arr);
		}
	}
}

//通过post方式获取数据
function postDataAjax(url){
	var xhr=new XMLHttpRequest();
	xhr.open("post",url);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var str=xhr.responseText;
			// console.log('str:',str);
			var obj=JSON.parse(str);
			// console.log("obj:",obj);
			var arr=obj.data;
			// console.clear();//清除之前控制台所有的打印信息
			// console.log("pstData arr:",arr);
			
			//调用showPage(arr);渲染页面
			showPage(arr);
		}
	}
}



//渲染页面
function showPage(arr){
	var tbody=document.querySelector("#show>table>tbody");
	var trs="";
	for(var i=0;i<arr.length;i++){
		trs+=`
			<tr>
				<td>${i+1}</td>
				<td>${arr[i].id}</td>
				<td>${arr[i].user}</td>
				<td>${arr[i].age}</td>
				<td>${timeFun(arr[i].time)}</td>
				<td>
					<button type="button" onclick=getDel('${arr[i].id}')>getDel 删除</button>
					<button type="button" onclick=postDel('${arr[i].id}')>postDel 删除</button>
				</td>
			</tr>
		`;
	}
	tbody.innerHTML=trs;
}

//通过get方式将id传给后端,后端将根据id删除指定数据
function getDel(id){
	// console.log("getDel id:",id);
	var url="http://127.0.0.1:"+PORT+"/getDel?id="+id;
	var xhr=new XMLHttpRequest();
	xhr.open("get",url);
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var str=xhr.responseText;
			// console.log("str:",str);
			var strObj=JSON.parse(str);
			// console.log("strObj:",strObj);
			if(strObj.code==2021){
				// alert(strObj.msg);
				
				
				//调用getDataAjax
				var getDataUrl="http://127.0.0.1:"+PORT+"/getData";
				getDataAjax(getDataUrl);
				
			}
		}
	}
}


//通过post方式将id传给后端,后端将根据id删除指定数据
function postDel(id){
	// console.log("postDel id:",id);
	var url="http://127.0.0.1:"+PORT+"/postDel";
	var xhr=new XMLHttpRequest();
	xhr.open("post",url);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("id="+id);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var str=xhr.responseText;
			console.log("str:",str);
			var strObj=JSON.parse(str);
			// console.log("strObj:",strObj);
			if(strObj.code==2021){
				// alert(strObj.msg);
				
				
				
				//调用postDataAjax
				var postDataUrl="http://127.0.0.1:"+PORT+"/postData";
				postDataAjax(postDataUrl)
			}
		}
	}
}


//通过get方式将要查询的姓名传给后台
function getSearchAjax(url){
	var xhr=new XMLHttpRequest();
	xhr.open("get",url);
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var str=xhr.responseText;
			console.log("str:",str);
			var obj=JSON.parse(str);
			if(obj.code==2021){
				showPage(obj.data);
			}
		}
	}
}

//通过post方式将要查询的姓名传给后台
function postSearchAjax(url,data){
	var xhr=new XMLHttpRequest();
	xhr.open("post",url);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(data);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var str=xhr.responseText;
			console.log("str:",str);
			var obj=JSON.parse(str);
			if(obj.code==2021){
				showPage(obj.data);
			}
		}
	}
}

function timeFun(time){
	var d=new Date(time);
	var year=d.getFullYear();
	var month=d.getMonth()+1;
	var date=d.getDate();
	
	var hours=d.getHours();
	var minustes=d.getMinutes();
	var seconds=d.getSeconds();
	
	return year+"-"+bu0(month)+"-"+bu0(date)+" "+bu0(hours)+":"+bu0(minustes)+":"+bu0(seconds);
}

function bu0(n){
	return n>10?n:('0'+n);
}
