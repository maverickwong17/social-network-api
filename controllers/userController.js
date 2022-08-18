const User = require('../models/User')
const Thought = require('../models/Thought')

module.exports = {
    // get all
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // get one
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
                )
            .catch((err) => res.status(500).json(err));
    },
    // create user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    // update user ID/email
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new : true }
        )
        .then(() => res.json({ message: 'User updated!' }))
        .catch((err) => res.status(500).json(err));
    },
    // delete user and all associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and associated apps deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // add friend
    addFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
        .then((friendData) => res.json(friendData))
        .catch((err) => res.status(500).json(err))
    },
    // remove friend
    removeFriend(req, res){
        User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
        )
        .then((friendData) => res.json(friendData))
        .catch((err) => res.status(500).json(err))
    }
}