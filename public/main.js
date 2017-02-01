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


function getinstruments(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_STATUS_UPDATES)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayStatusUpdates(data) {
    for (index in data.statusUpdates) {
       $('body').append(
        '<p>' + data.statusUpdates[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayStatusUpdates() {
    getRecentStatusUpdates(displayStatusUpdates);
}

$(function() {
    getAndDisplayStatusUpdates();
})