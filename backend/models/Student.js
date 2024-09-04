const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user: {
        type: new mongoose.Schema({
            userID: String,
            name: String,
            email: String,
            role: String,
        }),
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    subGroup: {
        type: String,
        required: true,
    },
    // Additional student-specific fields
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
