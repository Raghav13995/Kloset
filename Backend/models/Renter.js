
const mongoose = require('mongoose');
// const Product = require("./Product")
const RenderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true // Added trim to email for consistency
    },
    Products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        // required: true
    }],
    contact: { // Changed 'Contact' to 'contact' to follow camelCase convention
        type: Number,
        required: true
    },
    ShopName: {
        type: String,
        // required: true,
    },
    AadharNumber: {
        type: Number,
        // required: true,
    },
    RegistrationNo: {
        type: Number,
        // required: true,
    },
    shopAddress : {
        type:String,
    },
    renterType:{
        enum: ["individual","shop"],
    }

});

module.exports = mongoose.model("Renter", RenderSchema);
