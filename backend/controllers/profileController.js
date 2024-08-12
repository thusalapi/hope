const User = require('../models/User');

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
        const { name, email, groupNumber } = req.body;
        const newUser = new User({
            name,
            email,
            groupNumber,
            userId: req.user.id
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, email, groupNumber } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email, groupNumber },
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
        const deletedUser = await User.findByIdAndDelete(req.user.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting profile' });
    }
};

module.exports = {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile
};