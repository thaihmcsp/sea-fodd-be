const ordersModel = require("../../models/orderSchema");
const { filterProduct, filterOrder } = require("../../services/orderServices");

exports.getListOrderAd = async function (req, res) {
    try {
        let listOrderAd = await ordersModel.find()
            .populate({ path: "listProduct.idProduct" })
            .populate({ path: "idUser", select: ['-token', '-password'] });
        res.status(200).json(listOrderAd);
    } catch (error) {
        res.status(500).json(error)
    }
};

exports.getListOrderStatus = async function (req, res) {
    try {
        const { status, idUser, startDate, endDate, page, pageSize } = req.query;
        const listAllOrder = await filterOrder(idUser ,status, page, pageSize, startDate, endDate);
        res.status(200).json(listAllOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getInforOrderSelect = async function (req, res) {
    try {
        let orderSelect = await ordersModel
            .findOne({ _id: req.params.idOrder })
            .populate({ path: "idUser", select: ['-token', '-password'] })
            .populate({ path: "listProduct.idProduct"});

            res.status(200).json(orderSelect);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.getListOrderFromUser = async function (req, res) {
    try {
        let listOrderFromUser = await ordersModel
            .find({ idUser: req.params.idUer })
            .populate("listProduct.idProduct")
            .populate({ path: "idUser", select: ['-token', '-password'] });
        res.status(200).json(listOrderFromUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.editOrder = async function (req, res) {
    try {
        let fixOrder = await ordersModel.findByIdAndUpdate(
            { _id: req.params.idOrder },
            {
                status: req.body.status,
            },{ new: true, runValidators: true }
        );

        res.status(200).json(fixOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.deleteOrder = async function (req, res) {
    try {
        let dropOrder = await ordersModel.deleteOne({ _id: req.params.idOrder });
        res.status(200).json(dropOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

exports.testCreateOrder = async function (req, res) {
    try {
        let newOrderFake = await ordersModel.create(
            {
                idUser: req.body.idUser,
                address: req.body.address,
                total: req.body.total,
                phone: req.body.phone,
                listProduct: req.body.listProduct,
                status: req.body.status,
            }
        )
        res.status(200).json(newOrderFake)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.testEditOrder = async function (req, res) {
    try {
        let editOrder = await ordersModel.updateOne(
            {
                _id: req.params.idOrder
            },
            {
                address: req.body.address,
                total: req.body.total,
                phone: req.body.phone,
                status: req.body.status,
                listProduct: req.body.listProduct
            }
        )
        res.status(200).json(editOrder)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.testDeleteOrder = async function (req, res) {
    try {
        let testdropOrder = await ordersModel.deleteOne(
            { _id: req.params.idOrder }
        )
        res.status(200).json(testdropOrder)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}