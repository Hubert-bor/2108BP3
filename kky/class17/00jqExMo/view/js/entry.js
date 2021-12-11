
var currentPage=1;
var pageMax;

// jq 等待加载
$(function(){
	var whereObj={
		findObj:{},
		skip:0
	}
	getData(whereObj);
	
	// console.log("000");
	$("#addPost").click(function(){
		var user=$("#user").val();
		if(user){
			$.ajax({
				url:"/user/addPost",
				type:"post",
				data:{
					user:user,
					address:$("#address").val(),
					food:$("#food").val()
				},
				beforeSend:function(){
					
				},
				success(data){
					console.log("data:",data);
					if(data.code==200){
						getData(whereObj);
					}
				},
				error:function(){
					
				},
				complete(){
					
				}
				
			});
		}else{
			alert("姓名不能为空");
		}
	});
	
	
	//next 下一页
	$("#next").click(function(){
		if(currentPage<pageNumMax){
			$("#page>button").eq(currentPage).addClass("active").siblings().removeClass("active");
			
			whereObj.skip=currentPage;
			getData(whereObj);
			
			currentPage++;
			// console.log("当前页:",currentPage)
		}
	})
	
	//prev 上一页
	$("#prev").click(function(){
		if(currentPage>1){
			currentPage--;
			$("#page>button").eq(currentPage-1).addClass("active").siblings().removeClass("active");
			console.log("当前页:",currentPage)
			
			whereObj.skip=currentPage-1;
			getData(whereObj);
		}
	})
	//跳转页 
	$("#page").on("click","button",function(){
		var i=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		
		whereObj.skip=i;
		getData(whereObj);
		
		currentPage=i+1;
	})
	
});


//getData()

function getData(whereObj){
	var url="/user/getData";
	$.get(url,whereObj,function(data){
		console.log("data:",data);
		if(data.code==200){
			showPage(data.data);
			pageMaxFun();
			$("#currentPageNum>span").html(currentPage)
		}
	})
}

//
function showPage(arr){
	var lis="";
	for(var i=0;i<arr.length;i++){
		lis+=`
			<li>
				<div>
					姓名:<span>${arr[i].user}</span>
				</div>
				<div>
					家庭地址:<span>${arr[i].address}</span>
				</div>
				<div>
					食物:<span >
						${["f1","f2","f3","f4"].includes(arr[i].food) ? "<img src="+arr[i].food+".png />" : arr[i].food }
					</span>
				</div>
				<div>
					时间:<span>${arr[i].time}</span>
				</div>
				<div>
					<button type="button" onclick=del('${arr[i]._id}')>删除</button>
				</div>
			</li>
		`;
	}
	$("#show>ol").html(lis);
}


//删除
function del(_id){
	console.log("_id:",_id);;
	var url="/user/delData";
	var obj={_id:_id};
	$.post(url,obj,function(data){
		console.log("del data:",data);
		if(data.code==200){
			getData();
		}
	})
}

//
function pageMaxFun(){
	var url="/countMax";
	$.get(url,function(data){
		console.log("countMax ",data);
		pageMax=data.max;
		$("#maxNum>span").html(pageMax);
		pageNumMax=Math.ceil(pageMax/3);
		
		var btns="";
		for(var i=1;i<=pageNumMax;i++){
			if(i==currentPage){
				btns+=`<button type="button" class="active">${i}</button>`;
			}else{
				btns+=`<button type="button">${i}</button>`;
			}
		}
		$("#page").html(btns);
	})
}






