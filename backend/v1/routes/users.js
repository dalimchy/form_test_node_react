const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken, verifyToken } = require('../utils/jwt');

// Register Handle
router.post('/register', (req, res) => {
    const { first_name,last_name,country,city,phone_number, email, password,position } = req.body;
    console.log(11, first_name,last_name,country,city,phone_number, email, password,position)

    if (!first_name || !last_name || !country || !city || !phone_number || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: 'Email already exists' });
            } else {
                const newUser = new User({
                    first_name,
                    last_name,
                    country,
                    city,
                    phone_number,
                    email,
                    password,
                    position:position || 'user'
                });

                newUser.save()
                    .then(user => res.json({ token: generateToken(user), user }))
                    .catch(err => console.log(err));
            }
        });
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) return res.status(400).json({ msg: 'No user exists' });
        req.logIn(user, (err) => {
            if (err) throw err;
            res.json({ token: generateToken(user), user });
        });
    })(req, res, next);
});

// Middleware to verify token
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ msg: 'Token is not valid' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ msg: 'No token provided' });
    }
};

// Profile Update
router.put('/profile', authenticateJWT, (req, res) => {
    const { username, email } = req.body;

    User.findById(req.user.id)
        .then(user => {
            if (username) user.username = username;
            if (email) user.email = email;

            user.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        });
});

module.exports = router;
