const { Schema, model } = require('mongoose')
const moment = require('moment')

const formatTime = (timestamp) => {
    return moment(timestamp).format("MMM Do ,YYYY [at] h:mm")
}

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, default: ()=> new Types.ObjectId},
        reactionBody: { type: String, required: true, maxLength: 280},
        username: { type: String, required: true,},
        createdAt: { type: Date, default: Date.now, get: formatTime, }
    },
    {
        toJSON: {virtuals: true, getters: true},
        id: false
    }
)


const thoughtSchema = new Schema(
    {
        thoughtText : { type: String, required: true, minLength: 1, maxLength: 280, },
        createdAt: { type: Date, default: Date.now, get: formatTime },
        username: { type: String, required: true },
        reaction: [reactionSchema],
    },
    {
        toJSON: { virtuals: true , getters: true},
        id: false
    }
)


thoughtSchema.virtual('reactionCount').get(function(v){
    return this.reaction.length
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought