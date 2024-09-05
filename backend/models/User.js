const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    accessToken: {
        type: String,
        required: false
    },
    batch: {
        type: String,
        required: false
    },
    subGroup: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'Student',
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
