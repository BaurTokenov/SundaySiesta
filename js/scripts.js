$( document ).ready(function() {
		$("#content").on('click','.joinButton',function(){
			var ind = ($(this).closest('div')).innerHTML;
			console.log(ind);   		
     	});

});