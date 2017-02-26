$(document).ready(function(){
    getInstruments;
    console.log(getInstruments);
});

var getInstruments = function(instrument) {

	

	$.ajax({
		dataType: 'json',
		type: "Get",
		url:"/instruments",
	})

	.done(function(result){ 
		$.each(result.Similar.Results, function(instrument) {
			var user = showInstruments(instrument);
			$('table').append(user);
		});
	});
};

var showInstruments = function(instrument){
	var template = $('.templates').clone();
	template.find('.results').append('<td class="Id"></td>');
	template.find('.Id').text(instrument.id);
	template.find('.results').append('<td class="Model"></td>');
	template.find('.Model').text(instrument.model);
	template.find('.results').append('<td class="Company"></td>');
	template.find('.Company').text(instrument.company);
	template.find('.results').append('<td class="location"></td>');
	template.find('.Location').text(instrument.loc);

	$(".search").append(template);
	template.removeClass("templates");
	template.removeClass("hitden");
};
