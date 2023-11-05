const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({

  type: { type: String, enum: ['cruiser', 'sports'] },
  model: { type: [String] }
  
});

module.exports = mongoose.model('Bike', bikeSchema);
