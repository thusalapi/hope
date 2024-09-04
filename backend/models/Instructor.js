const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    user: {
        type: new mongoose.Schema({
            userID: String,
            name: String,
            email: String,
            role: String,
        }),
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    office: {
        type: String,
        required: true,
    },
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
