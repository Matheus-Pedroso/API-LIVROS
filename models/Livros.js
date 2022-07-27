const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        unique: true,
    },
    category: {
        type: String,
        require: true,
    },
    authorId: {
        type: String,
        require: true,
    },
    pages: {
        type: Number,
        require: true,
    },
    company: {
        type: String,
        require: true,
        min: 3,
        max: 30
    }
});

module.exports = mongoose.model("Books", BookSchema)