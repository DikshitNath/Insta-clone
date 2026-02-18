const express = require('express');
const postController = require('../controllers/post.controller');
const postRouter = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const indentifyUser = require('../middlewares/auth.middleware')


postRouter.post('/', upload.single('image'), indentifyUser, postController.createPostController);
postRouter.get('/', indentifyUser, postController.getPostsController);
postRouter.get('/details/:postId', indentifyUser, postController.getPostDetailsController);

module.exports = postRouter;