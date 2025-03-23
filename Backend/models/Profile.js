const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        default: null
    },
    dob: {
        type: Date,
        default: null
    },
    address: {
        type: String,
        default: null
    },  
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    pincode: {
        type: Number,
        default: null
    },
    country: {
        type: String,
        default: null
    },
});

module.exports = mongoose.model('Profile', profileSchema);