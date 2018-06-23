const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name : String,
    email : String,
    phone : String
});


module.exports = mongoose.model('Admin' , adminSchema);