const User = require('../models/User');
const Student = require('../models/Student');

const getProfile = async (req, res) => {
    try {
        // Find the user by their ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Initialize profileData with the basic user info
        let profileData = { user };

        // If the user has the role of a Student, find the associated Student profile
        if (user.role === 'Student') {
            const studentProfile = await Student.findOne({ user: user._id });
            if (studentProfile) {
                // Add student profile details to the response
                profileData = {
                    ...profileData,
                    batch: studentProfile.batch,
                    subgroup: studentProfile.subgroup,
                };
            }
        }

        // Send the complete profile data
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
};
const updateProfile = async (req, res) => {
    try {
        const { name, email, groupNumber } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'Student') {
            await Student.findOneAndUpdate(
                { user: user._id },
                { groupNumber },
                { new: true }
            );
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};

module.exports = {
    getProfile,
    updateProfile
};
