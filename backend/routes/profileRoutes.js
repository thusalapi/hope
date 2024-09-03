const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getProfile, createProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.post('/', authenticateToken, createProfile);
router.put('/', authenticateToken, updateProfile);
router.delete('/', authenticateToken, deleteProfile);

module.exports = router;
