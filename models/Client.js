const moongose = require('mongoose')

const ClientSchema = new moongose.Schema(
    {
        name:{
            type: String,
            max: 30,
            required:true
        },
        address:{
            type: String,
            required:true
        },
        number: {
            type: String,
            required: true
        }       
    }
)

module.exports = moongose.model("Clients", ClientSchema)