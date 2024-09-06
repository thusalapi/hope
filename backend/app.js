const express = require('express');
const passport = require('./config/passport');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dotenv = require('dotenv');
const grade = require('./routes/grade');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your-session-secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/grade', grade);

app.get('/', (req, res) => {
    res.send('Home Page');
});

module.exports = app;
