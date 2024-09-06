const User = require('../models/User');

// Create a User
const createUser = async (req, res) => {
    const { name, email, role, batch, subGroup } = req.body;

    try {
        const user = await User.create({ userID: email, name, email, role, batch, subGroup });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single User
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a User
const updateUser = async (req, res) => {
    const { name, email, role, batch, subGroup } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, role, batch, subGroup }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a User
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
