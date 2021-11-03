const router = require("express").Router()
const userHandlers = require("../handlers/userHandlers")
const rules = require("../validator/rules")

const auth = require("../middleware/auth-express")

router.post('/register', rules.regUser, userHandlers.register)
router.post('/login', rules.loginUser, userHandlers.login)

router.post('/upgrade', auth, userHandlers.upgradeToPremium)

router.delete('/', auth, userHandlers.deleteUser)

// admin only
router.get('/', auth, userHandlers.getUsers)
router.post('/admin', userHandlers.createAdmin)

module.exports = router