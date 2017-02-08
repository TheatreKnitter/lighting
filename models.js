const mongoose = require('mongoose');

const instrumentSchema = mongoose.Schema({
  model: {type: String},
  company: {type: String},
  partNumber: {type: Number},
  serial: {type: Number},
  location: {type: String}
});

instrumentSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    model: this.model,
    company: this.company,
    partNumber: this.partNumber,
    serial: this.serial,
    location: this.location
  };
};

const Instrument = mongoose.model('Instrument', instrumentSchema);

module.exports = {Instrument};