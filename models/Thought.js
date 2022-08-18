const { Schema, model } = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, default: new Schema.Types.ObjectId},
        reactionBody: { type: String, required: true, maxLength: 280},
        username: { type: String, required: true,},
        createdAt: { type: Date, default: Date.now, } // getter method to format
    },
    {
        toJSON: {virtuals: true},
        id: false
    }
)


const thoughtSchema = new Schema(
    {
        thoughtText : { type: String, required: true, minLength: 1, maxLength: 280, },
        createdAt: { type: Date, default: Date.now }, // getter method to format
        username: { type: String, required: true },
        reaction: [reactionSchema],
    },
    {
        toJSON: {virtuals: true},
        id: false
    }
)


reactionSchema.get(function(v){})
thoughtSchema.get(function(v){})
thoughtSchema.virtual('reactionCount').get(function(v){
    return this.reaction.length
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought