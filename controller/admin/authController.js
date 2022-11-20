const userModel = require("../../models/userSchema");
const { comparePassword } = require("../../services/auth");
const jwt = require("jsonwebtoken");
const jwtPass = process.env.jwt;

exports.adminLogin = async function (req, res) {
    try {
        const { email, password } = req.body
        const userCheck = await userModel.findOne({ email });
        if (userCheck) {
            const matchPasswordUser = await comparePassword(password, userCheck.password);
            if (!matchPasswordUser) {
                return res.json({ status: 'undifind password' });
            } else if (userCheck && matchPasswordUser && userCheck.role === 'user') {
                return res.json({ status: 'your account is not have permission' });
            } else if (userCheck && matchPasswordUser && userCheck.role !== 'user') {
                let token = jwt.sign({ id: userCheck._id }, jwtPass, { expiresIn: '90d' })
                await userModel.updateOne({ _id: userCheck._id }, { token });
                const { token: oldToken, password, ...userData} = userCheck._doc;
                res.json({
                    data: { token: token, role: userCheck.role, userData },
                    mess: 'oke',
                })
            }
        } else {
            return res.json({ status: 'email is not available' });
        }
    } catch (error) {
        res.json(error);
    }
}
