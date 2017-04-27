$(document).ready(function(){
    getInstruments();
    $('#newItem').submit(function(event){
    	event.preventDefault();
    	createNewInstrument(state);
        document.getElementById("newItem").reset();	
    });
    $('#updateItem').submit(function(event){
    	event.preventDefault();
    	updateInstrument(state);
        document.getElementById("updateItem").reset();	
    });
    $('#deleteItem').submit(function(event){
    	event.preventDefault();
    	deleteInstrument(state);
        document.getElementById("deleteItem").reset();
    });
    //$("#data").DataTable();
    $("#New").click(function(){
        $("#newItem").toggleClass('hidden');
        //$("#updateItem").hide();
        //$("#deleteItem").hide();
    });
    $("#Update").click(function(){
        $("#updateItem").toggleClass('hidden');
    }); 
    $("#delete").click(function(){
        $("#deleteItem").toggleClass('hidden');
    }); 	
});



var state = {
	currentInstruments: [],
	updateStateItem: function(item) {
		for (var i =0; i < this.currentInstruments.length; i++){
			if (item.itemNum == this.currentInstruments[i].itemNum) {
				this.currentInstruments[i].location = item.location;
				break;
			}
		}
	},
    deleteStateItem: function(item) {
        for (var i =0; i < this.currentInstruments.length; i++){
            if (item.itemNum == this.currentInstruments[i].itemNum) {
                var targetIndex = this.currentInstruments.indexOf(this.currentInstruments[i]);
                this.currentInstruments.splice(targetIndex, 1);
                break;
            }
        }
    }
};


var getInstruments = function() {

	$.ajax({
		dataType: 'json',
		type: "GET",
		url:"/instruments"})
		.done(function(results){ 
			results.instruments.forEach(function(instrument){
				state.currentInstruments.push(instrument);	
			});
			showInstruments(state);
		});

	
};

var table = $('#data').DataTable();

var showInstruments = function(state){
	/*$('#data').find("tr:gt(0)").remove();
	var instrumentshtml = state.currentInstruments.map(function(instrument){
		var row = '<tr>';
		row = row.concat('<td class="itemNum">' + instrument.itemNum + '</td>');
		row = row.concat('<td class="Model">' + instrument.model + ' </td>');
		row = row.concat('<td class="Company">' + instrument.company + '</td>');
		row = row.concat('<td class="location">' + instrument.location + '</td></tr>');
		return row;
	});
	$('#data').append(instrumentshtml.join());*/
    table.clear(); //clear content

    state.currentInstruments.forEach(function(instrument) {
        table.row.add([instrument.itemNum, instrument.model, instrument.company, instrument.location]);
    });

   table.draw();//update display

};


function createNewInstrument(state) {
    var item = {itemNum: $('#new-id').val(), model: $('#new-model').val(), company: $('#new-company').val(), loc: $('#new-location').val()};
    var ajax = $.ajax({
    	url: '/instruments',
        method: 'POST',
        data: JSON.stringify(item),
        contentType: 'application/json',
        dataType: 'json',
    });
    ajax.done(function(result){
    	state.currentInstruments.push(result);
    	showInstruments(state);
    });
}

function updateInstrument(state) {
	var update = {itemNum: $('#current-id').val(), loc: $('#update-location').val()};
    var ajax = $.ajax({
    	url: '/instruments',
        method: 'PUT',
        data: JSON.stringify(update),
        contentType: 'application/json',
        dataType: 'json',
    });
    ajax.done(function(result){
    	//console.log(update);
    	//console.log(result);
    	state.updateStateItem(result);
    	showInstruments(state);


    });
}

function deleteInstrument(state) {
	var remove = {itemNum: $('#delete-id').val()};
    var ajax = $.ajax({
    	url: '/instruments',
        method: 'DELETE',
        data: JSON.stringify(remove),
        contentType: 'application/json',
        dataType: 'json',
    });
    ajax.done(function(result){
    	state.deleteStateItem(remove);
    	showInstruments(state);
    });
}


