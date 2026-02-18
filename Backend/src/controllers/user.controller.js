const follwModel = require('../models/follow.model');
const userModel = require('../models/user.model');  

async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followerUsername === followeeUsername) {
        return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    const isFolloweeExist = await userModel.findOne({ username: followeeUsername });

    if (!isFolloweeExist) {
        return res.status(404).json({ message: 'User you are trying to follow does not exist' });
    }

    const isAlreadyFollowing = await follwModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        });
    }

    const followRecord = await follwModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })
}

module.exports = {
    followUserController
}