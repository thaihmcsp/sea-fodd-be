const cartsModel = require("../../models/cartsSchema");
const ordersModel = require("../../models/orderSchema");
const productModel = require("../../models/productSchema");
const { filterProduct, filterOrder } = require("../../services/orderServices");

exports.createOrderUser = async function (req, res) {
    try {
        let listProduct = await cartsModel.findOne({ idUser: req.user._id });
        let  = listProduct.listProduct;

        // change storage and calculate total price
        let total = 0;
        for (let elm of listProductOrder) {
            let CartsQuatity = elm.quantity;
            let productAfterUpdate = await productModel.findOneAndUpdate(
                { _id: elm.idProduct },
                { $inc: { storage: -CartsQuatity } }, { new: true }
            );

            total += productAfterUpdate.price * elm.quantity;
            await productAfterUpdate.checkStorage();
        }

        // create order
        let newOrderUser = await ordersModel.create({
            idUser: req.user._id,
            address: req.body.address,
            phone: req.body.phone,
            total,
            listProduct: listProductOrder,
            status: "pending",
        });

        // clear cart
        await cartsModel.updateOne(
            { idUser: req.user._id },
            { listProduct: [] }
        );
        res.status(200).json(newOrderUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.followOrderUser = async function (req, res) {
    try {
        let listOrderUser = await ordersModel
            .find({ idUser: req.user._id })
            .populate({ path: "listProduct.idProduct"})
        res.status(200).json(listOrderUser);
    } catch (error) {
        console.log(error);
    }
};

exports.getInforOrderSelect = async function (req, res) {
    try {
        let inforOrderSelect = await ordersModel
            .findOne({ _id: req.params.idOrder })
            .populate({ path: "listProduct.idProduct" });
        res.status(200).json(inforOrderSelect);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.changeOrderStatus = async function (req, res) {
    try {
        let newOrder = await ordersModel.findByIdAndUpdate(
            { _id: req.params.idOrder }, 
            { status: req.body.status },
            { new: true }
        );

        const listProductOrder = newOrder.listProduct;
        if(req.body.status === 'cancel'){
            // change storage
            for (let elm of listProductOrder) {
                let quatity = elm.quantity;
                await productModel.updateOne(
                    { _id: elm.idProduct },
                    { $inc: { storage: quatity } }, { new: true }
                );
            }
        }
        
        res.status(200).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.filterOrder = async function (req, res) {
    try {
        console.log(97, req.user);
        const idUser = req.user._id;
        const {status, page, pageSize, startDate, endDate} = req.body;
        const listOrder = await filterOrder(idUser ,status, page, pageSize, startDate, endDate);

        res.status(200).json({listOrder});
    } catch (error) {
        res.status(500).json(error);
    }
}