const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealerSchema = new Schema({
    name : String,
    email : String,
    phone : String,
    city : String,
    taluka : String,
    distributorId : String
});

module.exports = mongoose.model('Dealer' , dealerSchema);