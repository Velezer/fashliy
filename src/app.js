const express = require("express")
const errorsMiddleware = require("./middleware/errors")
const cors = require('cors')


module.exports = (db, bcrypt, jwt) => {

  const app = express()

  app.use(cors({ credentials: true, origin: '*' }))

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))


  app.use((req, res, next) => {
    req.db = db
    req.bcrypt = bcrypt
    req.jwt = jwt
    next()
  })

  app.get('/', (req, res) => {
    res.status(200).json({
      message: `server up`
    })
  })

  app.use('/api/users', require("./routes/users"))
  
  app.use('/api/docs', require("./routes/docs"))
  
  app.use(errorsMiddleware.mongooseError)
  app.use(errorsMiddleware.expressError)

  return app
}

