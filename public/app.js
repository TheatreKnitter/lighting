$(document).ready(function(){
    getInstruments();
});

var state = {
	currentInstruments: []
}

var getInstruments = function() {

	$.ajax({
		dataType: 'json',
		type: "GET",
		url:"/instruments",
		success: function(results){ 
			$.each(results, function(instrument) {
				var row = showInstruments(instrument);
				$('#instruments').append(row);
				state.currentInstruments.push(instrument);
			});
		}
	});

	
};

var showInstruments = function(instrument){
	var row = $('tr');
	row.append('<td class="itemNum">' + instruments.itemNum + '</td>');
	row.append('<td class="Model">' + instruments.model + ' </td>');
	row.append('<td class="Company">' + instruments.company + '</td>');
	row.append('<td class="location">' + instruments.loc + '</td>');

	console.log(state);
	return row;
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
