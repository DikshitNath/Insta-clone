const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req, res) {
    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: 'insta-clone',
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    });

    res.status(201).json({
        message: 'Post created successfully',
        post
    });
}

async function getPostsController(req, res) {

    const posts = await postModel.find({ user: req.user.id });

    res.status(200).json({
        message: 'Posts retrieved successfully',
        posts
    });
}

async function getPostDetailsController(req, res) {
    
    const post = await postModel.findOne({ 
        _id: req.params.postId,
        user: req.user.id
    });

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
        message: 'Post details retrieved successfully',
        post
    });
}

module.exports = {
    createPostController,
    getPostsController,
    getPostDetailsController
};