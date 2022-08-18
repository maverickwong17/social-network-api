const { Schema, model } = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: { type:Schema.Types.ObjectId, default: new Schema.Types.ObjectId}
    }
)


const thoughtSchema = new Schema(
    {
        thoughtText : { type: String, required: true, minLength: 1, maxLength: 280, },
        createdAt: { type: Date, default: Date.now },
        username: { type: String, required: true },
        reaction: [reactionSchema],
    },
    {
        toJSON: {virtuals: true},
        id: false
    }
)

const Thought = model('thought', thoughtSchema)

module.exports = Thought