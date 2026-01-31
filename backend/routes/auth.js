const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, phone, location } = req.body;

        const emailExist = await User.findOne({ email });
        if (emailExist) return res.status(400).send('Email already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            location
        });

        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Email is not found');

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.header('auth-token', token).send({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
