const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    No_of_wheels: { type: Number, enum: [2, 4], required: true },
    types_of_vehicle: {type: String, required: true},
    types_of_model: {type: String, required: true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }

});

module.exports = mongoose.model('Booking', bookingSchema);
