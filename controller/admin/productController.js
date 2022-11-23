const productModel = require("../../models/productSchema");
const fs = require('fs');
exports.getListProduct = async function (req, res) {
    try {
        let listProduct = await productModel
            .find()
            .populate("idCategory")
        res.status(200).json(listProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.getInforProduct = async function (req, res) {
    try {
        let productSelecter = await productModel
            .findOne({ _id: req.params.idProduct })
            .populate("idCategory")
        res.status(200).json(productSelecter);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.createProduct = async function (req, res) {
    try {
        let newProduct;
        if(!req.body.idCategory) return res.status(400).json({message: 'please choose a category'});

        const checkDup = await productModel.findOne({productName: req.body.productName});
        if(checkDup) return res.status(400).json({message: 'this product is existed'});
        if (req.file) {
            newProduct = await productModel.create({
                productName: req.body.productName,
                idCategory: req.body.idCategory,
                price: req.body.price,
                storage: req.body.storage,
                productPic: "/" + req.file.path,
                createDate: new Date(),
                unit: req.body.unit
            });
        } else {
            newProduct = await productModel.create({
                productName: req.body.productName,
                idCategory: req.body.idCategory,
                price: req.body.price,
                storage: req.body.storage,
                createDate: new Date(),
                unit: req.body.unit,
                productPic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYTzj3XRf3wprzGJD2x83XA59JHEuqsXBWOLg1U5zD-w&s'
            });
        }
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json(error)
    }
};

exports.editProduct = async function (req, res) {
    try {
        let editProduct;
        if(req.body.productName){
            const checkDup = await productModel.findOne({productName: req.body.productName, _id: { $ne: req.params.idProduct}});
            if(checkDup) return res.status(400).json({message: 'this product is existed'});
        }

        if (req.file) {
            const product = await productModel.findOne({ _id: req.params.idProduct });
            fs.unlink(product.productPic[0].slice(1), function(err){ return });

            editProduct = await productModel.findOneAndUpdate(
                { _id: req.params.idProduct },
                {
                    productName: req.body.productName,
                    idCategory: req.body.idCategory,
                    price: req.body.price,
                    storage: req.body.storage,
                    productPic: "/" + req.file.path,
                    createDate: new Date(),
                    isActive: req.body.isActive,
                    unit: req.body.unit
                },
                { new: true }
            );
        } else {
            editProduct = await productModel.findOneAndUpdate(
                { _id: req.params.idProduct },
                {
                    productName: req.body.productName,
                    idCategory: req.body.idCategory,
                    price: req.body.price,
                    storage: req.body.storage,
                    createDate: new Date(),    
                    isActive: req.body.isActive,
                    unit: req.body.unit       
                },
                { new: true }
            );
        }
        await editProduct.checkStorage()
        res.status(200).json(editProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.deleteProduct = async function (req, res) {
    try {
        const product = await productModel.findOne({ _id: req.params.idProduct });
        fs.unlink(product.productPic[0].slice(1), function(err){ return });

        let dropProduct = await productModel.deleteOne({
            _id: req.params.idProduct,
        });
        res.status(200).json(dropProduct);
    } catch (error) {
        console.log(error);
    }
};

exports.productFilter = async function (req, res) {
    try {
        const { productName, idCategory, page, pageSize, high, low } = req.query;
        const searchQuery = {};

        if(productName) searchQuery.productName = {$regex: productName, $options: 'i'};

        if(idCategory) searchQuery.idCategory = idCategory;

        if(high) searchQuery.price = { $lte: high};
        if(low) searchQuery.price = { $gte: low};
        if(high && low) searchQuery.price = { $lte: high, $gte: low};
        const filter = await productModel.find(searchQuery).skip((page - 1) * pageSize).limit(pageSize);
        const total = await productModel.count();
        res.status(200).json({filter, total});
    } catch (error) {
        res.status(500).json(error);
    }
};