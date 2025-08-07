const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    pickupL: { type: String },
    pickupD: { type: Date },
    pickupT: { type: String },
    dropL: { type: String },
    riderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users" // collection name
    },
    status: { type: String },
    driverID: { type: String },
    price: { type: String },
    distance: { type: String },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false });
const BookingModel = mongoose.model('booking', DataSchema);
module.exports = BookingModel