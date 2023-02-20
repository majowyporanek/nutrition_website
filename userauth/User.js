const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    age: {type: Number, default: null},
    weight: {type: Number, default: null},
    height: {type: Number, default: null},
    dietPreferences: {type: [String], default: []}
})

module.exports = mongoose.model("User", userSchema)