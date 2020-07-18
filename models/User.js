// This is schema to generate mongodb data

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String,
    age: String,
    sex: String,
    region: String,
    created: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
