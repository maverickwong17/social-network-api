const Thought = require('../models/Thought')
const User = require('../models/User')

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
    },
    // get one thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
                )
            .catch((err) => res.status(500).json(err));
    },
    // create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
                )})
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err))
    },
    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then(() => res.json({ message: 'Thought updated!' }))
        .catch((err) => res.status(500).json(err));
    },
    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                  ),
                  )
                  res.json({ message: 'Thought deleted!' })
    },
    // add reaction
    addReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reaction : req.body } },
            { new: true }
        )
        .then((reactionData) => res.json(reactionData))
        .catch((err) => res.status(500).json(err))
    },
    // remove reaction
    removeReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: req.body } },
            { new: true }
        )
        .then((reactionData) => res.json(reactionData))
        .catch((err) => res.status(500).json(err))
    }
}