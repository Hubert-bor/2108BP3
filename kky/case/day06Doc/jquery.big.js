;
(function($) {
/*	$.fn.big = function(box, img) {
		var boxObj = {
			width: "300px",
			height: "300px",
		}
		var imgObj = {
			speed: 2,
			scale: 1.5
		}
		boxObj = $.extend({}, boxObj, box);
		imgObj = $.extend({}, imgObj, img);
		console.log("boxObj:", boxObj);
		console.log("imgObj:", imgObj);
		this.css(boxObj).children("img").css({
			"transition": imgObj.speed + "s"
		});
		this.hover(function() {
			$(this).children("img").css("transform", "scale(" + imgObj.scale + ")")
		}, function() {
			$(this).children("img").css("transform", "scale(1)");
		})
		return this;
	}*/
	$.fn.extend({
		big:function(box,img){
			var boxObj = {
				width: "300px",
				height: "300px",
			}
			var imgObj = {
				speed: 2,
				scale: 1.5
			}
			boxObj = $.extend({}, boxObj, box);
			imgObj = $.extend({}, imgObj, img);
			console.log("boxObj:", boxObj);
			console.log("imgObj:", imgObj);
			this.css(boxObj).children("img").css({
				"transition": imgObj.speed + "s"
			});
			this.hover(function() {
				$(this).children("img").css("transform", "scale(" + imgObj.scale + ")")
			}, function() {
				$(this).children("img").css("transform", "scale(1)");
			})
			return this;
		}
	})
}(jQuery));