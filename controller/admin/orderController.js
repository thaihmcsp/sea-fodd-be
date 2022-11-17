const ordersModel = require("../../models/orderSchema");

exports.getListOrderAd = async function (req, res) {
    try {
        let listOrderAd = await ordersModel.find()
            .populate({ path: "listProduct.idProduct" })
            .populate({ path: "idUser", select: ['-token', '-password'] });

        res.status(200).json(listOrderAd);
    } catch (error) {
        res.json(error)
    }
};

exports.getListOrderStatus = async function (req, res) {
    try {
        const { status, idUser, startDate, endDate, page, pageSize } = req.query;
        const searchQuery = {};
        
        if(status) searchQuery.status = status;
        if(idUser) searchQuery.idUser = idUser;

        if(startDate) searchQuery.createdAt = {$gte: new Date(startDate).toISOString()};
        if(endDate) searchQuery.createdAt = {$lte: new Date(endDate).toISOString()};
        if(startDate && endDate) searchQuery.createdAt = { $gte: new Date(startDate).toISOString(), $lte: new Date(endDate).toISOString() };

        let listAllOrder = await ordersModel.find(searchQuery)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate({ path: "idUser", select: ['-token', '-password'] })
            .populate({ path: "listProduct.idProduct"})
        res.status(200).json(listAllOrder)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

exports.getInforOrderSelect = async function (req, res) {
    try {
        let orderSelect = await ordersModel
            .findOne({ _id: req.params.idOrder })
            .populate({ path: "idUser", select: ['-token', '-password'] })
            .populate({ path: "listProduct.idProduct"});

        res.json(orderSelect);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.getListOrderFromUser = async function (req, res) {
    try {
        let listOrderFromUser = await ordersModel
            .find({ idUser: req.params.idUer })
            .populate("listProduct.idProduct")
            .populate({ path: "idUser", select: ['-token', '-password'] });
        res.json(listOrderFromUser);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.editOrder = async function (req, res) {
    try {
        let fixOrder = await ordersModel.findByIdAndUpdate(
            { _id: req.params.idOrder },
            {
                status: req.body.status,
            },{ new: true }
        );

        res.json(fixOrder);
    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

exports.deleteOrder = async function (req, res) {
    try {
        let dropOrder = await ordersModel.deleteOne({ _id: req.params.idOrder });
        res.json(dropOrder);
    } catch (error) {
        console.log(error);
        res.json(error)
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
        res.json(newOrderFake)
    } catch (error) {
        console.log(error);
        res.json(error)
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
        res.json(editOrder)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

exports.testDeleteOrder = async function (req, res) {
    try {
        let testdropOrder = await ordersModel.deleteOne(
            { _id: req.params.idOrder }
        )
        res.json(testdropOrder)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}