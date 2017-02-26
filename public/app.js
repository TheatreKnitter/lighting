$(document).ready(function(){
    showInstruments();
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
	
	function logResults(json){
		console.log(json);
	};
};

var showInstruments = function(instrument){
	getInstruments();
	var template = $('.templates').clone();
	template.find('.results').append('<td class="itemNum"></td>');
	template.find('.itemNum').text(instrument.itemNum);
	template.find('.results').append('<td class="Model"></td>');
	template.find('.Model').text(instrument.model);
	template.find('.results').append('<td class="Company"></td>');
	template.find('.Company').text(instrument.company);
	template.find('.results').append('<td class="location"></td>');
	template.find('.Location').text(instrument.loc);

	$(".search").append(template);
	template.removeClass("templates");
	template.removeClass("hitden");
	console.log(instrument);

};
