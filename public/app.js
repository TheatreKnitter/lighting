$(document).ready(function(){
    getInstruments();
});

var getInstruments = function() {

	$.ajax({
		dataType: 'json',
		type: "GET",
		url:"/instruments",
		success: function(results){ 
			$.each(results, function(instrument) {
				var row = showInstruments(instrument);
				$('table').append(row);
			});
		}
	});

	
};

var showInstruments = function(instrument){
	var template = $('.templates').clone();
	template.find('.results').append('<td class="itemNum">' + instrument.itemNum + '</td>');
	template.find('.results').append('<td class="Model">' + instrument.model + ' </td>');
	template.find('.results').append('<td class="Company">' + instrument.company + '</td>');
	template.find('.results').append('<td class="location">' + instrument.loc + '</td>');

	template.removeClass("templates");
	template.removeClass("hidden");
	console.log(instrument);
	return template;
};

/*var currentModels = [];
var currentInstruments = [];
var currentLocations = [];

var current = [];
$('#some_element:selected').each(function(index, selectedObj){
    current[index] = $(selectedObj).text();
});

var newInstrument = function(instrument){
	$('table tr:last').after('<tr>...</tr><tr>...</tr>');	
	var ajax = $.ajax('/instruments', {
        type: 'GET',
        dataType: 'json'
    });
    currentModels.push(models);
    currentLocations.push(locations);
    currentCompany.push(company);
    ajax.done(this.onGetinstruments.bind(this));

}*/
