const mongoose = require('mongoose');
const Product = require('./Product');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true // Added trim to email for consistency
    },
    role: {
        type: String,
        enum : ['user','vendor','admin'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    contact: { // Changed 'Contact' to 'contact' to follow camelCase convention
        type: Number,
        required: true
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    
});

module.exports = mongoose.model('User', userSchema);
