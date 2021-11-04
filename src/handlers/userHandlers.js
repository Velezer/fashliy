require("dotenv").config()

exports.register = async (req, res, next) => {

    const { username, email, password } = req.body

    const { User } = req.db
    const found = await User.findOne({ email })
    if (found) {
        const err = new Error(`user already exist`)
        err.code = 409
        return next(err)
    }
    const bcrypt = req.bcrypt
    const hashed = await bcrypt.hash(password, Number(process.env.SALT_OR_ROUNDS))

    let newUser = new User({ username, email, password: hashed, role: 'free' })

    newUser = await newUser.save()
    res.status(201).json({
        message: `User ${newUser.username} created`
    })
}

exports.createAdmin = async (req, res, next) => {

    const { username, email, password } = req.body

    const { User } = req.db
    const found = await User.findOne({ email })
    if (found) {
        const err = new Error(`user already exist`)
        err.code = 409
        return next(err)
    }
    const bcrypt = req.bcrypt
    const hashed = await bcrypt.hash(password, Number(process.env.SALT_OR_ROUNDS))

    let newUser = new User({ username, email, password: hashed, role: 'admin' })

    newUser = await newUser.save()
    res.status(201).json({
        message: `User ${newUser.name} created`
    })
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    const { User } = req.db
    const found = await User.findOne({ email }).select('+password')
    if (found === null) {
        const err = new Error(`user not found`)
        err.code = 404
        return next(err)
    }

    const bcrypt = req.bcrypt
    const match = await bcrypt.compare(password, found.password)

    if (!match) {
        const err = new Error(`password doesn't match`)
        err.code = 400
        return next(err)
    }

    const jwt = req.jwt
    const token = await jwt.sign({ _id: found._id, username: found.username, role: found.role }, process.env.JWT_KEY, {
        expiresIn: `7d`
    })

    res.status(200).json({
        message: `User ${found.username} logged in`,
        data: { token }
    })
}

// admin only
exports.getUsers = async (req, res) => {
    const { _id } = req.payload

    const { User } = req.db

    const admin = await User.findOne({ _id })
    if (admin.role !== `admin`) {
        const err = new Error(`you are not an admin`)
        err.code = 401
        return next(err)
    }

    const founds = await User.find({})

    res.status(200).json({
        message: `get all users`,
        data: founds
    })
}

exports.deleteUser = async (req, res, next) => {
    const { _id } = req.payload

    const { User } = req.db
    const found = await User.findOne({ _id })
    if (!found) {
        const err = new Error(`user not found`)
        err.code = 404
        return next(err)
    }
    await User.deleteOne({ _id }).catch(err => next(err))

    res.status(200).json({
        message: `user deleted`,
    })
}

exports.upgradeToPremiumPro = async (req, res, next) => {
    const { _id } = req.payload

    const { User } = req.db
    const found = await User.findOne({ _id })
    if (!found) {
        const err = new Error(`user not found`)
        err.code = 404
        return next(err)
    }

    if (found.role !== `free`) {
        const err = new Error(`this is not free account`)
        err.code = 400
        return next(err)
    }

    await User.updateOne({ _id }, {
        $set: { role: `premiumPro` }
    })
    res.status(200).json({
        message: `user upgraded to Pro`,
    })
}
exports.upgradeToPremiumExpert = async (req, res, next) => {
    const { _id } = req.payload

    const { User } = req.db
    const found = await User.findOne({ _id })
    if (!found) {
        const err = new Error(`user not found`)
        err.code = 404
        return next(err)
    }

    if (found.role !== `free` || found.role !== `premiumPro`) {
        const err = new Error(`only for free and premiumPro account`)
        err.code = 400
        return next(err)
    }

    await User.updateOne({ _id }, {
        $set: { role: `premiumExpert` }
    })
    res.status(200).json({
        message: `user upgraded to Expert`,
    })
}

exports.info = async (req, res, next) => {
    const { _id } = req.payload

    const { User } = req.db
    const found = await User.findOne({ _id })
    if (!found) {
        const err = new Error(`user not found`)
        err.code = 404
        return next(err)
    }

    res.status(200).json({
        message: `user upgraded to Expert`,
        data: found
    })
}


