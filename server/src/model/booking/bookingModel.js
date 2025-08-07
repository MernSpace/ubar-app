const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    pickupL: { type: String },
    pickupD: { type: Date },
    pickupT: { type: String },
    dropL: { type: String },
    riderID: { type: String },
    status: { type: String },
    driverID: { type: String },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false });
const BookingModel = mongoose.model('booking', DataSchema);
module.exports = BookingModel