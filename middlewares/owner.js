//test and check code mayob
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'secret', resave: false, saveUninitialized: false }));

// Mock database
const users = [
    { id: 1, username: 'admin', password: '$2a$10$jltZWohW0h01FtONF80d5eBx7PAl0J5oF.lA2pZMQXK0gZIt/8guK' } // hashed password for 'admin'
];

// Passport local strategy for username/password authentication
passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
    }
    bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    });
}));

// Passport serialization/deserialization of user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Login route
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('Successfully logged in.');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.send('Successfully logged out.');
});

// Authenticated route
app.get('/secure', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Authenticated route');
    } else {
        res.redirect('/login');
    }
});


// Route to authenticate owner
app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;

    // Check if username exists
    if (username !== owner.username) {
        return res.status(401).json({ message: 'Incorrect username.' });
    }

    // Check if password matches
    bcrypt.compare(password, owner.password, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
        if (!result) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }
        // Authentication successful
        res.status(200).json({ message: 'Authentication successful.' });
    });
});

