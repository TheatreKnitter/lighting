$(document).ready(function(){
    getInstruments();
    logResults();
});

var state = {
	currentInstruments: []
};


var getInstruments = function() {

	/*$.ajax({
		dataType: 'json',
		type: "GET",
		url:"https://olympic-lighting.herokuapp.com/instruments",
		success: function(results){ 
			$.each(results, function(instrument) {
				var row = showInstruments(instrument);
				$('#instruments').append(row);
				state.currentInstruments.push(instrument);
			});
		}
	});*/
	
	$.get("https://olympic-lighting.herokuapp.com/instruments",instruments);
	

	
};

var showInstruments = function(instrument){
	var row = $('tr');
	row.append('<td class="itemNum">' + instrument.itemNum + '</td>');
	row.append('<td class="Model">' + instrument.model + ' </td>');
	row.append('<td class="Company">' + instrument.company + '</td>');
	row.append('<td class="location">' + instrument.loc + '</td>');

	console.log(state);
	return row;
};

function logResults(json){
		console.log(json);
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
