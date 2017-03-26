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
			results.forEach(function(instrument){
				state.currentInstruments.push(instrument);	
			});
			/*var instrumentshtml = results.instruments.map(function(instrument){
				console.log(instrument);
				state.currentInstruments.push(instrument);
				
			});
			$('#data').append(instrumentshtml.join());*/
			showInstruments(state);
		});

	
};

var showInstruments = function(state){
	var instrumentshtml = state.currentInstruments.map(function(instrument){
		var row = '<tr>';
		row = row.concat('<td class="itemNum">' + instrument.itemNum + '</td>');
		row = row.concat('<td class="Model">' + instrument.model + ' </td>');
		row = row.concat('<td class="Company">' + instrument.company + '</td>');
		row = row.concat('<td class="location">' + instrument.location + '</td></tr>');
		return row;
	});
	$('#data').append(instrumentshtml.join());

};

/*
var currentModels = [];
var currentCompany = [];
var currentLocations = [];
//var model = instrument.model;

var current = [];
$('#some_element:selected').each(function(index, selectedObj){
    current[index] = $(selectedObj).text();
});

var newInstrument = function(instrument){
	//$('#data tr:last-child').after('<tr>...</tr><tr>...</tr>');	
	var ajax = $.ajax('/instruments', {
        type: 'GET',
        dataType: 'json'
    	.done(function(results){ 
    		currentModels.push(model);
    		currentLocations.push(instrument.location);
    		currentCompany.push(instrument.company);
    		this.onGetinstruments.bind(this);
    		//return currentModels;
    		//return currentLocations;
    		//return currentCompany;
    	})	
    });
};
*/