const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Score = mongoose.model('Score', new Schema(
    {
        lesson: {
            type: Schema.Types.ObjectId,
            required: [true, 'lesson required'],
            ref: 'Lesson'
        },
        score: {
            type: Schema.Types.Number,
            required: [true, 'score required']
        }
    },
))



module.exports = Score