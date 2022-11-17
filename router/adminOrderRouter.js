const express = require('express');
const router = express.Router();
const orderController = require('../controller/admin/orderController');

router.get('/', orderController.getListOrderAd);
router.get('/filter-order', orderController.getListOrderStatus);
router.get('/:idOrder', orderController.getInforOrderSelect);
router.get('/user/:idUer', orderController.getListOrderFromUser);
router.put('/:idOrder', orderController.editOrder);
router.delete('/:idOrder', orderController.deleteOrder);
router.post('/test', orderController.testCreateOrder);
router.put('/test/:idOrder', orderController.testEditOrder);
router.delete('/test/:idOrder', orderController.testDeleteOrder);
module.exports = router;