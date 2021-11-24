(function($){
	$.fn.extend({
		myD:function(){
			this.each(function(i,k){
				console.log('i:',i,"k:",k);
			});
			return this.css({
				padding:"10px",
				margin:"10px",
				border:"1px solid #f90"
			});
		}
	})
})(jQuery);
