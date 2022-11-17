const categoriesModel = require("../../models/categoriesSchema");
const productModel = require("../../models/productSchema");

exports.getListProdutc = async function (req, res) {
    try {
        let listProductList = await productModel.find().populate('idCategory');
        res.json({ listProductList });
    } catch (error) {
        res.json(error);
    }
};

exports.getOneProduct = async function (req, res) {
    try {
        const product = await productModel.findOne({_id: req.params.idProduct}).populate('idCategory');
        res.json({ product });
    } catch (error) {
        console.log(error);
        res.json(error);
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
        res.status(200).json({filter});
    } catch (error) {
        res.json(error);
    }
};

exports.getProductsOfCategory = async function(req,res) {
    try {
        const products = await productModel.find({idCategory: req.params.idCategory}).populate('idCategory');
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json(error);
    }
}