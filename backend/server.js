const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

<<<<<<< Updated upstream
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
        // res.redirect('/?token=' + req.user.token);
        res.redirect('/profile');
    }
);

app.get('/', (req, res) => {
    res.send('Home Page');
});

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('MongoDB connection error:', err));

=======
>>>>>>> Stashed changes
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
