const express = require('express');
const passport = require('./config/passport');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const dotenv = require('dotenv');
const connectDB = require('./config/database');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your-session-secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home with token.
        res.redirect('/?token=' + req.user.token);
        // res.redirect('/profile');
    }
);

app.get('/', (req, res) => {
    res.send('Home Page');
});

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));