const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username already exists'],
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    bio: String,
    profilePic: {
        type: String,
        default: 'https://ik.imagekit.io/myBlogApp/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp'
    }
}, { timestamps: true });

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;