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
    body(`email`, `email is not valid`).isEmail(),
    body(`password`, `password is empty`).notEmpty(),
    body(`birthDate`, `birthDate is not valid`).isDate(),
    body(`address`, `address is empty`).notEmpty(),
    body(`instance`, `instance is empty`).notEmpty(),
    body(`phoneNumber`, `phoneNumber is not valid`).isMobilePhone(),
    validate
]
exports.loginUser = [
    body(`email`, `enter valid email`).isEmail(),
    body(`password`, `password is empty`).notEmpty(),
    validate
]
