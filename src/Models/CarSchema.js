const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({

    type: { type: String, enum: ['hatchback', 'suv', 'sedan'] },
    model: { type: [String] }
    
});

module.exports = mongoose.model('Car', carSchema);
