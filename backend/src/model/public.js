const { Schema, model } = require('mongoose')

const publicSchema = new Schema({
    content:String,
    owner: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('public',publicSchema)