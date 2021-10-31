const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Todo = mongoose.model('Todo', new Schema(
    {
        lesson: {
            type: Schema.Types.ObjectId,
            required: [true, 'lesson required'],
            ref: 'Lesson'
        },
        date: {
            type: Schema.Types.Date,
            required: [true, 'date required']
        }

    },
))



module.exports = Todo