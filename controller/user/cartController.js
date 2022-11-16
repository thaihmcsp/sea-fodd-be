const cartsModel = require("../../models/cartsSchema");

exports.getListCarts = async function (req, res) {
    try {
        let userId = req.user._id;
        // let listProductCode = await producCodeModel.find()
        let listCartsUser = await cartsModel
            .findOne({ idUser: userId })
            .populate({ path: "listProduct.idProduct" });
        res.status(200).json({cart: listCartsUser});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

exports.addToCart = async function (req, res) {
    try {
        let { idProduct, quantity } = req.body;
        let userId = req.user._id; 
        let isExist = await cartsModel.findOne({
            idUser: userId,
            'listProduct.idProduct': idProduct
        });

        if(isExist){
            const cart = await cartsModel.findOneAndUpdate(
                {idUser: userId, 'listProduct.idProduct': idProduct},
                {$inc: {'listProduct.$.quantity': quantity}}, {new: true, runValidators: true}
            );
            res.status(200).json({cart});
        }else{
            const cart = await cartsModel.findOneAndUpdate({idUser: userId}, {$push: {listProduct: { idProduct, quantity, selector: false }}}, {new: true, runValidators: true});
            res.status(200).json({cart});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.updateCarts = async function (req, res) {
    try {
        let { idProduct, quantity } = req.body;
        let userId = req.user._id;

        if(quantity){
            const cart = await cartsModel.findOneAndUpdate(
                {idUser: userId, 'listProduct.idProduct': idProduct},
                {'listProduct.$.quantity': quantity}, {new: true, runValidators: true}
            );
            res.status(200).json({cart});
        }else{
            const cart = await cartsModel.findOneAndUpdate({idUser: userId}, {$pull: {listProduct: {idProduct: idProduct }}}, {new: true, runValidators: true});
            res.status(200).json({cart});
        }

    } catch (error) {
        console.log(error);
        res.json(error);
    }
};