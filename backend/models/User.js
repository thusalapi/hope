const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    groupNumber: {
        type: String
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;