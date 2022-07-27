const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema(
    {
        nameAuthor:{
            type: String,
            required: true,
        },
        aboutAuthor:{
            type: String,
            max: 300,
            required: true
        }
    }
)

module.exports = mongoose.model("Authors", AuthorSchema)