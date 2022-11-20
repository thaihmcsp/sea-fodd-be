const ordersModel = require("../models/orderSchema");

exports.filterOrder = async function (idUser ,status, page, pageSize, startDate, endDate) {
    const searchQuery = {};
        
    if(status) searchQuery.status = status;
    if(idUser) searchQuery.idUser = idUser;

    if(startDate) searchQuery.createdAt = {$gte: new Date(startDate).toISOString()};
    if(endDate) searchQuery.createdAt = {$lte: new Date(endDate).toISOString()};
    if(startDate && endDate) searchQuery.createdAt = { $gte: new Date(startDate).toISOString(), $lte: new Date(endDate).toISOString() };

    return ordersModel.find(searchQuery)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate({ path: "idUser", select: ['-token', '-password'] })
        .populate({ path: "listProduct.idProduct"});
}