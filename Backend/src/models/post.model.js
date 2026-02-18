const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ''
    },
    imgUrl: {
        type: String,
        required: [true, 'Image URL is required for creating a post']
    },
    user: {
        ref: 'Users',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required for creating a post']
    }
});

const postModel = mongoose.model('Posts', postSchema);

module.exports = postModel;