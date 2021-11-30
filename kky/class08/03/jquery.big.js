;(function($){
	console.log("$:",$);
	$.fn.big1=function(box,img){
		//默认数据
		var boxObj={
			width:"300px",
			height:"300px",
			borderRadius:"100%",
			border:"1px solid red"
		}
		
		var imgObj={
			speed:3,
			scale:1.2
		}
		
		var boxObj2=$.extend({},boxObj,box);//合并数据,默认数据会被覆盖
		var imgObj2=$.extend({},imgObj,img);
		
		console.log("boxObj2:",boxObj2);
		
		
		this.css(boxObj2).children("img").css({
			"transition":imgObj2.speed+"s"
		});
		
		this.hover(function(){
			$(this).children("img").css("transform","scale("+imgObj2.scale+")")
		},function(){
			$(this).children("img").css("transform","scale(1)")
		});
		
		return this;//此行代码,jquery将支持链式写法
	}
	
	$.fn.extend({
		big2:function(box,img){
			//默认数据
			var boxObj={
				width:"300px",
				height:"300px",
				borderRadius:"100%",
				border:"1px solid red"
			}
			
			var imgObj={
				speed:2,
				scale:2
			}
			
			var boxObj2=$.extend({},boxObj,box);//合并数据,默认数据会被覆盖
			var imgObj2=$.extend({},imgObj,img);
			
			this.css(boxObj2).children("img").css({
				"transition":imgObj2.speed+"s"
			});
			this.hover(function(){
				$(this).children("img").css("transform","scale("+imgObj2.scale+")")
			},function(){
				$(this).children("img").css("transform","scale(1)")
			});
			
			return this;//此行代码,jquery将支持链式写法
	}
	})
})(jQuery);