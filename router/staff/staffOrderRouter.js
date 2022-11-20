const { getListOrderAd, getListOrderStatus, editOrder } = require('../../controller/admin/orderController');
const router = require('express').Router();

router.get('/', getListOrderAd);
router.get('/filter', getListOrderStatus);
router.patch('/update/:idOrder', editOrder);

module.exports = router;