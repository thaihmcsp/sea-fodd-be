const userModel = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const jwtPass = process.env.jwt;

async function checkRoleUser(req, res, next) {
    try {
        let token = req.headers.authorization
        if (token) {
            let id = jwt.verify(token, jwtPass).id
            let checkIdUser = await userModel.findOne(
                { _id: id }
            )
            if (checkIdUser.role == "admin") {
                req.user = checkIdUser
                next()
            } else {
                res.json({ mess: "you dont have a role" })
            }
        } else {
            console.log("token is not defind");
        }
    } catch (error) {
        if (error.message == 'jwt expired') {
            res.json({ message: 'jwt expired' })
        } else {
            res.json(error)
        }
    }
}

async function checkToken(req, res, next) {
    let searchTokenUser;
    try {
        let token = req.headers.authorization;
        searchTokenUser = await userModel.findOne(
            { token: token }
        )
        if (searchTokenUser) {
            let id = jwt.verify(token, jwtPass)
            if (id) {
                delete searchTokenUser._doc.token
                delete searchTokenUser._doc.password
                req.user = searchTokenUser
                next()
            }
        } else {
            res.json('cant not find user')

        }
    } catch (error) {
        if (error.message == 'jwt expired') {
            res.json({ message: 'jwt expired' })
        } else {
            res.json(error)
        }
    }
}

async function checkRoleStaff (req, res, next) {
    try {
        let token = req.headers.authorization
        if (token) {
            let id = jwt.verify(token, jwtPass).id
            let checkIdUser = await userModel.findOne(
                { _id: id }
            )
            if (checkIdUser.role !== "user") {
                req.user = checkIdUser
                next()
            } else {
                res.json({ mess: "you dont have a role" })
            }
        } else {
            console.log("token is not defind");
        }
    } catch (error) {
        if (error.message == 'jwt expired') {
            res.json({ message: 'jwt expired' })
        } else {
            res.json(error)
        }
    }
} 

module.exports = { checkRoleUser, checkToken, checkRoleStaff }