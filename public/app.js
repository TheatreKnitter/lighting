$(document).ready(function(){
    getInstruments();
});

var state = {
	currentInstruments: []
};


var getInstruments = function() {

	$.ajax({
		dataType: 'json',
		type: "GET",
		url:"https://olympic-lighting.herokuapp.com/instruments"})
		.done(function(results){ 
			$.each(results.instruments, function(instrument) {
				var row = showInstruments(instrument);
				$('#instruments').append(row);
				state.currentInstruments.push(instrument);
			});
		});

	
};

var showInstruments = function(instrument){
	var row = '<tr>';
	row = row.concat('<td class="itemNum">' + instrument.itemNum + '</td>');
	row = row.concat('<td class="Model">' + instrument.model + ' </td>');
	row = row.concat('<td class="Company">' + instrument.company + '</td>');
	row = row.concat('<td class="location">' + instrument.loc + '</td></tr>');

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
