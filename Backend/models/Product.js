const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    available: { 
        type: Boolean, 
        default: true 
    },
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Renter",
        required: true
    },
    quantity: {
        type: Number,
        // required: true,
    },
    size:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model("Product", ProductSchema);