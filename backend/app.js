const express = require('express');
const passport = require('./config/passport');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const userRoutes = require('./routes/userRoutes');
const userReportRoutes = require('./routes/userReportRoutes');


const dotenv = require('dotenv');
const grade = require('./routes/grade');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));


app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/session', sessionRoutes);
app.use('/users', userRoutes);
app.use('/generate-users-report', userReportRoutes);

app.use('/grade', grade);

app.get('/', (req, res) => {
    res.send('Home Page');
});

module.exports = app;
