const userModel = require("../../models/userSchema");
const { comparePassword } = require("../../services/auth");
const jwt = require('jsonwebtoken');

exports.staffLogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        const userCheck = await userModel.findOne({ email });
        if (userCheck) {
            const matchPasswordUser = await comparePassword(password, userCheck.password);
            if (!matchPasswordUser) {
                return res.status(400).json({ status: 'undifind password' });
            } else if (userCheck && matchPasswordUser && userCheck.role === 'user') {
                return res.status(400).json({ status: 'your account is not have permission' });
            } else if (userCheck && matchPasswordUser && userCheck.role !== 'admin') {
                let token = jwt.sign({ id: userCheck._id }, jwtPass, { expiresIn: '90d' });
                await userModel.updateOne({ _id: userCheck._id }, { token });
                res.status(200).json({
                    data: { token: token, role: userCheck.role, userData: userCheck },
                    mess: 'oke',
                })
            }
        } else {
            return res.status(400).json({ status: 'email is not available' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}