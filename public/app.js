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
		$.each(result.Similar, function(instrument) {
			var user = showInstruments(instrument);
			$('table').append(user);
		});
	});
	
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

var newInstrument = function(instrument){
	$('table tr:last').after('<tr>...</tr><tr>...</tr>');	var currentModels = [];
	var currentInstruments = [];
	var currentLocations = [];
	var ajax = $.ajax('/instruments', {
        type: 'GET',
        dataType: 'json'
    });
    currentModels.push();
    currentLocations.push();
    currentInstruments.push();
    ajax.done(this.onGetinstruments.bind(this));

}
