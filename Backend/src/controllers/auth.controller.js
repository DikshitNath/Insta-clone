const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerController(req, res) {
    const { username, email, password, bio, profilePic } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ 
        $or: [
            { email },
            { username }
        ]
    });

    if (isUserAlreadyExist) {
        return res.status(409).json({ message: 'User already exists' 
            + (isUserAlreadyExist.email === email ? ' with this email' : ' with this username')
         });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        bio,
        profilePic
    });

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token);

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic
        }
    })
}

async function loginController (req, res) {
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('token', token);

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic
        }
    })
}

module.exports = {
    registerController,
    loginController
};