const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    batch: {
        type: String,
        required: false
    },
    subgroup: {
        type: String,
        required: false
    }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
