const categoriesModel = require("../../models/categoriesSchema");

exports.getAllCategory = async function(req, res){
    try {
        const categories = await categoriesModel.find();
        res.status(200).json({categories});
    } catch (error) {
        res.status(500).json({error});
    }
}

exports.getOneCategory = async function(req, res){
    try {
        const categories = await categoriesModel.findOne({_id: req.params.idCategory});
        res.status(200).json({categories});
    } catch (error) {
        res.status(500).json({error});
    }
}