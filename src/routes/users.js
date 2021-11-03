const router = require("express").Router()
const userHandlers = require("../handlers/userHandlers")
const rules = require("../validator/rules")

const auth = require("../middleware/auth-express")

router.post('/register', rules.regUser, userHandlers.register)
router.post('/login', rules.loginUser, userHandlers.login)

router.post('/upgradePro', auth, userHandlers.upgradeToPremiumPro)
router.post('/upgradeExpert', auth, userHandlers.upgradeToPremiumExpert)

router.delete('/', auth, userHandlers.deleteUser)

// admin only
router.get('/', auth, userHandlers.getUsers)
router.post('/admin', userHandlers.createAdmin)

module.exports = router