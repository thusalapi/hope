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
    const { googleId, name, email, accessToken, batch, subGroup } = req.body;

    if (!googleId || !accessToken) {
        return res.status(400).json({ message: "googleId and accessToken are required" });
    }

    try {
        const newUser = new User({
            googleId,
            name,
            email,
            accessToken,
            batch,
            subGroup
        });

        await newUser.save();
        console.log(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

const updateProfile = async (req, res) => {
    const { googleId, name, email, accessToken, batch, subGroup } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            googleId,
            name,
            email,
            accessToken,
            batch,
            subGroup
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
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
