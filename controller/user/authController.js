const cartsModel = require('../../models/cartsSchema');
const userModel = require('../../models/userSchema');
const { validateEmail, validatePassPartern } = require('../../utils/validate');
const { hashPassword, comparePassword } = require("../../services/auth");
const { transporter, generateCode, sendEMail, sendCodeMail } = require("../../utils/utils");
const { CodeCheck } = require("../../utils/utils");
const codeCheck = new CodeCheck();
const jwt = require('jsonwebtoken');
const jwtPass = process.env.jwt;

exports.register = async function (req, res) {
    try {
        const { password, email } = req.body;
        if (validateEmail(email) && validatePassPartern(password)) {
            const alreadyExistEmail = await userModel.findOne({ email: email });
            if (alreadyExistEmail) {
                return res.status(400).json({ status: "Email already exists" });
            } else {
                const hashed = await hashPassword(password);
                const newUser = await userModel.create({
                    // email: email,
                    password: hashed,
                });
                const newCart = await cartsModel.create({ idUser: newUser._id });

                codeCheck.setCode(generateCode());
                await sendEMail(newUser._id, email, codeCheck.getCode(), transporter);
                newUser.code = codeCheck.getCode();
                await newUser.save();
                return res.status(200).json({ message: "create user success" });
            }
        }
        
        res.status(400).json({message: 'password must have at least 8 character with uppercase, lowercase, number and special character'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.params;
        const user = await userModel.findOne({ code }).catch((err) => {
            console.log(err);
        })
        user.email = email;
        user.code = '';
        await user.save()
        res.status(200).send(`create succes click <a href="${process.env.hostFE}/User/UserLogin">Here</a> to back web`)
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // if (validateEmail(email) && validatePassPartern(password)) {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ status: "user or password undifind" });
        } else {
            if (user.timeLock > Date.now()) {
                return res.json({ status: 'account was lock please back at 1 hour later' })
            }
            // else if (user.loginExpired > new Date()) {
            //     return res.json({ status: 'account was login at another device' })
            // }
            else {
                const matchPassword = await comparePassword(password, user.password);
                if (!matchPassword) {
                    if (user.wrongCount == 4) {
                        await userModel.updateOne({ _id: user._id }, { wrongCount: 0, timeLock: Date.now() + 3600 * 1000 });
                        return res.json({ status: "try 1 hour late" });
                    } else {
                        await userModel.updateOne({ _id: user._id }, { $inc: { wrongCount: 1 } });
                        return res.json({ status: 'undifind password' });
                    }
                } else {
                    let token = jwt.sign({ id: user._id }, jwtPass, { expiresIn: 3600*1000*24*90 });
                    await userModel.updateOne({ _id: user._id }, {
                        token: token, wrongCount: 0,
                        loginExpired: new Date(Date.now() + 3600*1000*24*90)
                    });
                    res.cookie("user", token, { expires: new Date(Date.now() + 3600*1000*24*90) });
                    const {token: currentToken, password: currentPassword, ...other} = user._doc;
                    res.json({
                        data: { token: token, userData: other },
                        mess: "oke",
                    });
                }
            }
        }
        // }
    } catch (error) {
        res.json(error);
    }
};

exports.mailCodeForgotPass = async function (req, res) {
    try {
        const { email } = req.body;
        if (validateEmail(email)) {
            let userAccount = await userModel.findOne({ email: email })
            if (userAccount != null) {
                CodeCheck.setCode(generateCode())
                await sendCodeMail(userAccount._id, email, codeCheck.getCode(), transporter)
                userAccount.code = codeCheck.getCode()
                await userAccount.save()
                return res.status(200).json({ message: 'code sent successfully' })
            } else if (userAccount == null) {
                return res.status(400).json({ status: 'Email is not defind' })
            }
        } else {
            return res.status(404).json({ message: "email is not right" })
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}