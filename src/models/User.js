const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = mongoose.model('User', new Schema(
    {
        username: {
            type: String,
            required: [true, 'name is required'],
            unique: [true, 'name is aready exist'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: [true, 'email is aready exist'],
        },
        password: {
            type: String,
            select: false,
            required: [true, 'password is required']
        },
        role: {
            type: String,
            enum: ['admin', 'free', 'premiumPro', 'premiumExpert'],
            default: 'free',
            required: [true, 'role is required'],
        },
        //NEW
        birthDate: {
            type: Schema.Types.Date,
            required: [true, 'birthDate is required'],
        },
        address: {
            type: String,
            required: [true, 'address is required'],
        },
        instance: {
            type: String,
            required: [true, 'instance is required'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'phoneNumber is required'],
        },


    },
))


module.exports = User