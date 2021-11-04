const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Lesson = mongoose.model('Lesson', new Schema(
    {
        videoBuffer: {
            type: Schema.Types.Buffer,
            required: [true, 'video is required'],
        },
        category: {
            type: String,
            enum: ['Tafsir', 'Hadits', 'Fiqih'],
            required: [true, 'category required'],
        },
        description: {
            type: String,
        }

    },
))



module.exports = Lesson