var mongoose = require('mongoose');
var schema = require('./models.js')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds143539.mlab.com:43539/olympic-lighting');


mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});

mongoose.connection.once('open', function() {
   var instrumentSchema = mongoose.Schema
});

var create = function(serial, location) {
    Instrument.create(instrument, function(err, instrument) {
        if (err || !instrument) {
            console.error("Could not create instrument", serial);
            mongoose.disconnect();
            return;
        }
        console.log("Created instrument", instrument.serial);
        mongoose.disconnect();
    });
};

var read = function(serial) {
    Instrument.findOne({serial: serial}, function(err, instrument) {
        if (err || !instrument) {
            console.error("Could not find instrument", serial);
            mongoose.disconnect();
            return;
        }
        console.log("Read instrument", instrument.serial);
        console.log(instrument.location);
        mongoose.disconnect();
    });
};


var update = function(serial, location) {
    Instrument.findOneAndUpdate({serial: serial}, {location: location}, function(err, instrument) {
        if (err || !instrument) {
            console.error("Could not update instrument", serial);
            mongoose.disconnect();
            return;
        }
        console.log("Updated instrument", instrument.serial);
        mongoose.disconnect();
    });
};

var del = function(serial, location) {
    Instrument.findOneAndRemove({serial: serial}, function(err, instrument) {
        if (err || !instrument) {
            console.error("Could not delete instrument", serial);
            mongoose.disconnect();
            return;
        }
        console.log("Deleted instrument", instrument.serial);
        mongoose.disconnect();
    });
};