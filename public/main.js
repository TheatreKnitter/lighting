// JavaScript File

var MOCK_INSTRUMENTS = {
    "instrument": [
        {
            "id": "0001",
            "type": "Source 4",
            "manufacturer": "ETC",
            "venue": "swimming",
        },
        {
            "id": "0002",
            "type": "Source 4",
            "manufacturer": "ETC",
            "venue": "storage",
        },
                {
            "id": "0003",
            "type": "M2K",
            "manufacturer": "Martin",
            "venue": "Studio",
        },
        {
            "id": "0004",
            "type": "10K",
            "manufacturer": "ETC",
            "venue": "Beach volleyball",
        },
        {
            "id": "0005",
            "type": "M2K",
            "manufacturer": "Martin",
            "venue": "Studio",
        },


// this function stays the same when we connect
// to real API later
function displayInstruments(data) {
    for (index in data.statusUpdates) {
       $('body').append(
        '<p>' + data.instrument[type, manufacturer, studio].text + '</p>');
    }
}


//function to add new instrument 


//function to change venue on instruments



//function to delete instrument

$(document).ready(function){
    displayInstruments;
}
