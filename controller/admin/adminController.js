const categoriesModel = require("../../models/categoriesSchema");
const productModel = require("../../models/productSchema");
const producCodeModel = require("../../models/productCodeSchema");
const userModel = require("../../models/userSchema");
const orderModel = require("../../models/orderSchema");
const { comparePassword } = require("../../services/auth");
const multer = require("multer");
const iconModel = require("../../models/iconSchema");
const cartsModel = require("../../models/cartsSchema");
const upload = multer({ dest: "upload/" });
const {
    deleteProduct,
    deleteProductCode,
    deleteProductCodeCate,
} = require("../../services/productCode");
const jwt = require('jsonwebtoken')
const sliderModel = require("../../models/sliderSchema");

exports.searchProduct = async function (req, res) {
    try {
        let searchProductList = await producCodeModel.find(
            { productName: { $regex: req.query.search, $options: 'i' } }
        ).populate('idCategories')
        res.json(searchProductList)
    } catch (error) {
        res.json(error)
    }
}

exports.getInforProductCode = async function (req, res) {
    try {
        let selectProductCode = await producCodeModel
            .findOne({ _id: req.params.idProductCode })
            .populate("idCategories");
        let listProdut = await productModel.find(
            { idProductCode: req.params.idProductCode }
        )
        selectProductCode._doc.listProduct = listProdut
        res.json(selectProductCode);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.getListProductCode = async function (req, res) {
    try {
        let listProductCode = await producCodeModel.find();
        res.json(listProductCode);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.createProductCode = async function (req, res) {
    try {
        let newProductCode;
        let alreadyProductCode = await producCodeModel.findOne({
            productName: req.body.productName,
        });
        if (alreadyProductCode) {
            return res.status(400).json({ status: "ProductCode already exists" });
        } else {
            if (req.file) {
                newProductCode = await producCodeModel.create({
                    idCategories: req.body.idCategories,
                    productName: req.body.productName,
                    thumNail: "/" + req.file.path,
                    productType: req.body.productType,
                    performanceProduct: req.body.performanceProduct,
                    cameraProduct: req.body.cameraProduct,
                    specialFeatures: req.body.specialFeatures,
                    design: req.body.design,
                    panel: req.body.panel,
                    Sale: req.body.Sale,
                    createDate: new Date(),
                });
            } else {
                newProductCode = await producCodeModel.create({
                    idCategories: req.body.idCategories,
                    productName: req.body.productName,
                    thumNail: req.body.thumNail,
                    productType: req.body.productType,
                    performanceProduct: req.body.performanceProduct,
                    cameraProduct: req.body.cameraProduct,
                    specialFeatures: req.body.specialFeatures,
                    design: req.body.design,
                    panel: req.body.panel,
                    Sale: req.body.Sale,
                    createDate: new Date(),
                });
            }
            res.json(newProductCode);
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.editProductCode = async function (req, res) {
    try {
        let editProductCode;
        if (req.file) {
            editProductCode = await producCodeModel.updateOne(
                { _id: req.params.idProductCode },
                {
                    idCategories: req.body.idCategories,
                    productName: req.body.productName,
                    thumNail: "/" + req.file.path,
                    productType: req.body.productType,
                    performanceProduct: req.body.performanceProduct,
                    cameraProduct: req.body.cameraProduct,
                    specialFeatures: req.body.specialFeatures,
                    design: req.body.design,
                    panel: req.body.panel,
                    Sale: req.body.Sale,
                }
            );
        } else {
            editProductCode = await producCodeModel.updateOne(
                { _id: req.params.idProductCode },
                {
                    idCategories: req.body.idCategories,
                    productName: req.body.productName,
                    thumNail: req.body.thumNail,
                    productType: req.body.productType,
                    performanceProduct: req.body.performanceProduct,
                    cameraProduct: req.body.cameraProduct,
                    specialFeatures: req.body.specialFeatures,
                    design: req.body.design,
                    panel: req.body.panel,
                    Sale: req.body.Sale,
                }
            );
        }
        res.json(editProductCode);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.deleteProductCodeCD = async function (req, res) {
    try {
        let dropProductfollowPoductCode = await deleteProduct(
            req.params.idProductCode
        );
        let deleteProductCD = await deleteProductCode(req.params.idProductCode);
        res.json({ deleteProductCD, dropProductfollowPoductCode });
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.getListIcon = async function (req, res) {
    try {
        let listIcon = await iconModel.find();
        res.json(listIcon);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.searchIcon = async function (req, res) {
    try {
        let searchIconProduct = await iconModel.find(
            { iconName: { $regex: req.query.search, $options: 'i' } }
        )
        res.json(searchIconProduct)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

exports.getNewIcon = async function (req, res) {
    try {
        let newIcon;
        if (req.file) {
            newIcon = await iconModel.create({
                iconName: req.body.iconName,
                iconPic: "/" + req.file.path,
                discount: req.body.discount,
            });
        } else {
            newIcon = await iconModel.create({
                iconName: req.body.iconName,
                iconPic: req.body.iconPic,
                discount: req.body.discount,
            });
        }
        res.json(newIcon);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.editIcon = async function (req, res) {
    try {
        let editProduct;
        if (req.file) {
            editProduct = await iconModel.updateOne(
                { _id: req.params.idIcon },
                {
                    iconName: req.body.iconName,
                    iconPic: "/" + req.file.path,
                    discount: req.body.discount,
                }
            );
        } else {
            editProduct = await iconModel.updateOne(
                { _id: req.params.idIcon },
                {
                    iconName: req.body.iconName,
                    iconPic: req.body.iconPic,
                    discount: req.body.discount,
                }
            );
        }
        res.json(editProduct);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.deleteIcon = async function (req, res) {
    try {
        let dropIcon = await iconModel.deleteOne({ _id: req.params.idIcon });
        res.json(dropIcon);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.getListSlide = async function (req, res) {
    try {
        let listSlide = await sliderModel.find();
        res.json(listSlide);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.searchSlide = async function (req, res) {
    try {
        let searchSlide = await sliderModel.find(
            { slideName: { $regex: req.query.search, $options: 'i' } }
        )
        res.json(searchSlide)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

exports.getNewSlide = async function (req, res) {
    try {
        console.log(12313);
        let newSlide;
        if (req.file) {
            newSlide = await sliderModel.create({
                slideName: req.body.slideName,
                slideImg: "/" + req.file.path,
            });
        } else {
            newSlide = await sliderModel.create({
                slideName: req.body.slideName,
                slideImg: req.body.slideImg,
            });
        }
        res.json(newSlide);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.editSlide = async function (req, res) {
    try {
        let editSlide;
        if (req.file) {
            editSlide = await sliderModel.updateOne(
                { _id: req.params.idSlide },
                {
                    slideName: req.body.slideName,
                    slideImg: "/" + req.file.path,
                }
            );
        } else {
            editSlide = await sliderModel.updateOne(
                { _id: req.params.idSlide },
                {
                    slideName: req.body.slideName,
                    slideImg: req.body.slideImg,
                }
            );
        }
        res.json(editSlide);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.deleteSlide = async function (req, res) {
    try {
        let dropSlide = await sliderModel.deleteOne(
            { _id: req.params.idSlide }
        )
        res.json(dropSlide)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}
