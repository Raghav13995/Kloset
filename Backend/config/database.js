const mongoose = require('mongoose');

require('dotenv').config();

function databaseconnection () {
    mongoose.connect(process.env.BACKEND_URL)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.log('Error connecting to the database');
        console.log(error);
    }); 
}

exports.databaseconnection = databaseconnection;