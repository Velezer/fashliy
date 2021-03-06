const db = require("./db")
const bcrypt = require("bcrypt")
const jwt = require("jwt-then")

const createApp = require("./app")

db.dbConnect()
const app = createApp(db, bcrypt, jwt)

const server = require("http").createServer(app)

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3001
server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})