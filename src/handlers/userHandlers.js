require("dotenv").config()

exports.register = async (req, res, next) => {

    const { username, email, password } = req.body
    const role = 'free'

    const { User } = req.db
    const found = await User.findOne({ email })
    if (found) {
        const err = new Error(`user ${name} already exist`)
        err.code = 409
        return next(err)
    }
    const bcrypt = req.bcrypt
    const hashed = await bcrypt.hash(password, Number(process.env.SALT_OR_ROUNDS))

    let newUser = new User({ name, password: hashed, gender, role })

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

// exports.getConsultants = async (req, res) => {

//     const { Consultant } = req.db
//     const consultants = await Consultant.find({})

//     res.status(200).json({
//         message: `get all consultants`,
//         data: consultants
//     })
// }

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


