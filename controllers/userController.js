const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
    try {
        // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu chưa
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Kiểm tra xem username và password có bị trống không
        if (!req.body.username || !req.body.password) {
            return res.status(400).send('Username and password are required');
        }

        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
};


const login = async (req, res) => {
    try {
        // Kiểm tra xem username và password có được cung cấp hay không
        if (!req.body.username || !req.body.password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send('User not found');
        }

        if (req.body.password === user.password) {
            const accessToken = jwt.sign({ username: user.username }, 'secretkey');
            res.json({ accessToken: accessToken });
        } else {
            res.status(401).send('Password incorrect');
        }
    } catch (error) {
        res.status(500).send('Error during login');
    }
};

module.exports = {
    signup,
    login
};
