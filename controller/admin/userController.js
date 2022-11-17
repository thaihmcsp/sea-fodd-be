const cartsModel = require("../../models/cartsSchema");
const userModel = require("../../models/userSchema");
const fs = require('fs');

exports.getListUser = async function (req, res) {
    try {
        let listUser = await userModel.find();
        res.json(listUser);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.getInforUserSelect = async function (req, res) {
    try {
        let userSelecter = await userModel.findOne({ _id: req.params.idUser });
        res.json(userSelecter);
    } catch (error) {
        console.log(error);
        res.json(error)
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
        res.json(updateUser);
    } catch (error) {
        console.log(error);
        res.json(error)
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

        res.json(updateUser);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.deleteUser = async function (req, res) {
    try {
        let dropCartsUser = await cartsModel.deleteOne({
            idUser: req.params.idUser,
        });
        let dropUser = await userModel.findOneAndDelete({ _id: req.params.idUser });
        fs.unlink(dropUser.avatar.slice(1), (err) => {return});

        res.json({ dropUser, dropCartsUser });
    } catch (error) {
        console.log(error);
        res.json(error)
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
        res.json(abcCreateCarts);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};