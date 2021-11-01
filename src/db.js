const mongoose = require("mongoose")

require("dotenv").config()

function dbConnect(DB_URI = process.env.DB_URI) {
    mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => console.error(err))
    return mongoose.connection
}

function dbClose() {
    return mongoose.disconnect()
}

const Lesson = require("./models/Lesson")
const Score = require("./models/Score")
const Todo = require("./models/Todo")
const User = require("./models/User")
module.exports = { dbConnect, dbClose, Lesson, Score, Todo, User }