const User = require('../models/User');
const Student = require('../models/Student');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            console.error('User not found in the User collection');
            return res.status(404).json({ message: 'User not found' });
        }

        let profile;
        if (user.role === 'Student') {
            profile = await Student.findOne({ 'user.userID': user.userID });
        } else if (user.role === 'Instructor') {
            profile = await Instructor.findOne({ 'user.userID': user.userID });
        }

        if (!profile) {
            console.error('Profile not found for user with role:', user.role);
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

const createProfile = async (req, res) => {
    try {
        const { name, email, batch, subGroup } = req.body;

        let user = await User.create({
            name,
            email,
            role: 'Student'
        });

        const student = await Student.create({
            user: user._id,
            batch,
            subGroup
        });

        res.status(201).json({ user, student });
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, email, batch, subGroup } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const student = await Student.findOneAndUpdate({ user: req.user.id }, { batch, subGroup }, { new: true });

        res.json({ user, student });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await Student.findOneAndDelete({ user: req.user.id });
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
