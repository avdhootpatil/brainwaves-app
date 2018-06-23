const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const distrbutorSchema = new Schema({
    name : String,
    email : String,
    phone : String,
    city : String,
    adminId : String
});

module.exports = mongoose.model('Distributor' , distrbutorSchema);