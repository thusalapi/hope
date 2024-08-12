const express = require('express');
const passport = require('passport');

const router = express.Router();

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/google');
}

// Route to get the user's profile
router.get('/', isAuthenticated, (req, res) => {
    res.json({
        user: req.user
    });
});

module.exports = router;