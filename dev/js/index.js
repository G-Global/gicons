function menu(element)
{
	var value = $(element).attr('data');
	if(value == 'CSS'){
	$('#CSS').show();
	$('#CHAR').hide();
}
	else if(value == 'CHAR'){
	$('#CSS').hide()
	$('#CHAR').show();
}
	$(element).parent().attr('class', 'active')
}
      
        
function filter(element) {
        
	var value = $(element).val();

	$("#CSSmapping > li > input").each(function() {
		if ($(this).val().search(value) > -1) {
				$(this).parent().show();
		}
		else {
			$(this).parent().hide();
		}
	})
}  
