const User = require('../models/User');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
};
const createProfile = async (req, res) => {
    try {
        const { name, email, batch, subGroup } = req.body;

        const newUser = new User({
            userID: Date.now().toString(),
            name,
            email,
            role: 'Student'
        });
        await newUser.save();

        const newStudent = new Student({
            user: {
                userID: newUser.userID,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            batch,
            subGroup
        });
        await newStudent.save();

        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ message: 'Error creating profile' });
    }
};
const updateProfile = async (req, res) => {
    try {
        const { name, email, batch, subGroup } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email, batch, subGroup },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};
const deleteProfile = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ userID: req.user.userID });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        await Student.findOneAndDelete({ 'user.userID': deletedUser.userID });

        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Error deleting profile' });
    }
};

module.exports = {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile
};