const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: "Email is required",
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
     },
    password: {
        type: String,
        required: "Password is required"
     },
    club_id: {
        type: Number,
        required: "Club ID is required",
        unique: true
     },
})

adminSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Admin', adminSchema)