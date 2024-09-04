const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const Student = require('../models/Student');
const dotenv = require('dotenv');

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            user = await User.create({
                userID: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                role: 'Student',
            });

            await Student.create({
                user: user._id, // Reference the ObjectId from User
                batch: 'Not Assigned', // Placeholder value
                subGroup: 'Not Assigned', // Placeholder value
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error, undefined);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;