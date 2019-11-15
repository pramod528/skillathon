const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: Number },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Login', loginSchema);