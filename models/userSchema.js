const mongoose = require('./dbConnect')

const userSchema = mongoose.Schema(
    {
        email: String,
        username: String,
        password: String,
        address: String,
        phone: String,
        avatar: {type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5NWV4HIz5cimRlDHWgvFoc1uzSIBhVwQuxQ&usqp=CAU'},
        code: String,
        token: String,
        birthDay: Date,
        wrongCount: Number,
        timeLock: Date,
        loginExpired: Date,
        role: { type: String, enum:['user', 'admin', 'staff'], default: 'user' }
    }, { collection: 'users' }
)

const userModel = mongoose.model('users', userSchema)

module.exports = userModel