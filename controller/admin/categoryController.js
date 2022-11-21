const categoriesModel = require("../../models/categoriesSchema");
const productModel = require("../../models/productSchema");
const fs = require('fs');

exports.getListCategories = async function (req, res) {
    try {
        let allCategories = await categoriesModel.find();
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getInforCategories = async function (req, res) {
    try {
        let selectCategories = await categoriesModel.findOne({
            _id: req.params.idCategories,
        });
        res.status(200).json(selectCategories);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.createCategories = async function (req, res) {
    try {
        let newCategories;
        let checkDup = await categoriesModel.findOne({categoriesName: req.body.categoriesName});
        if(checkDup) return res.status(400).json({message: 'this category is existed'});

        if (req.file) {
            let link = req.file.path;
            newCategories = await categoriesModel.create({
                categoriesName: req.body.categoriesName,
                thumpNail: "/" + link,
            });
        } else {
            newCategories = await categoriesModel.create({
                categoriesName: req.body.categoriesName,
                thumpNail: req.body.thumpNail,
            });
        }
        res.status(200).json(newCategories);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.editCategories = async function (req, res) {
    try {
        let checkDup = await categoriesModel.findOne({categoriesName: req.body.categoriesName});
        if(checkDup) return res.status(400).json({message: 'this category is existed'});

        let fixCategories;
        if (req.file) {
            let newLink = req.file.path;
            fixCategories = await categoriesModel.updateOne(
                { _id: req.params.idCategories },
                {
                    categoriesName: req.body.categoriesName,
                    thumpNail: "/" + newLink,
                }
            );
        } else {
            fixCategories = await categoriesModel.updateOne(
                { _id: req.params.idCategories },
                {
                    categoriesName: req.body.categoriesName,
                    thumpNail: req.body.thumpNail,
                }
            );
        }
        res.status(200).json(fixCategories);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteCategories = async function (req, res) {
    try {
        const idCategory = req.params.idCategories;
        await productModel.deleteMany({
            idCategory: idCategory,
        });
        const category = await categoriesModel.findOneAndDelete({
            _id: idCategory
        });
        fs.unlink(category.thumpNail.slice(1), function(err){ return; });

        res.status(200).json({ message: 'delete success'});
    } catch (error) {
        res.status(500).json(error);
    }
};
