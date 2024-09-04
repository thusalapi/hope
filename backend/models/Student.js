const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new mongoose.Schema({
    user: {
        userID: {
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
        role: {
            type: String,
            required: true,
            default: 'Student'
        }
    },
    batch: {
        type: String,
        default: 'Not Assigned', // Placeholder value
        required: true
    },
    subGroup: {
        type: String,
        default: 'Not Assigned', // Placeholder value
        required: true
    },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
