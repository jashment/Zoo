const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AnimalSchema = new Schema({
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true},
    url: {type: String, required: false},
    emotion: {type: String, required: true},
    genus: {type: String, required: true}
})


module.exports = mongoose.model('Animal', AnimalSchema)