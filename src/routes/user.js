const router = require("express").Router()
const userHandlers = require("../handlers/userHandlers")
const rules = require("../validator/rules")

const auth = require("../middleware/auth-express")

router.post('/register', rules.consultant, userHandlers.register)
router.post('/login', rules.loginConsultant, userHandlers.login)

router.get('/', userHandlers.getConsultants)
router.delete('/', auth, userHandlers.deleteConsultant)

module.exports = router