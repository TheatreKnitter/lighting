const mongoose = require('mongoose');

const instrumentSchema = mongoose.Schema({
  model: {type: String},
  company: {type: String},
  partNumber: {type: Number},
  itemNum: {type: Number},
  location: {type: String}
});

instrumentSchema.methods.apiRepr = function() {
  return {
    itemNum: this.itemNum,
    model: this.model,
    company: this.company,
    partNumber: this.partNumber,
    location: this.loc
  };
};

const Instrument = mongoose.model('Instrument', instrumentSchema);

module.exports = {Instrument};