const mongoose = require('mongoose')

const RentSchema = new mongoose.Schema({
    clientId: {
        type: String,
        require: true
    },
    bookId: {
        type: String,
        require: true
    },
    rentedDays: {
        type: String,
    },
    devolveDays: {
        type: String,
    },
    status: {
        type: String,
        default: "Only"
    }
});

module.exports = mongoose.model("Rents", RentSchema)