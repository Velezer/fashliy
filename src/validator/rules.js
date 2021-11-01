const { body, validationResult } = require('express-validator');



const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}

exports.regUser = [
    body(`username`, `username is empty`).notEmpty(),
    body(`email`, `enter valid email`).isEmail(),
    body(`password`, `password is empty`).notEmpty(),
    validate
]
exports.loginUser = [
    body(`email`, `enter valid email`).isEmail(),
    body(`password`, `password is empty`).notEmpty(),
    validate
]
