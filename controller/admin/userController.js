const cartsModel = require("../../models/cartsSchema");
const userModel = require("../../models/userSchema");
const fs = require('fs');

exports.getListUser = async function (req, res) {
    try {
        let listUser = await userModel.find();
        res.status(200).json(listUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.getInforUserSelect = async function (req, res) {
    try {
        let userSelecter = await userModel.findOne({ _id: req.params.idUser });
        res.status(200).json(userSelecter);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.updateUserInfor = async function (req, res) {
    try {
        let updateUser;
        console.log(28, req.file);

        if (req.file) {
            let link = req.file.path;
            fs.unlink(req.user.avatar.slice(1), function(err){return});
            updateUser = await userModel.updateOne(
                { _id: req.user._id },
                {
                    username: req.body.username,
                    address: req.body.address,
                    phone: req.body.phone,
                    avatar: "/" + link,
                }
            );

        } else {
            updateUser = await userModel.updateOne(
                { _id: req.user._id },
                {
                    username: req.body.username,
                    address: req.body.address,
                    phone: req.body.phone,
                    avatar: req.body.avatar,
                }
            );
        }
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.updateUserRole = async function (req, res) {
    try {
        let updateUser = await userModel.updateOne(
            { _id: req.params.idUser },
            {
                role: req.body.role
            }
        );

        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.deleteUser = async function (req, res) {
    try {
        let dropCartsUser = await cartsModel.deleteOne({
            idUser: req.params.idUser,
        });
        let dropUser = await userModel.findOneAndDelete({ _id: req.params.idUser });
        fs.unlink(dropUser.avatar.slice(1), (err) => {return});

        res.status(200).json({ dropUser, dropCartsUser });
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.testCreateUser = async function (req, res) {
    try {
        let abc = await userModel.create({
            email: req.body.email,
            password: req.body.password,
        });
        let abcCreateCarts = await cartsModel.create({
            idUser: abc._id,
        });
        res.status(200).json(abcCreateCarts);
    } catch (error) {
        res.status(500).json(error)
    }
};

exports.changeUserRole = async function (req, res) {
    try {
        const { idUser } = req.params;
        const { role } = req.body;
        await userModel.findOneAndUpdate({ _id: idUser }, { role }, { new: true });
        res.status(200).json({message: 'change role success'});
    } catch (error) {
        res.status(500).json({ error })
    }
}